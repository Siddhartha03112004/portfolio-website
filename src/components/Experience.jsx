import { experiences } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { ExperienceCard } from "./ExperienceCard";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Real-world engineering work."
          description="Click into a piece of work to see the problem behind it, not just the bullet point."
        />

        <div className="relative">
          <div className="absolute left-[15px] sm:left-[19px] top-2 bottom-14 w-px bg-gradient-to-b from-accent-500/40 via-white/10 to-transparent" />
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
