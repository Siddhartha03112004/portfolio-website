import { useEffect, useState } from "react";

// True for mouse/trackpad input, false for touch-primary devices. Used to
// gate expensive cursor-driven effects (parallax, magnetism, cursor glow)
// so mobile stays cheap and doesn't get janky "phantom hover" behavior.
export function usePointerFine() {
  const [isFine, setIsFine] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(pointer: fine)").matches : true
  );

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const handler = (event) => setIsFine(event.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isFine;
}
