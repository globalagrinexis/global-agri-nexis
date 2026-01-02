import { Link } from "react-router-dom";
import cropfieldIMG from "/crop-field.jpg";
import pulsesIMG from "/pulses.jpg";
import vesselIMG from "/vessel.jpg";

export default function Underlay() {
  
  return (
    <section
      id="about"
      className="bg-warm-100 py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12"
    >
      {/* TEXT COLUMN */}
      <div className="flex flex-col justify-center">
        <p className="text-lg max-w-xl">
          Global Agri Nexis (GAN) is a leading international agri-commodities firm
          that brings together growers, sellers, and buyers across the oilseeds,
          pulses and grains value chain.
        </p>

        <Link
          to="/about"
          className="link-highlight link-highlight--emerald mt-6 inline-block w-fit"
        >
          Meet the Team
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
            src={vesselIMG}
            className="col-span-2 rounded-xl object-cover aspect-[16/9]"
            alt="Cargo vessel"
          />
        </div>

        {/* DESKTOP COLLAGE */}
        <div className="hidden md:block relative h-[20rem]">
          <img
            src={vesselIMG}
            alt="Cargo vessel"
            className="absolute h-47 left-62 bottom-23 rotate-90 rounded-xl shadow-lg"
          />
          <img
            src={pulsesIMG}
            alt="Pulses"
            className="absolute h-40 left-8 bottom-48 rounded-xl shadow-md"
          />
          <img
            src={cropfieldIMG}
            alt="Crop field"
            className="absolute w-65 left-1 top-38 rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
