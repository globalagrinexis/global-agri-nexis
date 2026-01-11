import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoURL = "https://cdn.pixabay.com/video/2021/08/10/84624-585553977_large.mp4"

  // Lazy load when hero enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        autoPlay
        loop
        preload="none"
        poster=""
        aria-hidden="true"
      >
        {shouldLoad && (
          <source
            src={videoURL}
            type="video/mp4"
          />
        )}
      </video>
    </div>
  );
}
