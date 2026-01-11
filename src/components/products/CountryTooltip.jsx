// src/components/products/CountryTooltip.jsx

export default function CountryTooltip({ tooltip }) {
  if (!tooltip) return null;

  return (
    <div
      className="absolute z-30 pointer-events-none
                 bg-warm-50/95 backdrop-blur
                 rounded-lg shadow-lg
                 px-3 py-2 text-sm text-gray-800"
      style={{
        left: tooltip.x,
        top: tooltip.y,
        transform: "translate(-100px, -100px)",
      }}
    >
      <div className="font-semibold mb-0.5">
        {tooltip.country}
      </div>

      <div className="text-xs leading-snug">
        {tooltip.commodities.join(", ")}
      </div>
    </div>
  );
}
