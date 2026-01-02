/* ================= Products.jsx (Desktop Tooltips + Mobile Safe) ================= */
import { useState, useMemo, useRef, useEffect } from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from '../data/world-110m.json';
const highlightCOLOR = 'oklch(50.8% 0.118 165.612)'
const PRODUCTS = {
  Oilseeds: {
    color: highlightCOLOR,
    countries: {
      'United States of America': ['Soybean'],
      Brazil: ['Soybean'],
      Argentina: ['Soybean', 'Sunflower'],
      Canada: ['Canola'],
      Ukraine: ['Sunflower'],
      Russia: ['Sunflower'],
      India: ['Mustard', 'Groundnut', 'Sesame'],
      Australia: ['Canola'],
    },
    index: [
      'Soybean','Sunflower','Canola','Mustard',
      'Groundnut','Sesame','Cottonseed','Safflower',
      'Linseed','Castor','Coconut'
    ],
  },

  Pulses: {
    color: highlightCOLOR,
    countries: {
      India: ['Desi Chickpeas', 'Pigeon Peas'],
      Canada: ['Lentils', 'Yellow Peas'],
      Australia: ['Lentils'],
      Myanmar: ['Black Matpe'],
      Russia: ['Yellow Peas'],
      Ethiopia: ['Chickpeas', 'Lentils'],
      Tanzania: ['Pigeon Peas'],
      Mozambique: ['Pigeon Peas'],
      Nigeria: ['Cowpeas'],
      Sudan: ['Chickpeas'],
      Ukraine: ['Peas'],
      Turkey: ['Chickpeas'],
    },
    index: [
      'Lentils','Desi Chickpeas','Yellow Peas',
      'Pigeon Peas','Black Matpe','Cowpeas'
    ],
  },

  Grains: {
    color: highlightCOLOR,
    countries: {
      India: ['Wheat', 'Rice', 'Maize'],
      China: ['Rice', 'Maize'],
      Vietnam: ['Rice'],
      Japan: ['Rice'],
      'United States of America': ['Maize', 'Wheat', 'Sorghum'],
      Ukraine: ['Maize', 'Barley'],
      Russia: ['Wheat', 'Barley'],
      Argentina: ['Maize', 'Wheat'],
      Australia: ['Wheat', 'Barley'],
    },
    index: ['Wheat', 'Rice', 'Maize', 'Barley', 'Sorghum'],
  },
};

export default function Products() {
  const [active, setActive] = useState('Oilseeds');
  const [hoveredCommodity, setHoveredCommodity] = useState(null);
  const [hoveredCountryCommodities, setHoveredCountryCommodities] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const containerRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  /* ---------- Projection ---------- */
  const projection = geoNaturalEarth1()
    .scale(isMobile ? 185 : 160)
    .translate(isMobile ? [480, 290] : [480, 250]);

  const path = geoPath(projection);
  const graticule = geoGraticule();

  const countries = useMemo(
    () => feature(worldData, worldData.objects.countries).features,
    []
  );

  /* ---------- Close tooltip / hover on outside click ---------- */
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setHoveredCommodity(null);
        setHoveredCountryCommodities(null);
        setTooltip(null);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, []);

  return (
    <section id="products" className="py-16 md:py-20 px-3 md:px-20 bg-warm-100">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Our Global Commodity Footprint
      </h2>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {Object.keys(PRODUCTS).map(key => (
          <button
            key={key}
            onClick={() => {
              setActive(key);
              setHoveredCommodity(null);
              setHoveredCountryCommodities(null);
              setTooltip(null);
            }}
            className={`px-4 py-2 rounded-full border transition
              ${active === key
                ? 'bg-emerald-700 text-white'
                : 'hover:bg-warm-gray'
              }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="relative rounded-2xl">
        <svg
          viewBox={isMobile ? '0 0 960 600' : '0 0 960 500'}
          className="w-full h-auto"
        >
          <path
            d={path(graticule())}
            fill="none"
            stroke="#f5b95a"
            strokeWidth={0.5}
          />

          <g>
            {countries.map((d, i) => {
              const countryName = d.properties.name;
              const commodities = PRODUCTS[active].countries[countryName];
              const isActiveCountry = Boolean(commodities);

              let opacity = 1;
              if (
                hoveredCommodity &&
                isActiveCountry &&
                !commodities.includes(hoveredCommodity)
              ) {
                opacity = 0.25;
              }

              return (
                <path
                  key={i}
                  d={path(d)}
                  fill={isActiveCountry ? PRODUCTS[active].color : '#d8d2c7ff'}
                  opacity={opacity}
                  stroke="#FFF"
                  strokeWidth={0.5}
                  className={`transition-opacity duration-200 ${
                    isActiveCountry ? 'cursor-pointer' : ''
                  }`}
                  onMouseEnter={(e) => {
                    if (isMobile || !isActiveCountry) return;

                    setHoveredCountryCommodities(commodities);
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      country: countryName,
                      commodities,
                    });
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setHoveredCountryCommodities(null);
                      setTooltip(null);
                    }
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Legend */}
        <div className="absolute top-3 left-3 bg-warm-50/90 backdrop-blur rounded-xl shadow px-3 py-2 text-xs md:text-sm">
          <ul className="space-y-1">
            {PRODUCTS[active].index.map(item => {
              const isDimmed =
                hoveredCommodity
                  ? hoveredCommodity !== item
                  : hoveredCountryCommodities &&
                    !hoveredCountryCommodities.includes(item);

              return (
                <li
                  key={item}
                  className={`flex items-center gap-2 cursor-pointer transition-opacity
                    ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
                  onMouseEnter={() => {
                    if (!isMobile) setHoveredCommodity(item);
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) setHoveredCommodity(null);
                  }}
                  onClick={() => {
                    if (isMobile) {
                      setHoveredCommodity(prev =>
                        prev === item ? null : item
                      );
                    }
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded"
                    style={{ background: PRODUCTS[active].color }}
                  />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Tooltip (DESKTOP ONLY) */}
        {!isMobile && tooltip && (
          <div
            role="tooltip"
            className="absolute z-30 bg-warm-50 shadow-xl rounded-lg px-3 py-2 text-xs md:text-sm pointer-events-none"
            style={{
              left: tooltip.x - 85,  // offset slightly to the right of cursor
              top: tooltip.y - 85,   // offset slightly below cursor
              transform: 'translate(0, 0)', // no negative translate, so it hugs mouse
            }}
          >
            <div className="font-semibold">{tooltip.country}</div>
            <div className="mt-1">{tooltip.commodities.join(', ')}</div>
          </div>
        )}

      </div>
    </section>
  );
}
