import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experiences } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { ExperienceCard } from "./ExperienceCard";

// The connecting line fills as the visitor scrolls through the timeline,
// rather than being fully drawn (or faded in flat) up front — the page
// visibly tracks how far through the history they've read.
export function Experience() {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Real-world engineering work."
          description="Click into a piece of work to see the problem behind it, not just the bullet point."
        />

        <div ref={timelineRef} className="relative">
          <div className="absolute left-[15px] sm:left-[19px] top-2 bottom-14 w-px bg-white/8" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[15px] sm:left-[19px] top-2 bottom-14 w-px origin-top bg-gradient-to-b from-accent-400 via-accent-400/70 to-cyan-300/40"
            style={{ scaleY: prefersReducedMotion ? 1 : fill }}
          />
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
