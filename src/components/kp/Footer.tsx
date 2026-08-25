import { Link } from "@tanstack/react-router";
import { Logo, Magnetic } from "./ui";
import { CONTACTS, OFFICE_ADDRESS } from "@/lib/kp-data";

const NAV: { label: string; to: any; hash?: string }[] = [
  { label: "Universe", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Planets", to: "/", hash: "planets" },
  { label: "Creators", to: "/creators" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-5 py-16 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.2fr_1fr_1.2fr]">
        <div>
          <Logo className="h-11" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A creative advertising and brand content studio. Every planet is a capability, every
            orbit an idea.
          </p>
          <div className="mt-6 max-w-xs rounded-2xl border border-white/10 bg-card/40 p-4 text-xs text-muted-foreground shadow-lg backdrop-blur-md">
            <p className="kp-eyebrow mb-2 text-kp-pink font-semibold uppercase tracking-wider">{OFFICE_ADDRESS.title}</p>
            <p className="text-foreground/90 font-medium leading-relaxed">
              {OFFICE_ADDRESS.line1}<br />
              {OFFICE_ADDRESS.line2}<br />
              {OFFICE_ADDRESS.line3}
            </p>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="kp-eyebrow mb-5">Navigate</p>
          <ul className="space-y-2.5">
            {NAV.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...(l.hash ? { hash: l.hash } : {})}
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="kp-eyebrow mb-4">Studio Leadership</p>
          <div className="space-y-4">
            {CONTACTS.map((c) => (
              <div key={c.name}>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{c.role}</p>
                <p className="text-sm font-bold text-foreground">{c.name}</p>
                <a
                  href={`tel:${c.tel}`}
                  className="text-xs font-semibold text-foreground/80 hover:text-foreground"
                >
                  {c.phone}
                </a>
              </div>
            ))}
          </div>
          <Magnetic className="mt-6">
            <Link
              to="/contact"
              className="kp-gradient-bg inline-flex rounded-full px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white"
            >
              Start a project →
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1400px] flex-col gap-2 border-t border-white/10 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Kreative Planet. All rights reserved.</p>
        <p className="uppercase tracking-[0.3em]">Creativity Without Gravity.</p>
      </div>
    </footer>
  );
}
