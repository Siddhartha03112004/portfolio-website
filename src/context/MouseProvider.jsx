import { createContext, useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { usePointerFine } from "../hooks/usePointerFine";

export const MouseContext = createContext(null);

// One shared, spring-smoothed cursor position for the whole page — a single
// window mousemove listener instead of one per reactive element. `enabled`
// is false on touch devices and under reduced motion, so consumers can skip
// their own work entirely rather than render inert motion values.
export function MouseProvider({ children }) {
  const prefersReducedMotion = useReducedMotion();
  const isFine = usePointerFine();
  const enabled = isFine && !prefersReducedMotion;

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return undefined;
    const handleMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, mouseX, mouseY]);

  return (
    <MouseContext.Provider value={{ mouseX, mouseY, smoothX, smoothY, enabled }}>
      {children}
    </MouseContext.Provider>
  );
}
