import { useEffect, useState } from "react";

export function useLowPowerMode() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    // 1) Reduced motion (iOS Low Power Mode triggers this)
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setLowPower(true);
      return;
    }

    // 2) Data saver (Chrome / Android)
    if ("connection" in navigator) {
      const conn = navigator.connection as any;
      if (conn?.saveData) {
        setLowPower(true);
        return;
      }
    }
  }, []);

  return lowPower;
}
