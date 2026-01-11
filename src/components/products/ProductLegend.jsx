// src/components/products/ProductLegend.jsx
import { HIGHLIGHT_COLOR } from "./products.data";

export default function ProductLegend({
  index,
  active,
  lockedCommodity,
  effectiveCommodity,
  setActiveCommodity,
  setLockedCommodity,
}) {
  return (
    <div className="absolute top-3 left-3 bg-warm-50/90 backdrop-blur rounded-xl shadow px-3 py-2 text-sm">
      <div className="font-semibold mb-1">Filter</div>
      <ul className="space-y-1">
        {index.map((item) => (
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
            className={`flex items-center gap-2 cursor-pointer transition-[opacity, transform] duration-300 ease-[cubic-bezier(0.22, 1, 0.36, 1)] will-change-[opacity] ${
              effectiveCommodity && effectiveCommodity !== item
                ? "opacity-40"
                : "opacity-100"
            }`}
          >
            <span 
              className={`
                w-2.5 h-2.5 rounded
                ${lockedCommodity === item ? "ring-2 ring-emerald-700" : ""}
              `}
              style = {{backgroundColor: HIGHLIGHT_COLOR}} 
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
