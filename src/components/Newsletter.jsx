import { motion } from 'framer-motion';

export default function Newsletter() {
  return (
    <section className="py-20 bg-warm-100 px-6 text-center" aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="text-2xl font-semibold mb-4">Weekly Commodity Insights</h2>
      <form className="flex justify-center gap-2" aria-label="Newsletter signup">
        <input aria-label="Email" type="email" required className="border px-4 py-2 rounded w-64" />
        <motion.button whileTap={{ scale: 0.95 }} className="bg-emerald-700 text-white px-6 py-2 rounded">Subscribe</motion.button>
      </form>
    </section>
  );
}
