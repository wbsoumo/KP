import { useEffect, useRef } from "react";

/**
 * Desktop-only custom cursor: a small glowing planet with an orbital ring,
 * inertial follow, particle trail, hover growth and click ripple.
 */
export function PlanetCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const layer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("kp-cursor-active");
    const el = dot.current;
    const trailLayer = layer.current;
    if (!el || !trailLayer) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let x = mx;
    let y = my;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let lastTrail = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target as HTMLElement | null;
      targetScale = t?.closest("a,button,[data-magnetic],[data-planet]") ? 1.9 : 1;
    };

    const onDown = (e: PointerEvent) => {
      const ripple = document.createElement("span");
      ripple.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:60px;height:60px;border-radius:9999px;border:1px solid rgba(255,0,122,.65);pointer-events:none;animation:kp-ripple .7s ease-out forwards;`;
      trailLayer.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 720);
    };

    const tick = (now: number) => {
      x += (mx - x) * 0.16;
      y += (my - y) * 0.16;
      scale += (targetScale - scale) * 0.14;
      el.style.transform = `translate3d(${x - 14}px, ${y - 14}px, 0) scale(${scale})`;

      if (now - lastTrail > 55) {
        lastTrail = now;
        const p = document.createElement("span");
        const s = 3 + Math.random() * 3;
        p.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${s}px;height:${s}px;margin:-${s / 2}px 0 0 -${s / 2}px;border-radius:9999px;background:linear-gradient(120deg,#FF7A00,#FF007A,#6C2BFF);opacity:.55;pointer-events:none;transition:opacity .7s linear, transform .7s linear;`;
        trailLayer.appendChild(p);
        requestAnimationFrame(() => {
          p.style.opacity = "0";
          p.style.transform = `translate(${(Math.random() - 0.5) * 18}px, ${8 + Math.random() * 14}px) scale(.3)`;
        });
        window.setTimeout(() => p.remove(), 760);
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("kp-cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div ref={layer} className="pointer-events-none fixed inset-0" />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 hidden h-7 w-7 will-change-transform [@media(pointer:fine)]:block"
      >
        <div
          className="absolute inset-0 rounded-full opacity-70 blur-[10px]"
          style={{ background: "linear-gradient(120deg,#FF7A00,#FF007A,#6C2BFF)" }}
        />
        <div
          className="absolute inset-[6px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 30%, #ffd7b0 0%, #FF007A 45%, #6C2BFF 100%)",
            boxShadow: "0 0 14px rgba(255,0,122,.8)",
          }}
        />
        <div
          className="kp-spin-slow absolute inset-0 rounded-full border border-white/50"
          style={{ transform: "rotate(-22deg)", clipPath: "inset(38% 0 38% 0)" }}
        />
      </div>
    </div>
  );
}
