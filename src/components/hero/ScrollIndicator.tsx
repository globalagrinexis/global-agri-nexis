import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  // IntersectionObserver for hero
  useEffect(() => {
    heroRef.current = document.querySelector<HTMLElement>("#hero"); // adjust your hero id
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setHeroVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll listener to hide indicator
  useMotionValueEvent(scrollY, "change", () => {
    if (!hidden) setHidden(true);

    // reset timer
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (heroVisible) setHidden(false);
    }, 2000); // 2 seconds of no scrolling -> show again
  });

  return (
    <>
      {/* Desktop: Mouse scroll wheel */}
      <motion.div
        className="hidden md:flex w-6 h-10 rounded-full border border-white/60 justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="w-1 h-1 bg-white rounded-full"
          initial={{ y: 4, opacity: 0 }}
          animate={{
            y: [4, 18],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Mobile: Chevron swipe hint */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50 flex flex-col items-center text-white/80 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Chevron />
        </motion.div>
      </motion.div>
    </>
  );
}

function Chevron() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
