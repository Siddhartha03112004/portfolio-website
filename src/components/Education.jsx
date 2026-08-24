import { GraduationCap, School } from "lucide-react";
import { education } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="Education" title="Academic background." />

        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-white/15 via-white/10 to-transparent" />

          {education.map((entry, index) => {
            const isPrimary = entry.size === "primary";
            const Icon = isPrimary ? GraduationCap : School;

            return (
              <div key={entry.id} className="relative pl-14 pb-10 last:pb-0">
                <Reveal
                  delay={index * 0.1}
                  className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-base-900"
                >
                  <Icon size={17} className={isPrimary ? "text-accent-300" : "text-ink-500"} strokeWidth={1.75} />
                </Reveal>

                <Reveal
                  delay={index * 0.1 + 0.05}
                  className={`rounded-2xl border bg-white/[0.02] ${
                    isPrimary ? "border-white/10 p-6 sm:p-7" : "border-white/6 p-5"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 mb-2">
                    <h3 className={`font-bold text-ink-50 ${isPrimary ? "text-lg sm:text-xl" : "text-base"}`}>
                      {entry.school}
                    </h3>
                    <span className="font-mono text-xs text-ink-500 shrink-0">{entry.period}</span>
                  </div>
                  <p className="text-sm text-ink-400 mb-1">{entry.fullName}</p>
                  <p className={`text-accent-300 font-medium ${isPrimary ? "text-sm sm:text-base" : "text-sm"}`}>
                    {entry.degree}
                  </p>

                  {entry.detail && <p className="text-sm text-ink-200 mt-2 font-medium">{entry.detail}</p>}

                  {entry.coursework && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {entry.coursework.map((course) => (
                        <span
                          key={course}
                          className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-ink-400"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
