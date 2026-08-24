import { motion, useReducedMotion } from "framer-motion";

// Fixed positions so the twinkle layer doesn't reshuffle on re-render.
const particles = [
  { top: "12%", left: "18%", size: 2, delay: 0 },
  { top: "22%", left: "72%", size: 3, delay: 1.2 },
  { top: "38%", left: "8%", size: 2, delay: 2.1 },
  { top: "48%", left: "88%", size: 2, delay: 0.6 },
  { top: "64%", left: "35%", size: 3, delay: 1.8 },
  { top: "76%", left: "62%", size: 2, delay: 0.3 },
  { top: "85%", left: "15%", size: 2, delay: 2.6 },
  { top: "8%", left: "48%", size: 2, delay: 1.5 },
  { top: "58%", left: "78%", size: 2, delay: 2.9 },
];

const blobs = [
  {
    className: "top-[-14%] left-[6%] h-[40rem] w-[40rem] bg-accent-600/22",
    animate: { x: [0, 70, -20, 0], y: [0, 50, 90, 0], scale: [1, 1.08, 0.96, 1] },
    duration: 28,
  },
  {
    className: "top-[24%] right-[-16%] h-[34rem] w-[34rem] bg-cyan-500/14",
    animate: { x: [0, -60, 25, 0], y: [0, -40, 55, 0], scale: [1, 0.94, 1.06, 1] },
    duration: 34,
  },
  {
    className: "bottom-[-16%] left-[28%] h-[32rem] w-[32rem] bg-accent-500/14",
    animate: { x: [0, 45, -65, 0], y: [0, -45, 25, 0], scale: [1, 1.05, 0.95, 1] },
    duration: 31,
  },
  {
    className: "top-[55%] left-[52%] h-[24rem] w-[24rem] bg-cyan-400/10",
    animate: { x: [0, -35, 40, 0], y: [0, 35, -25, 0] },
    duration: 24,
  },
];

// A shooting star travels from (top, left) along (dx, dy). rotateDeg orients
// the streak so its gradient tail trails behind the direction of travel.
function star(top, left, dx, dy, duration, delay, repeatDelay) {
  const rotateDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { top, left, dx, dy, rotateDeg, duration, delay, repeatDelay };
}

const shootingStars = [
  star("6%", "10%", 280, 140, 1.5, 0, 7.5),
  star("14%", "58%", 240, 160, 1.3, 3.2, 9),
  star("2%", "78%", 300, 120, 1.7, 6.4, 8),
  star("24%", "28%", 250, 170, 1.4, 4.6, 10.5),
  star("10%", "42%", 210, 110, 1.2, 8.4, 7),
];

// Sophisticated dark backdrop: base color, fine grid, drifting glows, a
// continuous flowing-star layer, and a subtle noise texture. Fixed and
// behind everything, never interactive. Motion is disabled under
// prefers-reduced-motion.
export function Background() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-base-950 bg-grid bg-noise" aria-hidden="true">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[130px] will-change-transform ${blob.className}`}
          animate={prefersReducedMotion ? undefined : blob.animate}
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ top: p.top, left: p.left, height: p.size, width: p.size }}
          animate={prefersReducedMotion ? { opacity: 0.3 } : { opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {!prefersReducedMotion &&
        shootingStars.map((s, i) => (
          <motion.span
            key={i}
            className="absolute h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-white to-white shadow-[0_0_10px_2px_rgba(165,180,252,0.8)] will-change-transform"
            style={{ top: s.top, left: s.left, rotate: s.rotateDeg, transformOrigin: "left center" }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, s.dx * 0.12, s.dx * 0.75, s.dx],
              y: [0, s.dy * 0.12, s.dy * 0.75, s.dy],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: s.repeatDelay,
              ease: "linear",
              times: [0, 0.12, 0.75, 1],
            }}
          />
        ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-950" />
    </div>
  );
}
