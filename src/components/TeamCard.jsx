import { motion } from "framer-motion";

/* ---------------- Motion Variants ---------------- */

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const textVariants = (isReversed) => ({
  hidden: { opacity: 0, x: window.innerWidth < 768 ? -40 : isReversed ? -40 : 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
  },
});

/* ---------------- Team Card ---------------- */

export default function TeamCard({ member, index }) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className="
        relative rounded-3xl
        bg-warm-50 backdrop-blur
        border border-gray-100
        shadow-sm
        px-10 py-12
        transition-shadow duration-300
        md:hover:shadow-md
      "
    >
      <div
        className={`
          grid gap-6 items-center
          md:grid-cols-[1fr_220px]
          ${isReversed ? "md:grid-cols-[220px_1fr]" : ""}
        `}
      >
        {/* TEXT */}
        <motion.div
          variants={textVariants(isReversed)}
          className={`
            ${isReversed ? "md:order-2 md:text-right" : ""}
          `}


        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            {member.name}
          </h3>

          <p className="text-emerald-600 font-medium mb-6">
            {member.role}
          </p>

          <div className="text-sm text-gray-600 text-justify leading-relaxed space-y-4">
            {member.bio}
          </div>

          <div className={`flex gap-6 mt-6 text-sm font-medium ${isReversed ? "md:justify-end" : ""}`}>
            {member.links.linkedin && (
              <a
                href={member.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 link-emerald"
                data-text="LinkedIn"
              >
                LinkedIn
              </a>
            )}

            {member.links.email && (
              <a
                href={member.links.email}
                className="text-emerald-600 link-emerald"
                data-text="Email"
              >
                Email
              </a>
            )}
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          variants={imageVariants}
          className={`relative flex justify-center ${isReversed ? "md:order-1" : ""}`}
        >
          <div className="relative w-48 h-64">
            {/* 1️⃣ Bottom image */}
            <img
              src={member.image}
              alt={member.name}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 object-contain z-0 pointer-events-none drop-shadow-md"
            />

            {/* 2️⃣ Masking layer */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-16 bg-warm-50 rounded-full z-[1] pointer-events-none translate-y-4" />

            {/* 3️⃣ Circle mask */}
            <div className="absolute bottom-0 w-47 h-47 rounded-full bg-warm-gray/80 left-1/2 -translate-x-1/2 z-10 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 object-contain pointer-events-none"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
