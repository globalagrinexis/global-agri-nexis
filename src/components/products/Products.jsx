// src/components/products/Products.jsx
import { useState, useMemo, useEffect } from "react";
import { geoCentroid } from "d3-geo";
import { motion } from "framer-motion";
import { sectionHeadingReveal } from "../../lib/motion";

import { PRODUCTS } from "./products.data";
import { useWorldMap } from "./useWorldMap";
import ProductMap from "./ProductMap";
import ProductLegend from "./ProductLegend";
import ProductDropdown from "./ProductDropdown";
import CountryTooltip from "./CountryTooltip";

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


  const { projection, path, graticule, countries } =
    useWorldMap(isDropdownView);

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
    <section id="products" className="py-16 px-4 md:px-20 bg-warm-100">
      <motion.h2
        {...sectionHeadingReveal}
        className="text-3xl font-semibold text-center mb-8"
      >
        Our Global Commodity Footprint
      </motion.h2>

      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {Object.keys(PRODUCTS).map((key) => (
          <button
            key={key}
            onClick={() => {
              setActive(key);
              setActiveCommodity(null);
              setLockedCommodity(null);
            }}
            className={`px-4 py-2 rounded-full border ${
              active === key
                ? "bg-emerald-700 text-white"
                : "hover:bg-warm-gray"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {isDropdownView && (
        <ProductDropdown
          open={dropdownOpen}
          setOpen={setDropdownOpen}
          lockedCommodity={lockedCommodity}
          setLockedCommodity={setLockedCommodity}
          index={PRODUCTS[active].index}
        />
      )}

      <div className="relative rounded-2xl p-2 md:p-4">
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
      </div>

    </section>
  );
}
