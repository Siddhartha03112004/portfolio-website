import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="Education" title="Academic background." />

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_16px_36px_-18px_rgba(129,140,248,0.4)]">
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-[3px] origin-top rounded-l-full bg-gradient-to-b from-accent-400 via-accent-400/60 to-cyan-300/30"
            initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          <Reveal className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-base-900 text-accent-300">
                <GraduationCap size={26} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-ink-50 leading-snug">{education.degree}</h3>
                <p className="text-sm text-ink-200 font-medium mt-1.5">CGPA: {education.cgpa}</p>
                <p className="font-mono text-xs text-ink-400 mt-2 leading-relaxed">{education.school}</p>
                <p className="text-xs text-ink-500 mt-1">{education.location}</p>
              </div>
            </div>

            <Reveal delay={0.15} y={10} className="text-left sm:text-right shrink-0 sm:pl-4">
              <span className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-ink-200">
                {education.period}
              </span>
              <p className="font-mono text-xs text-ink-500 mt-2">Graduating Class {education.graduatingClass}</p>
            </Reveal>
          </Reveal>

          <Reveal delay={0.18} className="border-t border-white/8 pt-6">
            <p className="font-mono text-xs tracking-wider uppercase text-ink-500 mb-3">Key Coursework</p>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course, index) => (
                <Reveal
                  as="span"
                  key={course}
                  delay={0.22 + index * 0.05}
                  y={10}
                  className="inline-block rounded-lg border border-white/8 bg-white/[0.02] px-3 py-1.5 text-sm text-ink-200"
                >
                  {course}
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
