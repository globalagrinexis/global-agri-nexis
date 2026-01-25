import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  textSlide, 
  imageItem,
  imageContainer
} from "../lib/motion"
import cropfieldIMG from "/assets/crop-field.avif";
import pulsesIMG from "/assets/pulses.avif";
import vesselIMG from "/assets/vessel.avif";
import vesselIMGROT from "/assets/vessel-rotated.avif";

export default function Underlay() {
  return (
    <section
      id="about"
      className="relative overflow-x-hidden bg-warm-100 py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12"
    >
      {/* TEXT COLUMN */}
      <motion.div
        className="flex flex-col justify-center"
        variants={textSlide}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }} // waits until section is visible
      >
        <p className="text-lg max-w-xl">
          <span className="text-emerald-600 font-medium">Global Agri Nexis</span> (<span className="text-emerald-600 font-medium">GAN</span>) is a leading international agri-commodities firm
          that brings together growers, sellers, and buyers across the oilseeds,
          pulses, and grains value chain.
        </p>

        <Link
          to="/about"
          state={{ scrollToTop: true }}
          className="link-emerald pt-6 mt-6 text-lg font-medium inline-flex items-center gap-2 w-fit"
        >
          <span data-text="Meet the Team">Meet the Team</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </motion.div>

      {/* IMAGE COLUMN */}
      <div className="relative">
        {/* MOBILE STACK */}
        <motion.div
          className="md:hidden grid grid-cols-2 gap-4"
          variants={imageContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.img
            variants={imageItem}
            src={cropfieldIMG}
            className="rounded-xl object-cover aspect-[4/5]"
            alt="Crop field"
          />

          <motion.img
            variants={imageItem}
            src={pulsesIMG}
            className="rounded-xl object-cover aspect-[4/5]"
            alt="Pulses"
          />

          <motion.img
            variants={imageItem}
            src={vesselIMGROT}
            className="col-span-2 rounded-xl object-cover aspect-[16/9]"
            alt="Cargo vessel"
          />
        </motion.div>

        {/* DESKTOP COLLAGE */}
        <motion.div
          className="hidden md:grid grid-cols-2 grid-rows-2 gap-5 gap-x-2.5 h-[25rem] overflow-hidden"
          variants={imageContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          <motion.img
            variants={imageItem}
            src={pulsesIMG}
            alt="Pulses"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />

          <motion.img
            variants={imageItem}
            src={vesselIMG}
            alt="Cargo vessel"
            className="row-span-2 w-full h-full object-cover scale-90 rounded-xl shadow-lg"
          />

          <motion.img
            variants={imageItem}
            src={cropfieldIMG}
            alt="Crop field"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
