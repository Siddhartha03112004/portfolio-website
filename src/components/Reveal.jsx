import { motion, useReducedMotion } from "framer-motion";

// Shared scroll-reveal wrapper. Respects prefers-reduced-motion by skipping
// the transform and only fading content in.
export function Reveal({ children, delay = 0, y = 18, className, as = "div", once = true }) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
