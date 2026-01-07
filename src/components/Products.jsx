/* ================= Products.jsx (Desktop legend + Mobile dropdown) ================= */
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
  const [activeCommodity, setActiveCommodity] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const containerRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const projection = geoNaturalEarth1()
    .scale(isMobile ? 170 : 160)
    .translate([480, 250]);

  const path = geoPath(projection);
  const graticule = geoGraticule();

  const countries = useMemo(
    () => feature(worldData, worldData.objects.countries).features,
    []
  );

  // Close tooltip on outside click (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setTooltip(null);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [isMobile]);

  return (
    <section id="products" className="py-16 md:py-20 px-4 md:px-20 bg-warm-100">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Our Global Commodity Footprint
      </h2>

      {/* Category buttons */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {Object.keys(PRODUCTS).map(key => (
          <button
            key={key}
            onClick={() => {
              setActive(key);
              setActiveCommodity(null);
              setTooltip(null);
            }}
            className={`px-4 py-2 rounded-full border transition
              ${active === key
                ? 'bg-emerald-700 text-white'
                : 'hover:bg-warm-gray'}`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* MOBILE DROPDOWN LEGEND */}
      {isMobile && (
        <div className="relative mb-4 max-w-sm mx-auto">
          <button
            onClick={() => setDropdownOpen(v => !v)}
            className="w-full flex items-center justify-between
              rounded-full px-5 py-3
              bg-warm-50 border border-warm-200
              text-sm font-medium
              transition hover:border-emerald-500"
          >
            <span className={activeCommodity ? "text-gray-800" : "text-gray-400"}>
              {activeCommodity || "Filter by commodity"}
            </span>

            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              className="absolute z-30 mt-2 w-full
                rounded-2xl bg-warm-50
                border border-warm-200
                overflow-hidden"
            >
              <button
                onClick={() => {
                  setActiveCommodity(null);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-5 py-3
                  text-sm hover:bg-warm-100 transition"
              >
                All commodities
              </button>

              {PRODUCTS[active].index.map(item => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveCommodity(item);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-5 py-3
                    text-sm hover:bg-warm-100 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      )}


      <div ref={containerRef} className="relative bg-warm-100 rounded-2xl p-2 md:p-4">
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

              const growsCommodity =
                commodities &&
                (!activeCommodity || commodities.includes(activeCommodity));

              const isHighlighted = Boolean(commodities);
              const faded =
                activeCommodity && isHighlighted && !growsCommodity;

              return (
                <path
                  key={i}
                  d={path(d)}
                  fill={
                    isHighlighted
                      ? PRODUCTS[active].color
                      : '#d8d2c7ff'
                  }
                  opacity={
                    faded ? 0.25 : 1
                  }
                  stroke="#FFF"
                  strokeWidth={0.5}
                  onMouseEnter={(e) => {
                    if (isMobile || !isHighlighted) return;
                    setTooltip({
                      x: e.clientX + 12,
                      y: e.clientY + 12,
                      country: d.properties.name,
                      commodities,
                    });
                  }}
                  onMouseLeave={() => !isMobile && setTooltip(null)}
                />
              );
            })}
          </g>
        </svg>

        {/* DESKTOP LEGEND ONLY */}
        {!isMobile && (
          <div className="absolute top-3 left-3 bg-warm-50/90 backdrop-blur
            rounded-xl shadow px-3 py-2 text-sm"
          >
            <div className="font-semibold mb-1">Filter</div>
            <ul className="space-y-1">
              {PRODUCTS[active].index.map(item => (
                <li
                  key={item}
                  className="flex items-center gap-2 cursor-pointer"
                  onMouseEnter={() => setActiveCommodity(item)}
                  onMouseLeave={() => setActiveCommodity(null)}
                >
                  <span
                    className="w-2.5 h-2.5 rounded"
                    style={{ background: PRODUCTS[active].color }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* DESKTOP TOOLTIP */}
        {!isMobile && tooltip && (
          <div
            role="tooltip"
            className="absolute z-20 bg-warm-50 shadow-xl rounded-lg
              px-3 py-2 text-sm pointer-events-none"
            style={{
              left: tooltip.x - 150,
              top: tooltip.y - 150,
            }}
          >
            <div className="font-semibold">{tooltip.country}</div>
            <div className="mt-1">
              {tooltip.commodities.join(', ')}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
