/* ---------------- Motion Variants ---------------- */

export const heroTextReveal = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
};

export const sectionHeadingReveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export const pagesHeadingReveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

/* ---------------- Underlay ---------------- */

export const imageContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,     // ⬅️ slower stagger
      delayChildren: 0.25,
    },
  },
};

export const imageItem = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,            // ⬅️ slower image motion
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const textSlide = {
  hidden: {
    opacity: 0,
    x: 56,                      // ⬅️ more distance = clearer direction
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,            // ⬅️ slower text slide
      ease: [0.22, 1, 0.36, 1],
      delay: 1.2,               // ⬅️ clearly after images
    },
  },
};


/* ---------------- Services/Bento Grid ---------------- */

export const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,     // slow, deliberate cadence
      delayChildren: 0.15,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


/* ---------------- About Us ---------------- */

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const imageVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.15,
    },
  },
};
