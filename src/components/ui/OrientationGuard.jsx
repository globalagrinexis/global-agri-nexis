import { useEffect, useState } from "react";

export default function OrientationGuard() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 768;
      const landscape = window.matchMedia("(orientation: landscape)").matches;
      setIsLandscape(isMobile && landscape);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!isLandscape) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-warm-100 flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="text-4xl mb-4">📱↻</div>
        <h2 className="text-xl font-semibold mb-2">
          Please rotate your device
        </h2>
        <p className="text-gray-600">
          This website is best viewed in portrait mode.
        </p>
      </div>
    </div>
  );
}
