import { GraduationCap } from "lucide-react";
import { education } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="Education" title="Academic background." />

        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
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

            <div className="text-left sm:text-right shrink-0 sm:pl-4">
              <span className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-ink-200">
                {education.period}
              </span>
              <p className="font-mono text-xs text-ink-500 mt-2">Graduating Class {education.graduatingClass}</p>
            </div>
          </div>

          <div className="border-t border-white/8 pt-6">
            <p className="font-mono text-xs tracking-wider uppercase text-ink-500 mb-3">Key Coursework</p>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-lg border border-white/8 bg-white/[0.02] px-3 py-1.5 text-sm text-ink-200"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
