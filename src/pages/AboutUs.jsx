import { motion, useScroll, useTransform } from "framer-motion";
import { pagesHeadingReveal } from "../lib/motion"
import TeamCard from "../components/TeamCard";
import { teamMembers } from "../data/team.data";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import parallaxIMG from "/assets/soybean.avif";

export default function AboutUs() {
  const location = useLocation();

  /* --------------------------------
     Scroll to top when navigated
     from quick links
  -------------------------------- */
  useEffect(() => {
    if (location.state?.scrollToTop) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        // Clear state to prevent re-trigger
        window.history.replaceState({}, document.title);
      });
    }
  }, [location]);

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
      <section className="bg-gradient-to-r from-emerald-800 via-emerald-700 via-emerald-600 via-emerald-700 to-emerald-800 text-gray-100 py-24 px-6 md:px-20">
        <motion.div
          {...pagesHeadingReveal}
          className="max-w-3xl"
        >
          <h1 
            className="text-4xl pt-8 md:text-5xl font-bold mb-4"
          >
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
        <p className="text-gray-700 text-justify leading-relaxed max-w-4xl">
          Global Agri Nexis is a specialized agricultural commodity brokerage firm focused on facilitating transparent, efficient, and reliable trade across global agri-markets. We act as a strategic intermediary between producers, processors, traders, and end-users, enabling seamless execution across the agricultural value chain.
          <br />
          <br />
          Backed by promoters with upto 40 years of deep industry experience across imports and general trade, the firm combines institutional knowledge with a modern, client-centric approach. With a strong grounding in market intelligence, trade structuring, and commercial risk management, we support our clients in navigating volatile commodity markets with clarity and confidence. Our approach combines deep product knowledge with disciplined execution, ensuring that every transaction is aligned with prevailing market dynamics, regulatory frameworks, and counterpart objectives.
          <br />
          <br />
          At Global Agri Nexis, we cover a wide range of agricultural commodities, with particular expertise in pulses, grains, oilseeds, and related agri-products. We assist clients across domestic and international markets, offering brokerage solutions that emphasize price discovery, contract optimization, and counterparty alignment.
          <br />
          <br />
          Integrity, independence, and precision form the cornerstone of our operations. We do not trade on our own account, allowing us to remain fully aligned with our clients’ interests while delivering unbiased market insights and execution support.
          <br />
          <br />
          Backed by industry experience and a global network of buyers and sellers, Global Agri Nexis is positioned as a trusted partner for businesses seeking dependable brokerage services in an increasingly complex agri-commodity landscape.
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
            Trust.
            <br />
            Transparency.
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            The Leadership Team
          </h2>
          <p className="max-w-2xl text-gray-600">
            Experience that moves markets.
          </p>
        </motion.div>

        <div className="space-y-6">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
