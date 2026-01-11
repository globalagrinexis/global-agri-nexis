/* ================= Products.jsx ================= */
import { useState, useMemo, useRef, useEffect } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule, geoCentroid } from "d3-geo";
import { motion } from "framer-motion";
import { feature } from "topojson-client";
import worldData from "../data/world-110m.json";

const HighlightCOLOR = "oklch(50.8% 0.118 165.612)";

/* ================= DATA ================= */

const PRODUCTS = {
  Oilseeds: {
    color: HighlightCOLOR,
    countries: {
      "United States of America": ["Soybean"],
      Brazil: ["Soybean"],
      Argentina: ["Soybean", "Sunflower"],
      Canada: ["Canola"],
      Ukraine: ["Soybean", "Sunflower", "Rapeseed"],
      Russia: ["Soybean", "Sunflower", "Rapeseed"],
      India: ["Soybean", "Rapeseed", "Groundnut", "Sesame"],
      Australia: ["Canola"],
      Benin: ["Soybean", "Cottonseed"],
      Togo: ["Soybean"],
      "Burkina Faso": ["Soybean"],
      Myanmar: ["Soybean"],
      Ethiopia: ["Soybean"],
      Tanzania: ["Soybean", "Sesame"],
      Mozambique: ["Soybean"],
      Nigeria: ["Soybean", "Sesame"],
      Philippines: ["Coconut"],
      Paraguay: ["Soybean"],
    },
    index: [
      "Soybean",
      "Canola",
      "Rapeseed",
      "Groundnut",
      "Sesame",
      "Cottonseed",
      "Coconut",
    ],
  },

  Pulses: {
    color: HighlightCOLOR,
    countries: {
      India: ["Lentils", "Chickpeas", "Pigeon Peas", "Black Matpe", "Kidney Beans"],
      Canada: ["Faba Beans", "Chickpeas", "Lentils", "Yellow Peas"],
      Australia: ["Faba Beans", "Chickpeas", "Yellow Peas", "Lentils"],
      Myanmar: ["Black Matpe", "Pigeon Peas"],
      Russia: ["Lentils", "Chickpeas", "Yellow Peas"],
      Ethiopia: ["Kidney Beans", "Pigeon Peas", "Chickpeas", "Lentils"],
      Uganda: ["Kidney Beans"],
      Tanzania: ["Chickpeas", "Pigeon Peas"],
      Mozambique: ["Pigeon Peas"],
      Malawi: ["Pigeon Peas"],
      Nigeria: ["Pigeon Peas"],
      Sudan: ["Chickpeas", "Pigeon Peas"],
      Kenya: ["Pigeon Peas"],
      Ukraine: ["Chickpeas", "Peas", "Yellow Peas"],
      Turkey: ["Chickpeas", "Yellow Peas"],
      Brazil: ["Kidney Beans", "Black Matpe"],
      Argentina: ["Kidney Beans", "Chickpeas", "Yellow Peas"],
      Egypt: ["Kidney Beans"],
      Lithuania: ["Yellow Peas"],
      Latvia: ["Yellow Peas"],
      Estonia: ["Yellow Peas"],
      Belarus: ["Yellow Peas"],
    },
    index: [
      "Lentils",
      "Chickpeas",
      "Yellow Peas",
      "Pigeon Peas",
      "Black Matpe",
      "Kidney Beans",
      "Faba Beans",
    ],
  },

  Grains: {
    color: HighlightCOLOR,
    countries: {
      India: ["Wheat", "Rice", "Maize", "Sorghum"],
      Myanmar: ["Maize"],
      China: ["Maize"],
      Vietnam: ["Rice"],
      Thailand: ["Rice"],
      "United States of America": ["Maize", "Wheat", "Sorghum"],
      Ukraine: ["Maize", "Barley", "Sorghum"],
      Russia: ["Wheat", "Barley"],
      Argentina: ["Maize", "Wheat", "Sorghum"],
      Australia: ["Oats", "Wheat", "Barley", "Sorghum"],
      France: ["Barley"],
      Canada: ["Oats"],
    },
    index: ["Wheat", "Rice", "Maize", "Barley", "Sorghum", "Oats"],
  },
};

/* ================= LABEL ================= */

function CountryLabel({ x, y, text }) {
  return (
    <g transform={`translate(${x}, ${y})`} pointerEvents="none">
      <circle r={3} fill={HighlightCOLOR} />
      <rect
        x={8}
        y={-12}
        width={text.length * 6.2 + 10}
        height={18}
        rx={6}
        fill="#fffbf5"
        opacity={0.95}
      />
      <text x={13} y={2} fontSize={11} fill="#111827" fontWeight={500}>
        {text}
      </text>
    </g>
  );
}

/* ================= COMPONENT ================= */

export default function Products() {
  const [active, setActive] = useState("Oilseeds");
  const [activeCommodity, setActiveCommodity] = useState(null);
  const [lockedCommodity, setLockedCommodity] = useState(null);
  const effectiveCommodity = lockedCommodity ?? activeCommodity;

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const containerRef = useRef(null);
  const isDropdownView =
    typeof window !== "undefined" && window.innerWidth < 1024;

  /* ================= MAP ================= */

  const projection = geoNaturalEarth1()
    .scale(isDropdownView ? 170 : 160)
    .translate([480, 250]);

  const path = geoPath(projection);
  const graticule = geoGraticule();

  const countries = useMemo(
    () => feature(worldData, worldData.objects.countries).features,
    []
  );

  /* ================= ANNOTATIONS ================= */

  const annotations = useMemo(() => {
    if (!effectiveCommodity) return [];

    return countries
      .map((d) => {
        const list = PRODUCTS[active].countries[d.properties.name];
        if (!list || !list.includes(effectiveCommodity)) return null;

        const [x, y] = projection(geoCentroid(d));
        return { country: d.properties.name, x, y };
      })
      .filter(Boolean);
  }, [effectiveCommodity, active, countries, projection]);

  /* ================= RENDER ================= */

  return (
    <section id="products" className="py-16 md:py-20 px-4 md:px-20 bg-warm-100">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-semibold text-center mb-8"
      >
        Our Global Commodity Footprint
      </motion.h2>

      {/* CATEGORY BUTTONS */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {Object.keys(PRODUCTS).map((key) => (
          <button
            key={key}
            onClick={() => {
              setActive(key);
              setActiveCommodity(null);
              setLockedCommodity(null);
            }}
            className={`px-4 py-2 rounded-full border transition ${
              active === key
                ? "bg-emerald-700 text-white"
                : "hover:bg-warm-gray"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* MOBILE / TABLET DROPDOWN */}
      {isDropdownView && (
        <div className="relative mb-6 max-w-sm mx-auto">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="w-full flex justify-between items-center px-5 py-3 rounded-full border bg-warm-50"
          >
            {lockedCommodity || "Filter by commodity"}
            <span className={dropdownOpen ? "rotate-180" : ""}>▼</span>
          </button>

          {dropdownOpen && (
            <div className="absolute z-30 mt-2 w-full bg-warm-50 border rounded-xl">
              <button
                onClick={() => {
                  setLockedCommodity(null);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-5 py-3 hover:bg-warm-100"
              >
                All commodities
              </button>

              {PRODUCTS[active].index.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setLockedCommodity(item);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 hover:bg-warm-100"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MAP */}
      <div ref={containerRef} className="relative rounded-2xl p-2 md:p-4">
        <svg viewBox="0 0 960 500" className="w-full h-auto">
          <path
            d={path(graticule())}
            fill="none"
            stroke="#f5b95a"
            strokeWidth={0.5}
          />

          {countries.map((d, i) => {
            const commodities = PRODUCTS[active].countries[d.properties.name];
            const grows =
              commodities &&
              (!effectiveCommodity ||
                commodities.includes(effectiveCommodity));
            const faded = effectiveCommodity && commodities && !grows;

            return (
              <path
                key={i}
                d={path(d)}
                fill={commodities ? HighlightCOLOR : "#d8d2c7"}
                opacity={faded ? 0.25 : 1}
                stroke="#fff"
                strokeWidth={0.5}
              />
            );
          })}

          {/* ANNOTATIONS */}
          {effectiveCommodity &&
            annotations.map((a) => (
              <CountryLabel
                key={a.country}
                x={a.x}
                y={a.y}
                text={a.country}
              />
            ))}
        </svg>

        {/* DESKTOP LEGEND */}
        {!isDropdownView && (
          <div className="absolute top-3 left-3 bg-warm-50/90 backdrop-blur rounded-xl shadow px-3 py-2 text-sm">
            <div className="font-semibold mb-1">Filter</div>
            <ul className="space-y-1">
              {PRODUCTS[active].index.map((item) => (
                <li
                  key={item}
                  onMouseEnter={() =>
                    !lockedCommodity && setActiveCommodity(item)
                  }
                  onMouseLeave={() =>
                    !lockedCommodity && setActiveCommodity(null)
                  }
                  onClick={() =>
                    setLockedCommodity((prev) =>
                      prev === item ? null : item
                    )
                  }
                  className={`flex items-center gap-2 cursor-pointer transition-opacity ${
                    lockedCommodity && lockedCommodity !== item
                      ? "opacity-40"
                      : "opacity-100"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded ${
                      lockedCommodity === item
                        ? "ring-2 ring-emerald-700"
                        : ""
                    }`}
                    style={{ background: HighlightCOLOR }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
