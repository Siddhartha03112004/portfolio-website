import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Parses a leading number off strings like "250+" or "2026" so stat values
// can stay as plain display strings in the data file.
function parseValue(raw) {
  const match = /^(\d+)(.*)$/.exec(raw);
  if (!match) return null;
  return { target: Number(match[1]), suffix: match[2] };
}

export function AnimatedCounter({ value, duration = 1.4, className }) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(parsed ? 0 : value);

  useEffect(() => {
    if (!parsed) return;
    if (!isInView || prefersReducedMotion) {
      setDisplay(parsed.target);
      return;
    }
    const controls = animate(0, parsed.target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, parsed, duration]);

  return (
    <span ref={ref} className={className}>
      {parsed ? `${display}${parsed.suffix}` : value}
    </span>
  );
}
