// src/components/ui/bento-grid.tsx
import { cn } from "../../lib/utils";

export function BentoGrid({ className, children }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[18rem]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  icon,
}) {
  return (
    <div
      className={cn(
        "relative group rounded-2xl bg-warm-100 p-6 shadow transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
