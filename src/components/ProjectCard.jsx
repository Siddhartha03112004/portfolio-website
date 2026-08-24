import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { ProjectPreview } from "./ProjectPreview";
import { GithubIcon } from "./icons";

export function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 250, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 250, damping: 22 });

  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const spotlightBackground = useMotionTemplate`radial-gradient(420px circle at ${spotlightX}px ${spotlightY}px, rgba(129,140,248,0.14), transparent 70%)`;

  const handleMouseMove = (event) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(-py * 6);
    spotlightX.set(event.clientX - rect.left);
    spotlightY.set(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -4 }}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 900 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-5 sm:p-6 hover:border-accent-400/30 hover:bg-white/[0.035] transition-colors duration-300"
      >
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlightBackground }}
          />
        )}

        <div className="relative mb-5 overflow-hidden rounded-xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
              <ProjectPreview type={project.preview} />
            </div>
          </motion.div>
        </div>

        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-lg font-semibold text-ink-50">{project.name}</h3>
            <p className="text-sm text-accent-300">{project.tagline}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.name} live site`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-400 hover:text-ink-50 hover:border-white/25 transition-colors"
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
            <motion.a
              href={project.links.code}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.name} on GitHub`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-400 hover:text-ink-50 hover:border-white/25 transition-colors"
            >
              <GithubIcon size={16} />
            </motion.a>
          </div>
        </div>

        {project.period && (
          <p className="font-mono text-[11px] text-ink-500 mb-3">{project.period}</p>
        )}

        <p className="text-sm text-ink-400 leading-relaxed mb-5 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.slice(0, 4).map((tech, i) => (
            <span
              key={tech}
              style={{ transitionDelay: `${i * 30}ms` }}
              className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-mono text-ink-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-ink-200"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-mono text-ink-500">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        <motion.button
          type="button"
          onClick={() => onOpen(project)}
          whileTap={{ scale: 0.96 }}
          className="group/btn relative inline-flex items-center gap-1.5 text-sm font-medium text-ink-50 self-start"
        >
          View details
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
          />
        </motion.button>
      </motion.div>
    </Reveal>
  );
}
