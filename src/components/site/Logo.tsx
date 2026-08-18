import { Link } from "@tanstack/react-router";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className ?? ""}`}>
      <img
        src="/IMG_4882.PNG"
        alt="Kreative Planet Logo"
        className="h-11 w-11 sm:h-14 sm:w-14 object-contain transition-all duration-300 group-hover:scale-105"
      />
      <span className="font-display text-[1.05rem] sm:text-[1.15rem] font-bold uppercase tracking-[0.14em] text-foreground">
        Kreative<span className="kp-gradient-text">Planet</span>
      </span>
    </Link>
  );
}
