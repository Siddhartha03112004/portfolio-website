import { Code2 } from "lucide-react";
import { profile } from "../data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";

const socials = [
  { href: profile.links.github, label: "GitHub", icon: GithubIcon },
  { href: profile.links.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: profile.links.leetcode, label: "LeetCode", icon: Code2 },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 py-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-ink-50">{profile.name}</p>
          <p className="text-sm text-ink-500">{profile.role}</p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-400 hover:text-ink-50 hover:border-white/25 transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <p className="text-xs text-ink-500 order-last sm:order-none">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
