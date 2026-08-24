import { motion, useReducedMotion } from "framer-motion";

// Shared scroll-reveal wrapper. `direction` lets different sections read
// distinctly (up / left / right / scale) while sharing one easing language.
// Respects prefers-reduced-motion by skipping the transform and only fading
// content in.
export function Reveal({ children, delay = 0, y = 18, x = 24, className, as = "div", once = true, direction = "up" }) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  let initial = { opacity: 0, y: prefersReducedMotion ? 0 : y };
  let animate = { opacity: 1, y: 0 };

  if (direction === "left" || direction === "right") {
    const offset = prefersReducedMotion ? 0 : direction === "left" ? -x : x;
    initial = { opacity: 0, x: offset };
    animate = { opacity: 1, x: 0 };
  } else if (direction === "scale") {
    initial = { opacity: 0, scale: prefersReducedMotion ? 1 : 0.94 };
    animate = { opacity: 1, scale: 1 };
  }

  return (
    <Component
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
