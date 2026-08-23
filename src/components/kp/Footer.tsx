import { Link } from "@tanstack/react-router";
import { Logo, Magnetic } from "./ui";
import { PHONE, PHONE_TEL } from "@/lib/kp-data";

const NAV: { label: string; to: "/" | "/work" | "/creators" | "/about" | "/contact"; hash?: string }[] = [
  { label: "Universe", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Planets", to: "/", hash: "planets" },
  { label: "Creators", to: "/creators" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-5 py-16 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo className="h-11" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A creative advertising and brand content studio. Every planet is a capability, every
            orbit an idea.
          </p>
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
          <p className="kp-eyebrow mb-5">Studio</p>
          <p className="text-sm text-foreground/70">Founded by Roni Banerjee</p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-2 block text-lg font-semibold tracking-tight text-foreground"
          >
            {PHONE}
          </a>
          <Magnetic>
            <Link
              to="/contact"
              className="kp-gradient-bg mt-6 inline-flex rounded-full px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white"
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
