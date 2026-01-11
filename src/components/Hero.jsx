import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import heroFALLBACK from "/hero-fallback.avif";
import HeroVideo from "./ui/HeroVideo.jsx";
import {textReveal} from "../lib/motion.ts"

export default function Hero() {
  const videoRef = useRef(null);

  /* ---------------------------------
     Force autoplay (iOS-safe)
  ---------------------------------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked → fallback image remains
      });
    }
  }, []);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Hard fallback image */}
      <img
        src={heroFALLBACK}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* TODO: make a separate working version for iOS devices that either relies on a shorter vid or a fall back IMG entirely */}
      {/* Video */}
      <HeroVideo />


      {/* Overlay */}
      {/* <div className="absolute inset-0 backdrop-blur-sm bg-gray-700/15" /> */}

      {/* Content */}
      <motion.div
        {...textReveal}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 text-gray-200 hero-text-shadow"
      >
        <h1 className="text-4xl md:text-7xl max-w-2xl">
            Sourcing quality, sustaining trust.
        </h1>

        <a
          href="mailto:info@globalagrinexis.com"
          className="link-white pt-5 mt-6 text-lg text-gray-100 w-fit"
        >
          <span className="text-gray-100" data-text="Connect with us">Connect with us</span>
        </a>

      </motion.div>
    </section>
  );
}
