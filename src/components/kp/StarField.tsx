import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; r: number; tw: number };

/** Fixed cosmic backdrop: parallax stars + slow drifting camera. Canvas-based, cheap. */
export function StarField({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let raf = 0;
    let scrollY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor(((w * h) / 9000) * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.25 + 0.25,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let t = 0;
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const depth = s.z;
        const px = s.x + pointerX * 26 * depth;
        const py =
          ((s.y - scrollY * 0.12 * depth - t * 6 * depth) % (h + 40) + h + 40) % (h + 40) -
          20 +
          pointerY * 18 * depth;
        const twinkle = 0.45 + 0.55 * Math.abs(Math.sin(s.tw + t * (1.4 + depth)));
        ctx.globalAlpha = twinkle * (0.25 + depth * 0.75);
        ctx.fillStyle = depth > 0.82 ? "#ffd9c2" : depth > 0.6 ? "#ffc7e6" : "#ffffff";
        ctx.beginPath();
        ctx.arc(px, py, s.r * (0.5 + depth), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    build();
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", build);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [density]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute -left-40 top-[-10%] h-[70vh] w-[70vh] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #6C2BFF 0%, transparent 65%)" }}
      />
      <div
        className="absolute -right-32 top-[40%] h-[60vh] w-[60vh] rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, #FF007A 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-[-15%] left-1/3 h-[55vh] w-[55vh] rounded-full opacity-20 blur-[140px]"
        style={{ background: "radial-gradient(circle, #FF7A00 0%, transparent 65%)" }}
      />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
