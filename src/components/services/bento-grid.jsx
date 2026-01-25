// src/components/bento-grid.jsx
import React from "react";
import { motion } from "framer-motion";
import { 
  gridVariants,
  itemVariants
} from "../../lib/motion"
import { cn } from "../../lib/utils";

/* ---------------- BentoGrid ---------------- */

export function BentoGrid({ className, children }) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- BentoGridItem ---------------- */

export function BentoGridItem({
  className,
  title,
  description,
  icon,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [canExpand, setCanExpand] = React.useState(false);
  const textRef = React.useRef(null);

  const CLAMP_CLASSES = "line-clamp-4 md:line-clamp-5";

  // Detect overflow ONLY in clamped state
  React.useLayoutEffect(() => {
    if (!textRef.current || canExpand) return;

    const el = textRef.current;
    const hasOverflow = el.scrollHeight > el.clientHeight;

    if (hasOverflow) {
      setCanExpand(true);
    }
  }, [description, canExpand]);

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "relative rounded-2xl bg-warm-100 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Title + Icon */}
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-semibold text-lg leading-snug">
          {title}
        </h3>
      </div>

      {/* Description */}
      <div
        ref={textRef}
        className={cn(
          "text-sm text-gray-600 leading-relaxed",
          !expanded && CLAMP_CLASSES
        )}
      >
        {description}
      </div>

      {/* Read more / less */}
      {canExpand && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </motion.div>
  );
}
