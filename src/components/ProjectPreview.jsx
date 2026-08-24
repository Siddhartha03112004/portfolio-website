import { MapPin, Star, Sparkles, Wand2, Image as ImageIcon, History } from "lucide-react";

// Tasteful abstract UI previews built from the project's real functionality —
// not fabricated screenshots.
function ListingPreview() {
  return (
    <div className="relative h-full w-full p-5 grid grid-cols-2 gap-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border border-white/8 bg-base-900/60 overflow-hidden">
          <div
            className="h-14 sm:h-16 bg-gradient-to-br from-accent-500/25 via-cyan-500/10 to-transparent"
            style={{ opacity: 1 - i * 0.12 }}
          />
          <div className="p-2 space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-[9px] text-ink-500">
                <MapPin size={9} /> Listing
              </span>
              <span className="flex items-center gap-0.5 text-[9px] text-amber-300/80">
                <Star size={9} fill="currentColor" /> 4.{8 - i}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GeneratorPreview() {
  const steps = [
    { icon: Wand2, label: "Prompt" },
    { icon: Sparkles, label: "Generate" },
    { icon: ImageIcon, label: "Thumbnail" },
    { icon: History, label: "History" },
  ];
  return (
    <div className="relative h-full w-full flex items-center justify-center px-4">
      <div className="flex items-center gap-1.5 sm:gap-2 w-full justify-between">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex flex-col items-center gap-1.5">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-white/10 bg-base-900/70 flex items-center justify-center text-accent-300">
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <span className="text-[9px] text-ink-500 whitespace-nowrap">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="h-px w-3 sm:w-5 bg-gradient-to-r from-accent-400/50 to-cyan-400/30" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const previews = {
  listing: ListingPreview,
  generator: GeneratorPreview,
};

export function ProjectPreview({ type }) {
  const Preview = previews[type];
  return (
    <div className="relative h-40 sm:h-44 w-full rounded-xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      {Preview && <Preview />}
    </div>
  );
}
