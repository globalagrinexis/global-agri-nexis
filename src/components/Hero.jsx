import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import heroVID from "/hero.mp4";
import heroFALLBACK from "/hero-fallback.png";

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

      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroFALLBACK}
        controls={false}
        tabIndex={-1}
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={heroVID} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 text-gray-200"
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
