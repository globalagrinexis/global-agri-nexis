import { Link } from "react-router-dom";
import cropfieldIMG from "/crop-field.avif";
import pulsesIMG from "/pulses.avif";
import vesselIMG from "/vessel.avif";
import vesselIMGROT from "/vessel-rotated.avif";

export default function Underlay() {
  
  return (
    <section
      id="about"
      className="relative overflow-x-hidden bg-warm-100 py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12"
    >
      {/* TEXT COLUMN */}
      <div className="flex flex-col justify-center">
        <p className="text-lg max-w-xl">
          Global Agri Nexis (GAN) is a leading international agri-commodities firm
          that brings together growers, sellers, and buyers across the oilseeds,
          pulses, and grains value chain.
        </p>
        <Link
          to="/about"
          className="link-emerald mt-6 inline-block w-fit"
        >
          <span data-text="Meet the Team">Meet the Team</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>

      {/* IMAGE COLUMN */}
      <div className="relative">
        {/* MOBILE STACK */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          <img
            src={cropfieldIMG}
            className="rounded-xl object-cover aspect-[4/5]"
            alt="Crop field"
          />
          <img
            src={pulsesIMG}
            className="rounded-xl object-cover aspect-[4/5]"
            alt="Pulses"
          />
          <img
            src={vesselIMGROT}
            className="col-span-2 rounded-xl object-cover aspect-[16/9]"
            alt="Cargo vessel"
          />
        </div>

        {/* DESKTOP COLLAGE */}
        <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-5 gap-x-2.5 h-[25rem]overflow-hidden">
          <img
            src={pulsesIMG}
            alt="Pulses"
            className="
                w-full h-full
                object-cover
                rounded-xl
                shadow-lg
            "
          />

          <img
            src={vesselIMG}
            alt="Cargo vessel"
            className="
              row-span-2
              w-full h-full
              object-cover
              scale-90
              rounded-xl
              shadow-lg
            "
          />
          
          <img
            src={cropfieldIMG}
            alt="Crop field"
            className="
              w-full h-full
              object-cover
              rounded-xl
              shadow-lg
            "
          />
        </div>
      </div>
    </section>
  );
}
