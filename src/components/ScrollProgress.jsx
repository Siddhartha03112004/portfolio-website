import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

// A hairline at the very top of the viewport that fills as the visitor
// scrolls Home -> Contact. Minimal on purpose — a cue, not a UI element.
export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-accent-400 via-accent-300 to-cyan-300"
      style={{ scaleX: prefersReducedMotion ? scrollYProgress : scaleX }}
    />
  );
}
