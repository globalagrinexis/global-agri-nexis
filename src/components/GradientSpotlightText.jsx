import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function GradientSpotlightText({ children, className = "" }) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e) {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  /* --------------------------------
     BASE + SPOTLIGHT GRADIENTS
  -------------------------------- */

  const baseGradient =
    "linear-gradient(90deg, rgb(0, 188, 125) 0%, rgb(0, 188, 125) 100%)";

  /**
   * IMPORTANT:
   * Larger radius + soft falloff so adjacent lines stay lit
   */
  const spotlightGradient = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(
        260px at ${x}px ${y}px,
        rgba(203,239,172,0.9),
        rgba(84,171,156,0.65),
        rgba(0, 188, 125),
        transparent 75%
      )`
  );

  return (
    <span
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block ${className}`}
      style={{ lineHeight: "1.18" }}
    >
      {/* BASE GRADIENT (always visible) */}
      <span
        className="relative z-10 block bg-clip-text text-transparent"
        style={{
          backgroundImage: baseGradient,
          lineHeight: "1.18"
        }}
      >
        {children}
      </span>

      {/* SPOTLIGHT OVERLAY (covers ALL wrapped lines) */}
      <motion.span
        aria-hidden
        className="absolute inset-0 z-20 block bg-clip-text text-transparent pointer-events-none"
        style={{
          backgroundImage: hovered ? spotlightGradient : "none",
          lineHeight: "1.18"
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
