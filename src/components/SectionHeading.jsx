import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <Reveal className={`flex flex-col gap-4 ${alignment} max-w-2xl mb-14 sm:mb-16`}>
      {eyebrow && (
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-50 text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-ink-400 text-base sm:text-lg leading-relaxed text-balance">
          {description}
        </p>
      )}
    </Reveal>
  );
}
