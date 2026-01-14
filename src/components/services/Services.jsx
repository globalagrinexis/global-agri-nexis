// src/components/Services.jsx
import { BentoGrid, BentoGridItem } from "./bento-grid";
import { motion } from "framer-motion";
import { sectionHeadingReveal } from "../../lib/motion";
import { services } from "./services.data.jsx";

export default function Services() {
  return (
    <section
      id="services"
      className="bg-warm-gray py-20 px-6 md:px-20"
      aria-labelledby="services-heading"
    >
      <motion.h2
        id="services-heading"
        {...sectionHeadingReveal}
        className="text-3xl font-semibold mb-12 text-center"
      >
        What We Offer
      </motion.h2>

      <BentoGrid className="bg-warm-gray max-w-7xl mx-auto">
        {services.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </section>
  );
}
