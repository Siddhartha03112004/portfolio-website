import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Code2, FileText } from "lucide-react";
import { profile } from "../data/portfolio";
import { HeroVisual } from "./HeroVisual";
import { GithubIcon, LinkedinIcon } from "./icons";

const socials = [
  { href: profile.links.github, label: "GitHub", icon: GithubIcon },
  { href: profile.links.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: profile.links.leetcode, label: "LeetCode", icon: Code2 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springX = useSpring(glowX, { stiffness: 60, damping: 22 });
  const springY = useSpring(glowY, { stiffness: 60, damping: 22 });

  const scrollTo = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleMouseMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    glowX.set(event.clientX - rect.left);
    glowY.set(event.clientY - rect.top);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 hidden h-96 w-96 rounded-full bg-accent-500/10 blur-[100px] sm:block"
          style={{ left: springX, top: springY, translateX: "-50%", translateY: "-50%" }}
        />
      )}

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-ink-400">{profile.status}</span>
          </motion.div>

          <motion.p variants={item} className="font-mono text-sm text-accent-400 mb-3">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance mb-5"
          >
            <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="text-xl sm:text-2xl font-semibold text-ink-50 text-balance mb-5 leading-snug"
          >
            {profile.headline}
          </motion.h2>

          <motion.p variants={item} className="text-base sm:text-lg text-ink-400 leading-relaxed mb-9 text-balance">
            {profile.subhead}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-9">
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-400 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_24px_-8px_rgba(99,102,241,0.6)]"
            >
              <FileText size={16} />
              Download Resume
            </motion.a>
            <motion.a
              href="#contact"
              onClick={scrollTo("contact")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-ink-50 transition-colors hover:bg-white/10 hover:border-white/20"
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-400 transition-colors hover:text-ink-50 hover:border-white/25 hover:bg-white/5"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:block"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
