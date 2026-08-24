import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, MapPin, Code2, ArrowRight, FileText, Check } from "lucide-react";
import { profile } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./icons";

const links = [
  { href: `mailto:${profile.email}`, label: profile.email, icon: Mail, external: false },
  { href: `tel:${profile.phone}`, label: profile.phone, icon: Phone, external: false },
  { href: profile.links.github, label: "GitHub", icon: GithubIcon, external: true },
  { href: profile.links.linkedin, label: "LinkedIn", icon: LinkedinIcon, external: true },
  { href: profile.links.leetcode, label: "LeetCode", icon: Code2, external: true },
];

export function Contact() {
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
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <Reveal className="flex flex-col items-center">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent-400 mb-5">
            Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-balance mb-5">
            Let&apos;s build something useful.
          </h2>
          <p className="text-ink-400 text-base sm:text-lg leading-relaxed max-w-xl mb-3 text-balance">
            Have an opportunity, project, or engineering problem worth discussing? I&apos;d be
            happy to connect.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-ink-500 mb-10">
            <MapPin size={14} />
            {profile.location}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
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
              <motion.a
                href={`mailto:${profile.email}`}
                onClick={handleGetInTouch}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm sm:text-base font-medium text-white transition-colors hover:bg-accent-400 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_28px_-8px_rgba(99,102,241,0.65)]"
              >
                Get In Touch
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </motion.a>
            </div>

            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm sm:text-base font-medium text-ink-50 transition-colors hover:bg-white/10 hover:border-white/20"
            >
              <FileText size={17} />
              Download Resume
            </motion.a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {links.map(({ href, label, icon: Icon, external }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-ink-200 hover:text-ink-50 hover:border-white/25 hover:bg-white/5 transition-colors"
              >
                <Icon size={16} />
                {label}
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
