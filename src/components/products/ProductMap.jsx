// src/components/products/ProductMap.jsx
import CountryLabel from "./CountryLabels";
import { HIGHLIGHT_COLOR } from "../../data/products.data";

export default function ProductMap({
  path,
  graticule,
  countries,
  products,
  active,
  effectiveCommodity,
  annotations,
  setTooltip,
  isDropdownView
}) {
  return (
    <svg viewBox="0 0 960 500" className="w-full h-auto">
      <path
        d={path(graticule())}
        fill="none"
        stroke="#f5b95a"
        strokeWidth={0.5}
      />

      {countries.map((d, i) => {
        const commodities = products[active].countries[d.properties.name];
        const grows =
          commodities &&
          (!effectiveCommodity || commodities.includes(effectiveCommodity));
        const faded = effectiveCommodity && commodities && !grows;

        return (
          <path
            key={i}
            d={path(d)}
            fill={commodities ? HIGHLIGHT_COLOR : "#d8d2c7"}
            opacity={faded ? 0.25 : 1}
            stroke="#fff"
            strokeWidth={0.5}
            onMouseEnter={(e) => {
              if (isDropdownView) return;
              if (effectiveCommodity) return;
              if (!commodities) return;

              setTooltip({
                x: e.clientX,
                y: e.clientY,
                country: d.properties.name,
                commodities,
              });
            }}
            onMouseLeave={() => {
              if (!isDropdownView) setTooltip(null);
            }}
          />

        );
      })}

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
  );
}
