import { Code2, LayoutPanelLeft, Server, Database, Wrench, BrainCircuit } from "lucide-react";
import { skillGroups } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const icons = {
  Languages: Code2,
  Frontend: LayoutPanelLeft,
  Backend: Server,
  Databases: Database,
  "Tools & Platforms": Wrench,
  Concepts: BrainCircuit,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.title] ?? Code2;
            return (
              <Reveal
                key={group.title}
                delay={index * 0.06}
                className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.03]"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 text-accent-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-accent-500/20 group-hover:text-accent-200">
                    <span className="pointer-events-none absolute -inset-1.5 rounded-full bg-accent-400/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                    <Icon size={17} strokeWidth={1.75} className="relative" />
                  </span>
                  <h3 className="font-semibold text-ink-50">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/8 bg-white/[0.02] px-2.5 py-1.5 text-xs sm:text-sm text-ink-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400/40 hover:bg-white/5 hover:text-ink-50 hover:shadow-[0_4px_16px_-6px_rgba(129,140,248,0.5)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
