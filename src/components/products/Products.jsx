// src/components/products/Products.jsx
import { useState, useMemo, useEffect } from "react";
import { geoCentroid } from "d3-geo";
import { motion } from "framer-motion";

import { PRODUCTS } from "../../data/products.data";
import { useWorldMap } from "./useWorldMap";
import ProductMap from "./ProductMap";
import ProductLegend from "./ProductLegend";
import ProductDropdown from "./ProductDropdown";
import CountryTooltip from "./CountryTooltip";

// --- Motion Variants ---
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25, // slower stagger
      when: "beforeChildren",
      delayChildren: 0.1, // slight delay before children animate
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }, // slower
};

const headingReveal = {
  hidden: { opacity: 0, y: -25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }, // slower
};

// --- Main Component ---
export default function Products() {
  const [active, setActive] = useState("Oilseeds");
  const [activeCommodity, setActiveCommodity] = useState(null);
  const [lockedCommodity, setLockedCommodity] = useState(null);
  const effectiveCommodity = lockedCommodity ?? activeCommodity;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  const isDropdownView =
    typeof window !== "undefined" && window.innerWidth < 1024;

  useEffect(() => {
    if (isDropdownView) return;
    const handler = () => setTooltip(null);
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [isDropdownView]);

  const { projection, path, graticule, countries } = useWorldMap(isDropdownView);

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

  return (
    <section className="py-16 px-4 md:px-20 bg-warm-100">
      {/* Heading */}
      <motion.h2
        variants={headingReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }} // trigger only when ~40% visible
        className="text-3xl font-semibold text-center mb-8"
      >
        Our Global Commodity Footprint
      </motion.h2>

      {/* Staggered container */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Category Buttons */}
        <motion.div className="flex justify-center gap-3 mb-6 flex-wrap">
          {Object.keys(PRODUCTS).map((key) => (
            <motion.button
              key={key}
              variants={fadeUp}
              onClick={() => {
                setActive(key);
                setActiveCommodity(null);
                setLockedCommodity(null);
              }}
              className={`px-4 py-2 rounded-full cursor-pointer border ${
                active === key
                  ? "bg-emerald-700 text-white"
                  : "hover:bg-warm-gray"
              }`}
            >
              {key}
            </motion.button>
          ))}
        </motion.div>

        {/* Mobile Dropdown */}
        {isDropdownView && (
          <motion.div variants={fadeUp}>
            <ProductDropdown
              open={dropdownOpen}
              setOpen={setDropdownOpen}
              lockedCommodity={lockedCommodity}
              setLockedCommodity={setLockedCommodity}
              index={PRODUCTS[active].index}
            />
          </motion.div>
        )}

        {/* Map + Legend */}
        <motion.div
          className="relative rounded-2xl p-2 w-full md:p-4"
          variants={fadeUp}
        >
          <ProductMap
            path={path}
            graticule={graticule}
            countries={countries}
            products={PRODUCTS}
            active={active}
            effectiveCommodity={effectiveCommodity}
            annotations={annotations}
            setTooltip={setTooltip}
            isDropdownView={isDropdownView}
          />

          {!isDropdownView && !effectiveCommodity && (
            <CountryTooltip tooltip={tooltip} />
          )}

          {!isDropdownView && (
            <ProductLegend
              index={PRODUCTS[active].index}
              lockedCommodity={lockedCommodity}
              effectiveCommodity={effectiveCommodity}
              setActiveCommodity={setActiveCommodity}
              setLockedCommodity={setLockedCommodity}
            />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
