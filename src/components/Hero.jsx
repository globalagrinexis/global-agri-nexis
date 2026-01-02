import { motion } from "framer-motion";

const base = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-rye-fallback.png"
      >
        <source src="/hero-rye.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-gray-200 z-10 h-full flex flex-col justify-center px-6 md:px-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold max-w-2xl">
          Sourcing <span className="text-emerald-500">quality</span>, sustaining{" "}
          <span className="text-emerald-500">trust</span>.
        </h1>
        <a
          href="#reachout"
          className="link-highlight link-highlight--emerald pt-5 mt-6 text-lg w-fit"
        >
          Connect with us
        </a>
      </motion.div>
    </section>
  );
}
