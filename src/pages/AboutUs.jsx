import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import parallaxIMG from '/soybean.jpg';

export default function AboutUs() {
  const base = import.meta.env.BASE_URL;

  /* Parallax setup */
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yTextLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const yTextRight = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="bg-warm-100 text-gray-900">
      {/* ================= INTRO ================= */}
      <section className="bg-emerald-700 text-gray-100 py-24 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl pt-8 md:text-5xl font-bold mb-4">
            Global Agri Nexis
          </h1>
          <p className="text-lg text-gray-100">
            Global commodity markets are more difficult to understand than ever.
            <br />
            We are here to change that.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 pt-20 pb-24">
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          GAN is a team of seasoned and passionate trader-brokers dedicated to
          bringing clarity, transparency, and data-driven insight to the
          increasingly complex global commodity markets. Acting as pure
          intermediaries, GAN specializes in the import of Oilseeds, Pulses, and
          Grains—particularly Desi Chickpeas, Yellow Peas, Pigeon Peas, Black
          Matpe, and Lentils—along with the import of oils and oilseeds and the
          export of oil meal on C&F, CIF, and High Seas bases.
          <br />
          <br />
          Backed by promoters with up to 40 years of deep industry experience
          across imports and general trade, the firm combines institutional
          knowledge with a modern, client-centric approach.
          <br />
          <br />
          GAN is committed to keeping clients continuously informed through
          timely market bids and offers, ensuring fair, efficient, and
          professional execution of every transaction. With strong,
          long-standing relationships with refiners and leading national and
          multinational companies, GAN consistently secures optimal outcomes
          for both buyers and sellers.
          <br />
          <br />
          By consciously avoiding self-trading, the firm reinforces its core
          values of honesty, integrity, and transparency, building lasting
          trust in every engagement.
        </p>
      </section>

      {/* ================= PARALLAX SECTION ================= */}
      <section ref={parallaxRef} className="relative h-screen overflow-hidden">
        {/* Background image */}
        <motion.div
          style={{
            y: yBg,
            backgroundImage: `url(${parallaxIMG})`,
          }}
          className="absolute -inset-x-0 -top-1/4 h-[140%] bg-cover bg-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Left text */}
        <motion.div
          style={{ y: yTextLeft }}
          className="absolute left-6 md:left-20 top-20 max-w-md text-gray-100"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Transparency.
            <br />
            Trust.
            <br />
            Precision.
          </h2>
        </motion.div>

        {/* Right text */}
        <motion.div
          style={{ y: yTextRight }}
          className="absolute right-6 md:right-20 bottom-24 max-w-sm text-gray-100 text-right"
        >
          <p className="text-lg">
            Built on relationships.
            <br />
            Driven by insight.
          </p>
        </motion.div>
      </section>

      {/* ================= MANAGEMENT ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-24">
        <h2 className="text-3xl font-semibold mb-12">The Management</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-warm-50 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm"
            >
              <div className="w-40 h-40 rounded-full bg-warm-gray mb-6" />

              <h3 className="font-semibold text-lg">Director Name</h3>
              <p className="text-sm text-gray-500 mb-4">Designation</p>

              <p className="text-sm text-gray-700 mb-4">
                Brief profile description of the director highlighting
                experience, expertise, and leadership within the organization.
              </p>

              <div className="flex gap-4 text-sm text-emerald-600">
                <a href="#" className="hover:underline">
                  LinkedIn
                </a>
                <a href="#" className="hover:underline">
                  Email
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
