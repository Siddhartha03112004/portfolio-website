import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { usePointerFine } from "../hooks/usePointerFine";

function clamp(value, max) {
  return Math.max(-max, Math.min(max, value));
}

// Wraps an interactive element so it pulls a few pixels toward the cursor
// while hovered, then eases back on leave. Disabled on touch devices and
// under reduced motion, where it just renders children inertly.
export function Magnetic({ children, strength = 0.3, maxOffset = 6, className = "inline-flex" }) {
  const prefersReducedMotion = useReducedMotion();
  const isFine = usePointerFine();
  const enabled = isFine && !prefersReducedMotion;

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const handleMouseMove = (event) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(clamp((event.clientX - centerX) * strength, maxOffset));
    y.set(clamp((event.clientY - centerY) * strength, maxOffset));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
