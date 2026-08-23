import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo, Magnetic } from "./ui";

const LINKS: { label: string; to: "/" | "/work" | "/creators" | "/about"; hash?: string }[] = [
  { label: "Universe", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Planets", to: "/", hash: "planets" },
  { label: "Creators", to: "/creators" },
  { label: "About", to: "/about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "kp-glass border-b border-white/10" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5 md:px-10">
        <Link to="/" aria-label="Kreative Planet home" className="flex items-center">
          <Logo className="h-8 md:h-9" />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                {...(l.hash ? { hash: l.hash } : {})}
                className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-foreground/65 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Magnetic>
            <Link
              to="/contact"
              className="kp-gradient-bg hidden rounded-full px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] transition hover:brightness-110 sm:inline-flex"
            >
              Start a project →
            </Link>
          </Magnetic>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="kp-hairline flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-foreground transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-foreground transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="kp-glass border-t border-white/10 lg:hidden">
          <ul className="flex flex-col px-6 py-4">
            {[...LINKS, { label: "Contact", to: "/contact" as const, hash: undefined }].map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...(l.hash ? { hash: l.hash } : {})}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
