import { motion } from "framer-motion";
import { useMouse } from "../hooks/useMouse";

// A very soft light that follows the cursor across the entire page, sitting
// above the fixed background but behind all content. This is the "the page
// itself is reacting to you" cue — deliberately faint, never a spotlight.
export function CursorAmbient() {
  const { smoothX, smoothY, enabled } = useMouse();

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed -z-[5] h-[26rem] w-[26rem] rounded-full bg-accent-500/[0.04] blur-[110px]"
      style={{ left: smoothX, top: smoothY, translateX: "-50%", translateY: "-50%" }}
    />
  );
}
