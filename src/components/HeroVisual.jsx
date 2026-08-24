import { motion, useReducedMotion } from "framer-motion";
import { Layout, Server, Database, Cloud } from "lucide-react";

const nodes = [
  { icon: Layout, label: "React" },
  { icon: Server, label: "REST API" },
  { icon: Database, label: "Database" },
  { icon: Cloud, label: "Cloud Storage" },
];

// A minimal animated flow — not a system-architecture diagram — that
// signals full-stack range without trying to explain the whole stack.
export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-sm mx-auto" aria-hidden="true">
      <div className="relative rounded-3xl border border-white/8 bg-white/[0.02] backdrop-blur-sm p-8 sm:p-10">
        <div className="flex flex-col gap-0">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isLast = index === nodes.length - 1;
            return (
              <div key={node.label} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-base-900/80 px-5 py-3.5 w-full shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                >
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-300">
                    <Icon size={18} strokeWidth={1.75} />
                    {!prefersReducedMotion && (
                      <span className="absolute inset-0 rounded-xl bg-accent-500/20 animate-pulse-slow" />
                    )}
                  </span>
                  <span className="text-sm font-medium text-ink-200">{node.label}</span>
                </motion.div>

                {!isLast && (
                  <svg width="2" height="32" className="my-0.5" aria-hidden="true">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="32"
                      stroke="url(#line-gradient)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className={prefersReducedMotion ? "" : "animate-flow"}
                    />
                    <defs>
                      <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-accent-500/20 blur-3xl -z-10" />
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl -z-10" />
    </div>
  );
}
