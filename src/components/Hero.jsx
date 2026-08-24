import { useMemo } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Code2, FileText } from "lucide-react";
import { profile } from "../data/portfolio";
import { HeroVisual } from "./HeroVisual";
import { Magnetic } from "./Magnetic";
import { GithubIcon, LinkedinIcon } from "./icons";

const socials = [
  { href: profile.links.github, label: "GitHub", icon: GithubIcon },
  { href: profile.links.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: profile.links.leetcode, label: "LeetCode", icon: Code2 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const nameContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const nameWord = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Technologies called out in the subhead get a soft interactive highlight on
// hover — a small, meaningful reaction rather than a decorative one. Longer
// phrases are matched before their substrings ("Cloudflare Workers" before
// any partial overlap) so the split doesn't fragment mid-phrase.
const KEYWORDS = ["Cloudflare Workers", "Node.js", "React", "Express", "MongoDB", "SQL"];
const KEYWORD_PATTERN = new RegExp(
  `(${[...KEYWORDS]
    .sort((a, b) => b.length - a.length)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
  "g"
);

function renderHighlightedSubhead(text) {
  return text.split(KEYWORD_PATTERN).map((part, index) =>
    KEYWORDS.includes(part) ? (
      <span key={index} className="keyword-highlight">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

// Every layer here rides the same normalized cursor position but at a
// different multiplier, so the section reads as depth rather than a single
// flat plane reacting to the mouse. Base unit keeps the largest shift inside
// the "2-6px" range the effect is meant to stay within.
const PARALLAX_BASE = 12;

function useParallaxLayer(springX, springY, multiplier) {
  const x = useTransform(springX, (v) => v * PARALLAX_BASE * multiplier);
  const y = useTransform(springY, (v) => v * PARALLAX_BASE * multiplier);
  return { x, y };
}

function MagneticButton({ href, target, rel, onClick, className, children, glow = true }) {
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(90px circle at ${glowX}px ${glowY}px, rgba(255,255,255,0.32), transparent 70%)`;

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    glowX.set(event.clientX - rect.left);
    glowY.set(event.clientY - rect.top);
  };

  return (
    <Magnetic strength={0.25} maxOffset={6}>
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={className}
      >
        {glow && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glowBackground }}
          />
        )}
        {children}
      </motion.a>
    </Magnetic>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springX = useSpring(glowX, { stiffness: 60, damping: 22 });
  const springY = useSpring(glowY, { stiffness: 60, damping: 22 });

  const ambientX = useMotionValue(0);
  const ambientY = useMotionValue(0);
  const ambientSpringX = useSpring(ambientX, { stiffness: 30, damping: 26 });
  const ambientSpringY = useSpring(ambientY, { stiffness: 30, damping: 26 });

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const parallaxSpringX = useSpring(parallaxX, { stiffness: 40, damping: 20 });
  const parallaxSpringY = useSpring(parallaxY, { stiffness: 40, damping: 20 });

  const backgroundLayer = useParallaxLayer(parallaxSpringX, parallaxSpringY, 1);
  const ambientGlowLayer = useParallaxLayer(parallaxSpringX, parallaxSpringY, 1.2);
  const contentLayer = useParallaxLayer(parallaxSpringX, parallaxSpringY, 0.2);

  const gridMask = useMotionTemplate`radial-gradient(240px circle at ${springX}px ${springY}px, black, transparent 70%)`;

  const highlightedSubhead = useMemo(() => renderHighlightedSubhead(profile.subhead), []);
  const nameWords = useMemo(() => profile.name.split(" "), []);

  const scrollTo = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleMouseMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    glowX.set(x);
    glowY.set(y);
    ambientX.set(x);
    ambientY.set(y);
    parallaxX.set(x / rect.width - 0.5);
    parallaxY.set(y / rect.height - 0.5);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {!prefersReducedMotion && (
        <>
          <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={backgroundLayer}>
            <motion.div
              className="absolute inset-0 hidden bg-grid-bright sm:block"
              style={{ WebkitMaskImage: gridMask, maskImage: gridMask }}
            />
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 hidden h-[36rem] w-[36rem] rounded-full bg-accent-500/[0.05] blur-[140px] sm:block"
            style={{
              left: ambientSpringX,
              top: ambientSpringY,
              translateX: "-50%",
              translateY: "-50%",
              x: ambientGlowLayer.x,
              y: ambientGlowLayer.y,
            }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 hidden h-96 w-96 rounded-full bg-accent-500/10 blur-[100px] sm:block"
            style={{
              left: springX,
              top: springY,
              translateX: "-50%",
              translateY: "-50%",
              x: ambientGlowLayer.x,
              y: ambientGlowLayer.y,
            }}
          />
        </>
      )}

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={prefersReducedMotion ? undefined : contentLayer}
          className="max-w-2xl"
        >
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
            <motion.span
              variants={nameContainer}
              className="gradient-text relative inline-block transition-[filter] duration-500 hover:brightness-110 hover:drop-shadow-[0_0_20px_rgba(129,140,248,0.35)]"
            >
              {nameWords.map((word, index) => (
                <motion.span key={word} variants={nameWord} className="inline-block">
                  {word}
                  {index < nameWords.length - 1 ? " " : ""}
                </motion.span>
              ))}
              {!prefersReducedMotion && (
                <span className="text-sweep-overlay" aria-hidden="true">
                  {profile.name}
                </span>
              )}
            </motion.span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="text-xl sm:text-2xl font-semibold text-ink-50 text-balance mb-5 leading-snug"
          >
            {profile.headline}
          </motion.h2>

          <motion.p variants={item} className="text-base sm:text-lg text-ink-400 leading-relaxed mb-9 text-balance">
            {highlightedSubhead}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-9">
            <MagneticButton
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-400 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_24px_-8px_rgba(99,102,241,0.6)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <FileText size={16} className="relative transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span className="relative">Download Resume</span>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              onClick={scrollTo("contact")}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-ink-50 transition-colors hover:bg-white/10 hover:border-white/20"
            >
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <Magnetic key={label} strength={0.25} maxOffset={3}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-400 transition-all hover:text-ink-50 hover:border-white/25 hover:bg-white/5 hover:shadow-[0_0_16px_-4px_rgba(129,140,248,0.6)]"
                >
                  <Icon size={18} />
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:block"
        >
          <HeroVisual parallaxX={parallaxSpringX} parallaxY={parallaxSpringY} />
        </motion.div>
      </div>
    </section>
  );
}
