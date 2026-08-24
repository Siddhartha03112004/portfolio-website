import { Reveal } from "./Reveal";
import { ExperienceStory } from "./ExperienceStory";

export function ExperienceCard({ experience, index }) {
  const isPrimary = experience.size === "primary";

  return (
    <div className="relative pl-12 sm:pl-16">
      <div className="absolute left-0 top-1.5 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center">
        <Reveal delay={index * 0.1} className="relative flex h-full w-full items-center justify-center">
          <span
            className={`h-3 w-3 rounded-full ${isPrimary ? "bg-accent-400" : "bg-ink-500"} relative z-10`}
          />
          {isPrimary && <span className="absolute h-3 w-3 rounded-full bg-accent-400 animate-ping opacity-40" />}
        </Reveal>
      </div>

      <Reveal
        delay={index * 0.1 + 0.05}
        className={`rounded-2xl border bg-white/[0.02] p-6 sm:p-8 mb-14 ${
          isPrimary ? "border-white/10" : "border-white/6"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h3 className={`font-bold text-ink-50 ${isPrimary ? "text-xl sm:text-2xl" : "text-lg"}`}>
              {experience.role}
            </h3>
            <p className="text-accent-300 font-medium text-sm sm:text-base mt-0.5">{experience.company}</p>
          </div>
          <span className="font-mono text-xs sm:text-sm text-ink-500 shrink-0 pt-1 text-left sm:text-right">
            {experience.period}
            {experience.location && (
              <>
                <br />
                {experience.location}
              </>
            )}
          </span>
        </div>

        <p className="text-ink-400 leading-relaxed mb-5 max-w-2xl">{experience.summary}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {experience.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-ink-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="grid gap-3">
          {experience.stories.map((story) => (
            <ExperienceStory key={story.title} story={story} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
