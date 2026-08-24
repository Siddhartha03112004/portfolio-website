import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolled } from "../hooks/useScrolled";

const sectionIds = navLinks.map((link) => link.id);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const activeId = useActiveSection(sectionIds);

  const handleNavigate = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-950/80 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <a
          href="#home"
          onClick={handleNavigate("home")}
          className="font-mono text-sm font-semibold tracking-tight text-ink-50 hover:text-accent-300 transition-colors"
        >
          Siddhartha<span className="text-accent-400">.</span>dev
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={handleNavigate(link.id)}
                aria-current={activeId === link.id ? "true" : undefined}
                className={`relative px-3.5 py-2 text-sm rounded-full transition-colors ${
                  activeId === link.id
                    ? "text-ink-50"
                    : "text-ink-400 hover:text-ink-50"
                }`}
              >
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-white/8 border border-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            href="#contact"
            onClick={handleNavigate("contact")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-ink-50 hover:bg-white/10 hover:border-white/20 transition-colors"
          >
            Get In Touch
          </motion.a>
        </div>

        <motion.button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          whileTap={{ scale: 0.9 }}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-50"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/5 bg-base-950/95 backdrop-blur-md"
          >
            <ul className="flex flex-col px-5 py-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={handleNavigate(link.id)}
                    className={`block rounded-lg px-3 py-3.5 text-base transition-colors ${
                      activeId === link.id
                        ? "text-ink-50 bg-white/5"
                        : "text-ink-400 hover:text-ink-50"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <motion.a
                  href="#contact"
                  onClick={handleNavigate("contact")}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center rounded-full bg-accent-500 px-4 py-3.5 text-base font-medium text-white"
                >
                  Get In Touch
                </motion.a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
