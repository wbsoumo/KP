import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PROJECTS, type Project } from "@/lib/kp-data";
import { Reveal } from "./ui";

const CATEGORIES = ["ALL", "ADVERTISING", "BRANDING", "SOCIAL", "VIDEO", "CREATOR CAMPAIGNS"] as const;

const FRAME: Record<Project["format"], string> = {
  phone: "aspect-[9/16] rounded-[2rem]",
  screen: "aspect-[16/10] rounded-xl",
  poster: "aspect-[3/4] rounded-lg",
  billboard: "aspect-[21/9] rounded-md",
};

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const [tilt, setTilt] = useState("");
  return (
    <Reveal delay={(i % 4) * 90}>
      <Link
        to="/work/$slug"
        params={{ slug: p.slug }}
        data-planet
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          setTilt(
            `perspective(1000px) rotateY(${dx * 9}deg) rotateX(${-dy * 9}deg) translate3d(${dx * 14}px, ${dy * 14 - 8}px, 0)`,
          );
        }}
        onPointerLeave={() => setTilt("")}
        className="group block will-change-transform"
        style={{ transform: tilt, transition: tilt ? "transform .12s ease-out" : "transform .7s cubic-bezier(.16,1,.3,1)" }}
      >
        <div
          className={`kp-hairline relative overflow-hidden bg-card/60 ${FRAME[p.format]} shadow-[var(--shadow-orbit)]`}
        >
          <div
            className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                p.category === "SOCIAL"
                  ? "radial-gradient(120% 90% at 20% 10%, rgba(255,0,122,.55), transparent 60%), linear-gradient(160deg,#12061f,#05050A)"
                  : p.category === "VIDEO"
                    ? "radial-gradient(120% 90% at 80% 20%, rgba(255,122,0,.45), transparent 60%), linear-gradient(160deg,#1a0a12,#05050A)"
                    : p.category === "BRANDING"
                      ? "radial-gradient(120% 90% at 30% 80%, rgba(108,43,255,.5), transparent 60%), linear-gradient(160deg,#0b0820,#05050A)"
                      : "radial-gradient(120% 90% at 70% 70%, rgba(108,43,255,.45), transparent 55%), radial-gradient(80% 70% at 10% 20%, rgba(255,122,0,.35), transparent 60%), linear-gradient(160deg,#0d0715,#05050A)",
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <span className="kp-eyebrow text-foreground/70">{p.category}</span>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">{p.result}</p>
              <h3 className="mt-1.5 text-xl font-bold uppercase leading-tight">{p.name}</h3>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <p className="max-w-[80%] text-sm text-muted-foreground">{p.blurb}</p>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/60 transition-colors group-hover:text-foreground">
            View →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Portfolio({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("ALL");
  const list = useMemo(
    () => (active === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active],
  );
  const shown = compact ? list.slice(0, 4) : list;

  return (
    <div>
      <div className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition ${
              active === c
                ? "kp-gradient-bg text-white"
                : "kp-hairline text-foreground/60 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 items-end gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((p, i) => (
          <div key={p.slug} className={i % 4 === 1 ? "lg:translate-y-10" : i % 4 === 3 ? "lg:-translate-y-6" : ""}>
            <ProjectCard p={p} i={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
