import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string | undefined;
  delay?: number | undefined;
  as?: ElementType | undefined;
}) {
  const ref = useRef<HTMLElement | null>(null);
  // Content stays visible until JS is ready, so SSR output is never blank.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    setArmed(true);

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "50px 0px 50px 0px" },
    );
    io.observe(node);

    // Guaranteed fallback after delay + 400ms so content NEVER vanishes or stays hidden
    const timer = setTimeout(() => {
      setShown(true);
    }, delay + 400);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(armed && "kp-reveal", shown && "is-in", className)}
    >
      {children}
    </Tag>
  );
}
