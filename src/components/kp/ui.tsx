import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import logo from "@/assets/kreative-planet-logo.png.asset.json";

export function Logo({
  className = "h-9",
  withTagline = false,
}: {
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <img
      src={logo.url}
      alt="Kreative Planet — Creativity Without Gravity"
      className={`kp-logo-img w-auto object-contain ${className}`}
      style={withTagline ? undefined : { objectPosition: "center", clipPath: "inset(8% 16% 8% 16%)" }}
      loading="eager"
      decoding="async"
    />
  );
}

/** Scroll reveal wrapper. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`kp-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Button that leans toward the cursor (gravity). */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.abs(dx) < r.width && Math.abs(dy) < r.height * 2.2) {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      } else {
        el.style.transform = "";
      }
    };
    const reset = () => {
      el.style.transform = "";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", reset);
    };
  }, [strength]);
  return (
    <span
      ref={ref}
      data-magnetic
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  );
}

const base =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300";

export function CtaLink({
  to,
  href,
  children,
  variant = "primary",
  className = "",
  hash,
}: {
  to?: string;
  href?: string;
  hash?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "kp-gradient-bg text-white shadow-[var(--glow-kp)] hover:brightness-110"
      : "kp-hairline text-foreground/85 hover:border-white/35 hover:text-foreground";
  const cls = `${base} ${styles} ${className}`;
  const inner = <Magnetic>{<span className="inline-flex items-center gap-2">{children}</span>}</Magnetic>;
  if (href) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link to={(to ?? "/") as "/"} {...(hash ? { hash } : {})} className={cls}>
      {inner}
    </Link>
  );

}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
        {eyebrow ? <p className="kp-eyebrow mb-5">{eyebrow}</p> : null}
        <h2 className="text-[clamp(2.1rem,6.2vw,5rem)] font-extrabold uppercase">{title}</h2>
        {sub ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {sub}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

/** A stylised planet body with orbit ring — pure CSS, no 3D cost. */
export function PlanetBody({
  size = 160,
  from,
  to,
  className = "",
  ring = true,
}: {
  size?: number;
  from: string;
  to: string;
  className?: string;
  ring?: boolean;
}) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full opacity-60 blur-2xl"
        style={{ background: `linear-gradient(120deg, ${from}, ${to})` }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 26%, #ffffff33 0%, transparent 38%), linear-gradient(140deg, ${from}, ${to})`,
          boxShadow: `inset -14px -18px 40px rgba(0,0,0,.55), 0 0 50px -12px ${to}`,
        }}
      />
      {ring ? (
        <div
          className="kp-spin-slower absolute rounded-[50%] border border-white/25"
          style={{
            inset: `${size * 0.28}px ${-size * 0.28}px`,
            transform: "rotate(-18deg)",
          }}
        />
      ) : null}
    </div>
  );
}
