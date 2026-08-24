import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// A single piece of engineering work within a role. If a problem/solution/
// result narrative is provided, it's revealed on click; otherwise the
// summary and tags speak for themselves.
export function ExperienceStory({ story }) {
  const [open, setOpen] = useState(false);
  const hasNarrative = Boolean(story.problem);

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
      <button
        type="button"
        onClick={() => hasNarrative && setOpen((o) => !o)}
        aria-expanded={hasNarrative ? open : undefined}
        className={`w-full text-left px-5 py-4 flex items-start justify-between gap-4 ${
          hasNarrative ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-ink-50 mb-1.5">{story.title}</h4>
          <p className="text-sm text-ink-400 leading-relaxed">{story.summary}</p>
        </div>
        {hasNarrative && (
          <ChevronDown
            size={18}
            className={`shrink-0 mt-1 text-ink-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        )}
      </button>

      <AnimatePresence initial={false}>
        {hasNarrative && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 grid gap-3 sm:grid-cols-3 border-t border-white/8 pt-4 mx-0">
              <div>
                <p className="font-mono text-[11px] tracking-wider uppercase text-rose-300/80 mb-1.5">Problem</p>
                <p className="text-sm text-ink-400 leading-relaxed">{story.problem}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-wider uppercase text-accent-300 mb-1.5">Solution</p>
                <p className="text-sm text-ink-400 leading-relaxed">{story.solution}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-wider uppercase text-emerald-300/80 mb-1.5">Result</p>
                <p className="text-sm text-ink-400 leading-relaxed">{story.result}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {story.tags && (
        <div className="flex flex-wrap gap-1.5 px-5 pb-4">
          {story.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-mono text-ink-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
