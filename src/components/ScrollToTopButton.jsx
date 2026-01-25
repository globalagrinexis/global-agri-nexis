// src/components/ScrollToTopButton.jsx
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(true);
        controls.start({ y: [0, -6, 0], transition: { repeat: Infinity, duration: 1.2 } }); // bounce
      } else {
        setVisible(false);
        controls.stop();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  // Scroll handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-10 right-5 md:hidden z-50"
    >
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center w-12 h-12 bg-black/80 hover:bg-black text-white rounded-full shadow-lg"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={controls}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </motion.svg>
      </button>
    </motion.div>
  );
}
