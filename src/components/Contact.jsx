import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, MapPin, Code2, ArrowRight, FileText, Check } from "lucide-react";
import { profile } from "../data/portfolio";
import { Magnetic } from "./Magnetic";
import { GithubIcon, LinkedinIcon } from "./icons";

const links = [
  { href: `mailto:${profile.email}`, label: profile.email, icon: Mail, external: false },
  { href: `tel:${profile.phone}`, label: profile.phone, icon: Phone, external: false },
  { href: profile.links.github, label: "GitHub", icon: GithubIcon, external: true },
  { href: profile.links.linkedin, label: "LinkedIn", icon: LinkedinIcon, external: true },
  { href: profile.links.leetcode, label: "LeetCode", icon: Code2, external: true },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// The finale: the ambient glow behind the section strengthens as it enters
// view, and content arrives piece by piece rather than as one block — the
// site's closing beat, not just another reveal.
export function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleGetInTouch = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API unavailable — the mailto: link still attempts to fire.
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-[130px]"
          initial={{ opacity: 0.25, scale: 0.85 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <motion.span variants={item} className="font-mono text-xs tracking-[0.2em] uppercase text-accent-400 mb-5">
            Contact
          </motion.span>
          <motion.h2 variants={item} className="text-3xl sm:text-5xl font-bold tracking-tight text-balance mb-5">
            Let&apos;s build something useful.
          </motion.h2>
          <motion.p variants={item} className="text-ink-400 text-base sm:text-lg leading-relaxed max-w-xl mb-3 text-balance">
            Have an opportunity, project, or engineering problem worth discussing? I&apos;d be
            happy to connect.
          </motion.p>
          <motion.p variants={item} className="flex items-center gap-1.5 text-sm text-ink-500 mb-10">
            <MapPin size={14} />
            {profile.location}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="relative">
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-base-800 px-3 py-1.5 text-xs font-medium text-emerald-300 shadow-lg"
                  >
                    <Check size={13} />
                    Email copied
                  </motion.span>
                )}
              </AnimatePresence>
              <Magnetic strength={0.25} maxOffset={6}>
                <motion.a
                  href={`mailto:${profile.email}`}
                  onClick={handleGetInTouch}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent-500 px-6 py-3.5 text-sm sm:text-base font-medium text-white transition-colors hover:bg-accent-400 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_28px_-8px_rgba(99,102,241,0.65)]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative">Get In Touch</span>
                  <ArrowRight size={17} className="relative transition-transform group-hover:translate-x-0.5" />
                </motion.a>
              </Magnetic>
            </div>

            <Magnetic strength={0.25} maxOffset={6}>
              <motion.a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm sm:text-base font-medium text-ink-50 transition-colors hover:bg-white/10 hover:border-white/20"
              >
                <FileText size={17} />
                Download Resume
              </motion.a>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3">
            {links.map(({ href, label, icon: Icon, external }) => (
              <Magnetic key={label} strength={0.2} maxOffset={4}>
                <motion.a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-ink-200 transition-all hover:text-ink-50 hover:border-white/25 hover:bg-white/5 hover:shadow-[0_0_16px_-4px_rgba(129,140,248,0.45)]"
                >
                  <Icon size={16} />
                  {label}
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
