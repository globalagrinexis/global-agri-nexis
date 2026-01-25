// Newsletter.jsx
import { motion } from "framer-motion";
import { sectionHeadingReveal } from "../lib/motion";

export default function Newsletter({ compact = false }) {
  return (
    <section
      className={
        compact
          ? "text-sm"
          : "py-20 bg-warm-100 px-6 text-center"
      }
      aria-labelledby="newsletter-heading"
    >
      <p 
        id="newsletter-heading"
        className={`"font-bold pb-4 mb-4" ${
          compact ? "text-lg" : "text-2xl"
        }`}
      >
        Commodity Newsletter
      </p>

      <form
        className={`flex gap-2 ${
          compact
            ? "flex-col lg:flex-row lg:items-center"
            : "justify-center"
        }`}
        aria-label="Newsletter signup"
      >
        <input
          aria-label="Email"
          type="email"
          placeholder="name@company.com"
          required
          className={`border px-3 py-2 rounded bg-warm-50 text-black ${
            compact ? "w-full lg:w-48" : "w-64"
          }`}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-4 py-2 rounded whitespace-nowrap w-full lg:w-auto"
        >
          Subscribe
        </motion.button>
      </form>


    </section>
  );
}
