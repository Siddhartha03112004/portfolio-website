import { aboutHighlights, aboutStats } from "../data/portfolio";
import { AnimatedCounter } from "./AnimatedCounter";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="About"
          title="A full-stack developer who likes knowing what's behind the API."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16">
          <Reveal delay={0.1} className="space-y-5 text-ink-400 text-base sm:text-lg leading-relaxed">
            <p>
              I&apos;m a 2026 B.Tech graduate who builds full-stack web applications end to end —
              comfortable moving between a React interface and the backend that actually serves it.
              Most of my work sits on the MERN stack, with REST APIs, authentication, and SQL as the
              connective tissue.
            </p>
            <p>
              More recently I&apos;ve been working closer to the edge: Cloudflare Workers, object
              storage, and the kind of synchronization problems that don&apos;t show up until real
              data hits them. I like that part of the job — debugging a sync bug is closer to solving
              a puzzle than writing a feature.
            </p>
            <p>
              Outside of building, I spend a good chunk of time on data structures and algorithms —
              partly because I enjoy it, partly because it&apos;s the fastest way to get better at
              breaking a problem down before writing any code.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {aboutHighlights.map((tag, index) => (
                <Reveal
                  as="span"
                  key={tag}
                  delay={0.15 + index * 0.03}
                  y={10}
                  className="inline-block rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-sm text-ink-200 transition-colors duration-300 hover:border-accent-400/30 hover:bg-white/5 hover:text-ink-50"
                >
                  {tag}
                </Reveal>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 content-start">
            {aboutStats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={0.15 + index * 0.08}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-[0_10px_28px_-14px_rgba(129,140,248,0.4)]"
              >
                <p className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-sm text-ink-400">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
