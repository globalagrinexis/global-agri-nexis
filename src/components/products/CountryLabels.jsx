// src/components/products/CountryLabel.jsx
import { HIGHLIGHT_COLOR } from "./products.data";

export default function CountryLabel({ x, y, text }) {
  return (
    <g transform={`translate(${x}, ${y})`} pointerEvents="none">
      <circle r={3} fill={HIGHLIGHT_COLOR} />
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
