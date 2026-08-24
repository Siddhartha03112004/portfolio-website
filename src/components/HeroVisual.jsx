import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { Layout, Server, Database, Cloud } from "lucide-react";
import { SystemNode } from "./SystemNode";

const nodes = [
  { icon: Layout, label: "React" },
  { icon: Server, label: "REST API" },
  { icon: Database, label: "Database" },
  { icon: Cloud, label: "Cloud Storage" },
];

// The signature visual: a small system diagram where a glowing packet
// continuously travels React -> REST API -> Database -> Cloud Storage,
// lighting each layer as it arrives, and where hovering any layer lights
// its live connections — a miniature interactive network, not a static
// flowchart image.
export function HeroVisual({ parallaxX, parallaxY }) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const nodeEls = useRef([]);
  const [positions, setPositions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [packetVisible, setPacketVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const next = nodeEls.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.top - containerRect.top + rect.height / 2;
      });
      setPositions(next);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    let timeoutId;
    let idx = 0;

    const nextDelay = () => 1300 + Math.random() * 800;
    const pauseDelay = () => 650 + Math.random() * 250;
    const resetDelay = () => 750 + Math.random() * 300;

    function advance() {
      if (idx + 1 < nodes.length) {
        idx += 1;
        setActiveIndex(idx);
        timeoutId = setTimeout(advance, nextDelay());
        return;
      }
      timeoutId = setTimeout(() => {
        setPacketVisible(false);
        timeoutId = setTimeout(() => {
          idx = 0;
          setActiveIndex(0);
          setPacketVisible(true);
          timeoutId = setTimeout(advance, nextDelay());
        }, resetDelay());
      }, pauseDelay());
    }

    timeoutId = setTimeout(advance, nextDelay());
    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  // Matches the depth scheme in Hero.jsx: this layer moves at ~0.4x the
  // base parallax unit, the least of the reactive hero layers besides text.
  const cardX = useTransform(parallaxX, (v) => v * 12 * 0.4);
  const cardY = useTransform(parallaxY, (v) => v * 12 * 0.4);
  const glowX = useTransform(parallaxX, (v) => v * 12 * 0.4 * 2.2);
  const glowY = useTransform(parallaxY, (v) => v * 12 * 0.4 * 2.2);

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      style={{ x: cardX, y: cardY }}
      aria-hidden="true"
    >
      <div className="glass-card relative rounded-3xl border border-white/8 bg-white/[0.02] backdrop-blur-sm p-8 sm:p-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-500/[0.05] via-transparent to-cyan-400/[0.04]" />

        <div ref={containerRef} className="relative flex flex-col gap-0">
          {!prefersReducedMotion && positions.length === nodes.length && (
            <motion.span
              className="absolute left-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_10px_2px_rgba(103,232,249,0.9),0_0_22px_6px_rgba(129,140,248,0.5)]"
              animate={{ top: positions[activeIndex], opacity: packetVisible ? 1 : 0 }}
              transition={{ top: { type: "spring", stiffness: 110, damping: 20 }, opacity: { duration: 0.4 } }}
            />
          )}

          {nodes.map((node, index) => {
            const isLast = index === nodes.length - 1;
            const isActive = !prefersReducedMotion && packetVisible && activeIndex === index;
            const isHovered = hoveredIndex === index;
            const isNetworkLit =
              hoveredIndex !== null && (hoveredIndex === index - 1 || hoveredIndex === index + 1);
            const isDimmed = hoveredIndex !== null && !isHovered && !isNetworkLit;

            return (
              <div key={node.label} className="relative flex flex-col items-center">
                <SystemNode
                  node={node}
                  index={index}
                  isActive={isActive}
                  isHovered={isHovered}
                  isNetworkLit={isNetworkLit}
                  isDimmed={isDimmed}
                  onHover={() => setHoveredIndex(index)}
                  onLeave={() => setHoveredIndex(null)}
                  registerRef={(el) => {
                    nodeEls.current[index] = el;
                  }}
                />

                {!isLast &&
                  (() => {
                    const hoverLit = hoveredIndex !== null && (hoveredIndex === index || hoveredIndex === index + 1);
                    const edgeLit = activeIndex === index || activeIndex === index + 1 || hoverLit;
                    const justArrived = !prefersReducedMotion && packetVisible && activeIndex === index + 1;
                    return (
                      <svg width="2" height="32" className="my-0.5 overflow-visible" aria-hidden="true">
                        <line
                          x1="1"
                          y1="0"
                          x2="1"
                          y2="32"
                          stroke={`url(#line-gradient-${index})`}
                          strokeWidth={edgeLit ? "2.5" : "2"}
                          strokeDasharray="4 4"
                          className={prefersReducedMotion ? "" : "animate-flow"}
                          style={{
                            opacity: edgeLit ? 1 : hoveredIndex !== null ? 0.25 : 0.55,
                            transition: "opacity 400ms ease, stroke-width 400ms ease",
                          }}
                        />
                        {justArrived && (
                          <motion.circle
                            key={`pulse-${activeIndex}`}
                            cx="1"
                            cy="32"
                            fill="#a5f3fc"
                            initial={{ r: 2, opacity: 0.9 }}
                            animate={{ r: 10, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        )}
                        <defs>
                          <linearGradient id={`line-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
                          </linearGradient>
                        </defs>
                      </svg>
                    );
                  })()}
              </div>
            );
          })}
        </div>
      </div>

      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-accent-500/20 blur-3xl -z-10"
      />
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl -z-10"
      />
    </motion.div>
  );
}
