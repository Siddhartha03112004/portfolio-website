import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// One layer of the architecture visualization. Reacts to the cursor with a
// tiny nudge-toward-pointer (not a tilt), brightens on hover, and briefly
// glows when the traveling data packet arrives — all deliberately subtle.
export function SystemNode({ node, index, isActive, isHovered, isNetworkLit, isDimmed, onHover, onLeave, registerRef }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = node.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  const handleMouseMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 6);
    y.set(py * 4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
  };

  const lit = isHovered || isActive;

  return (
    <motion.div
      ref={registerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
      className={`relative flex items-center gap-3 rounded-2xl border px-5 py-3.5 w-full transition-[border-color,background-color,box-shadow,opacity] duration-500 ease-out ${
        lit
          ? "border-accent-400/45 bg-white/[0.05] shadow-[0_0_0_1px_rgba(129,140,248,0.12),0_0_24px_-6px_rgba(99,102,241,0.45)]"
          : "border-white/10 bg-base-900/80 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
      } ${isNetworkLit && !lit ? "border-accent-400/20" : ""} ${isDimmed ? "opacity-55" : "opacity-100"}`}
    >
      <span
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
          lit ? "bg-accent-500/25 text-accent-200 scale-[1.08]" : "bg-accent-500/10 text-accent-300"
        }`}
      >
        {!prefersReducedMotion && (
          <span
            className={`absolute -inset-1.5 rounded-full blur-md transition-opacity duration-500 ${
              lit ? "opacity-70 bg-accent-400/40" : "opacity-0"
            }`}
          />
        )}
        <span className="relative">
          <Icon size={18} strokeWidth={1.75} />
        </span>
        {!prefersReducedMotion && (
          <span className="absolute inset-0 rounded-xl bg-accent-500/20 animate-pulse-slow" />
        )}
      </span>
      <span className={`text-sm font-medium transition-colors duration-500 ${lit ? "text-ink-50" : "text-ink-200"}`}>
        {node.label}
      </span>
    </motion.div>
  );
}
