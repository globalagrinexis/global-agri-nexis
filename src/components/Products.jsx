/* ================= Products.jsx (FIXED tooltips + mobile safe) ================= */
import { useState, useMemo, useRef, useEffect } from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from '../data/world-110m.json';

const PRODUCTS = {
  Oilseeds: {
    color: 'oklch(50.8% 0.118 165.612)',
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
    color: 'oklch(50.8% 0.118 165.612)',
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
    color: 'oklch(50.8% 0.118 165.612)',
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
  const [tooltip, setTooltip] = useState(null);
  const containerRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const projection = geoNaturalEarth1()
    .scale(isMobile ? 135 : 160)
    .translate([480, 250]);

  const path = geoPath(projection);
  const graticule = geoGraticule();

  const countries = useMemo(
    () => feature(worldData, worldData.objects.countries).features,
    []
  );

  // Close tooltip on outside click (mobile safe)
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setTooltip(null);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, []);

  return (
    <section id="products" className="py-16 md:py-20 px-4 md:px-20 bg-warm-100">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Our Global Commodity Footprint
      </h2>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {Object.keys(PRODUCTS).map(key => (
          <button
            key={key}
            onClick={() => { setActive(key); setTooltip(null); }}
            className={`px-4 py-2 rounded-full border transition
              ${active === key ? 'bg-emerald-700 text-white' : 'hover:bg-warm-gray'}`}
          >
            {key}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="relative bg-warm-100 rounded-2xl p-3 md:p-4">
        <svg viewBox="0 0 960 500" className="w-full h-auto">
          {/* Gridlines */}
          <path
            d={path(graticule())}
            fill="none"
            stroke="#f5b95a"
            strokeWidth={0.5}
          />

          <g>
            {countries.map((d, i) => {
              const commodities =
                PRODUCTS[active].countries[d.properties.name];

              const isActive = Boolean(commodities);

              return (
                <path
                  key={i}
                  d={path(d)}
                  fill={isActive ? PRODUCTS[active].color : '#d8d2c7ff'}
                  stroke="#FFF"
                  strokeWidth={0.5}
                  className={isActive ? 'cursor-pointer' : ''}
                  onMouseEnter={(e) => {
                    if (isMobile || !isActive) return;
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      country: d.properties.name,
                      commodities,
                    });
                  }}
                  onMouseLeave={() => !isMobile && setTooltip(null)}
                  onClick={(e) => {
                    if (!isActive) return;
                    const [cx, cy] = projection(geoCentroid(d));
                    setTooltip({
                      x: isMobile ? cx : e.clientX,
                      y: isMobile ? cy : e.clientY,
                      country: d.properties.name,
                      commodities,
                    });
                  }}
                />
              );
            })}
          </g>
        </svg>
        {/* Legend */}
        <div className="absolute top-3 left-3 max-w-[70vw] md:max-w-none
          bg-warm-50/90 backdrop-blur rounded-xl shadow px-3 py-2
          text-xs md:text-sm overflow-x-auto"
        >
          <div className="font-semibold mb-1">Index</div>
          <ul className="space-y-1">
            {PRODUCTS[active].index.map(item => (
              <li key={item} className="flex items-center gap-2 whitespace-nowrap">
                <span
                  className="w-2.5 h-2.5 rounded"
                  style={{ background: PRODUCTS[active].color }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            role="tooltip"
            className="absolute z-20 bg-warm-50 shadow-xl rounded-lg
              px-3 py-2 text-xs md:text-sm pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: isMobile
                ? 'translate(-50%, -120%)'
                : 'translate(-50%, -100%)',
            }}
          >
            <div className="font-semibold">{tooltip.country}</div>
            <div className="text-black mt-1">
              {tooltip.commodities.join(', ')}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
