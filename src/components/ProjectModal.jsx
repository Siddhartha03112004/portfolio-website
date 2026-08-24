import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, ExternalLink } from "lucide-react";
import { ProjectPreview } from "./ProjectPreview";
import { GithubIcon } from "./icons";

export function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute inset-0 bg-base-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-base-900 p-6 sm:p-8 shadow-2xl"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-400 hover:text-ink-50 hover:border-white/25 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="mb-5">
              <ProjectPreview type={project.preview} />
            </div>

            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-ink-50">
                {project.name}
              </h3>
              {project.period && (
                <span className="font-mono text-xs text-ink-500 shrink-0 pt-1.5">{project.period}</span>
              )}
            </div>
            <p className="text-accent-300 text-sm font-medium mb-4">{project.tagline}</p>
            <p className="text-ink-400 leading-relaxed mb-6">{project.description}</p>

            <p className="font-mono text-xs tracking-wider uppercase text-ink-500 mb-3">
              Key engineering features
            </p>
            <ul className="space-y-2.5 mb-6">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-200">
                  <Check size={16} className="shrink-0 mt-0.5 text-emerald-400" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-7">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-ink-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={project.links.code}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-sm font-medium text-ink-50 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <GithubIcon size={16} />
                {project.links.live ? "View Code" : "GitHub Profile"}
              </a>
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-400 transition-all"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
