import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { Marquee } from "./Marquee";
import { MagneticLink } from "./MagneticLink";
import { services, projects, creators, processSteps } from "./data";

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className="kp-eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {sub ? (
        <Reveal delay={140}>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">{sub}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-12 pt-18 sm:px-8 sm:pb-20 sm:pt-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="kp-eyebrow">360° Creative &amp; Digital Growth Agency</p>
          </Reveal>
          <h1 className="mt-6 font-display text-[15vw] font-bold uppercase leading-[0.86] tracking-tighter text-foreground sm:text-[4.5rem] lg:text-[5.25rem]">
            <Reveal delay={60} as="span" className="block sm:whitespace-nowrap">
              We create.
            </Reveal>
            <Reveal delay={160} as="span" className="block kp-gradient-text sm:whitespace-nowrap">
              You grow.
            </Reveal>
          </h1>
          <Reveal delay={240}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Kreative Planet is a creative and digital growth agency helping ambitious brands turn
              ideas into attention, content and growth.
            </p>
          </Reveal>
          <Reveal delay={320} className="mt-10 flex flex-wrap gap-3">
            <MagneticLink to="/contact">
              Start a Project <ArrowUpRight className="h-4 w-4" />
            </MagneticLink>
            <MagneticLink to="/work" variant="outline">
              Explore Our Work
            </MagneticLink>
          </Reveal>
        </div>
        <Orbit />
      </div>
    </section>
  );
}

function Orbit() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[34rem] [perspective:1000px]"
    >
      <div className="absolute inset-[12%] rounded-full kp-gradient-bg opacity-[0.16] blur-3xl" />
      <div className="absolute inset-[6%] rounded-full border border-border animate-kp-spin-slow">
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kp-orange" />
      </div>
      <div className="absolute inset-[20%] rounded-full border border-border animate-kp-spin-reverse">
        <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-kp-magenta" />
      </div>
      <div className="absolute inset-[34%] overflow-hidden rounded-full kp-gradient-bg animate-kp-float shadow-[var(--shadow-lift)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),transparent_55%)]" />
      </div>
      <div className="absolute inset-0 rounded-full border border-dashed border-border/70" />
      <span className="absolute right-[8%] top-[18%] rounded-full border border-border bg-background/80 px-3 py-1.5 font-display text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft backdrop-blur animate-kp-float">
        Content
      </span>
      <span className="absolute bottom-[14%] left-[4%] rounded-full border border-border bg-background/80 px-3 py-1.5 font-display text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft backdrop-blur animate-kp-float [animation-delay:1.4s]">
        Growth
      </span>
    </div>
  );
}

export function IntroStrip() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <p className="max-w-3xl font-display text-2xl font-bold uppercase leading-tight tracking-tighter text-foreground sm:text-4xl">
            We don&apos;t just manage brands.
            <br />
            <span className="text-ink-soft">We build their digital world.</span>
          </p>
        </Reveal>
      </div>
      <div className="mt-8">
        <Marquee
          words={[
            "Social",
            "Content",
            "Video",
            "Creative",
            "Website",
            "SEO",
            "Influencers",
            "Ads",
          ]}
        />
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          eyebrow="Services"
          title={
            <>
              Everything your brand
              <br />
              needs to <span className="kp-gradient-text">grow.</span>
            </>
          }
        />
        <div className="mt-16 grid gap-x-12 gap-y-2 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal
              key={s.id}
              delay={i * 60}
              className={i % 2 === 1 ? "md:mt-16" : undefined}
            >
              <Link
                to="/services"
                hash={s.id}
                className="group block border-t border-border py-10 transition-colors hover:border-transparent"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span className="font-display text-xs tracking-[0.2em] text-ink-soft">
                      0{i + 1}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground transition-transform duration-500 group-hover:translate-x-1.5 sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">{s.line}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-display text-sm text-foreground">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border transition-all duration-500 group-hover:border-transparent">
                    <span className="absolute inset-0 rounded-full kp-gradient-bg opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute inset-[5px] rounded-full bg-background transition-transform duration-500 group-hover:scale-90" />
                    <span className="relative h-2.5 w-2.5 rounded-full kp-gradient-bg" />
                  </span>
                </div>
                <span className="mt-10 block h-px w-0 kp-gradient-bg transition-all duration-700 group-hover:w-full" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AdvertisingFeature() {
  const tags = [
    "Concept Ads",
    "Social-first Campaigns",
    "Product Advertising",
    "Meme & Culture-led Ads",
    "Brand Campaigns",
  ];
  return (
    <section className="overflow-hidden bg-ink px-5 py-24 text-background sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="kp-eyebrow text-background/50">Creative Advertising</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[0.92] tracking-tighter sm:text-6xl lg:text-7xl">
            Boring ads don&apos;t
            <br />
            <span className="kp-gradient-text">build culture.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-background/65">
            We create concept-led, social-first advertising designed to stop the scroll and make
            brands memorable.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Concept", t: "One idea, ten formats.", h: "h-64" },
            { k: "Scroll-stop", t: "First 3 seconds engineered.", h: "h-80" },
            { k: "Product", t: "Desire before description.", h: "h-72" },
            { k: "Culture", t: "Built from what people share.", h: "h-64" },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 80} className={i % 2 === 1 ? "lg:mt-10" : undefined}>
              <article
                className={`group relative flex ${c.h} flex-col justify-between overflow-hidden rounded-lg border border-background/15 p-6 transition-colors duration-500 hover:border-transparent`}
              >
                <span className="absolute inset-0 kp-gradient-bg opacity-0 transition-opacity duration-500 group-hover:opacity-90" />
                <span className="relative font-display text-xs uppercase tracking-[0.2em] text-background/60 transition-colors group-hover:text-background">
                  {c.k}
                </span>
                <p className="relative font-display text-2xl font-bold leading-tight tracking-tight">
                  {c.t}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-2.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-background/20 px-4 py-2 text-xs text-background/70"
            >
              {t}
            </span>
          ))}
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <MagneticLink to="/contact">
            Create Something Different <ArrowUpRight className="h-4 w-4" />
          </MagneticLink>
        </Reveal>
      </div>
    </section>
  );
}

export function VideoSection() {
  const stages = ["Script", "Shoot", "Edit", "Publish"];
  const list = [
    "Scriptwriting",
    "Shoot Production",
    "Video Editing",
    "Motion Graphics",
    "Reels",
    "Brand Films",
  ];
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          eyebrow="Video Production"
          title={
            <>
              From idea to
              <br />
              <span className="kp-gradient-text">final frame.</span>
            </>
          }
        />
        <Reveal className="mt-12 flex flex-wrap items-center gap-3">
          {stages.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              <span className="font-display text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                {s}
              </span>
              {i < stages.length - 1 && <ArrowRight className="h-4 w-4 text-kp-magenta" />}
            </span>
          ))}
        </Reveal>

        <div className="mt-14 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0">
          {projects.map((p, i) => (
            <Reveal
              key={p.client}
              delay={i * 70}
              className="w-[78vw] shrink-0 snap-start sm:w-[32rem]"
            >
              <figure className="group relative aspect-[16/10] overflow-hidden rounded-lg bg-secondary">
                <img
                  src={p.image}
                  alt={`${p.client} ${p.category.toLowerCase()} production still`}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/85 to-transparent p-5">
                  <span className="font-display text-base font-bold text-background">
                    {p.client}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-background/70">
                    Reel
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap gap-2.5">
          {list.map((l) => (
            <span
              key={l}
              className="rounded-full border border-border px-4 py-2 text-xs text-ink-soft"
            >
              {l}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function CreatorSection() {
  return (
    <section className="border-y border-border bg-secondary/40 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <SectionHead
            eyebrow="Creator Network"
            title={
              <>
                Creators are the
                <br />
                <span className="kp-gradient-text">new media.</span>
              </>
            }
            sub="Kreative Planet brings creators, influencers and brands together to build content that people actually care about."
          />
          <Reveal delay={160} className="flex flex-wrap gap-2.5 lg:justify-end">
            {["Creators", "Influencers", "UGC", "Brand Partners"].map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-background px-4 py-2 text-xs text-ink-soft"
              >
                {c}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {creators.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-background">
                  <img
                    src={c.image}
                    alt={`${c.name}, ${c.niche} creator`}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <span className="absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1 font-display text-[0.65rem] uppercase tracking-[0.16em] text-foreground backdrop-blur">
                    {c.reach}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-foreground">
                  {c.name}
                </h3>
                <p className="text-sm text-ink-soft">{c.niche}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <MagneticLink to="/creators" variant="outline">
            Join the Creator Network <ArrowUpRight className="h-4 w-4" />
          </MagneticLink>
        </Reveal>
      </div>
    </section>
  );
}

export function CollabSection() {
  const steps = ["Discover", "Match", "Create", "Launch", "Measure"];
  const capabilities = [
    "Influencer discovery",
    "Creator matching",
    "Campaign management",
    "UGC",
    "Negotiation",
    "Performance tracking",
  ];
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          eyebrow="Brand × Creator"
          title={
            <>
              Right brand.
              <br />
              Right creator.
              <br />
              <span className="kp-gradient-text">Right culture.</span>
            </>
          }
        />
        <div className="mt-16 grid gap-2 sm:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s} delay={i * 80}>
              <div className="group relative h-full rounded-lg border border-border p-5 transition-colors hover:border-transparent kp-hairline-none">
                <span className="absolute inset-x-5 top-0 h-px w-0 kp-gradient-bg transition-all duration-700 group-hover:w-[calc(100%-2.5rem)]" />
                <span className="font-display text-xs tracking-[0.2em] text-ink-soft">
                  0{i + 1}
                </span>
                <p className="mt-6 font-display text-xl font-bold tracking-tight text-foreground">
                  {s}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c} className="flex items-center gap-3 border-t border-border pt-3">
              <span className="h-1.5 w-1.5 rounded-full kp-gradient-bg" />
              <span className="text-sm text-ink-soft">{c}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function WorkSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-ink px-5 py-24 text-background sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="kp-eyebrow text-background/50">Selected Work</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.92] tracking-tighter sm:text-6xl lg:text-7xl">
            Work that speaks <span className="kp-gradient-text">louder.</span>
          </h2>
        </Reveal>
        <Reveal delay={140} className="mt-8 flex flex-wrap gap-2.5">
          {["Branding", "Social", "Advertising", "Video", "Websites", "Campaigns"].map((c) => (
            <span
              key={c}
              className="rounded-full border border-background/20 px-4 py-2 text-xs text-background/70"
            >
              {c}
            </span>
          ))}
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.client} delay={i * 80} className={i % 2 === 1 ? "lg:mt-14" : undefined}>
              <article className="group relative overflow-hidden rounded-lg">
                <div className="aspect-[4/3] overflow-hidden bg-background/5">
                  <img
                    src={p.image}
                    alt={`${p.client} — ${p.category} project by Kreative Planet`}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/30 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-8">
                  <span className="kp-eyebrow text-background/70">{p.category}</span>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {p.client}
                  </h3>
                  <p className="mt-2 text-sm text-background/75">{p.result}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm">
                    View Project
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4 lg:hidden">
                  <h3 className="font-display text-lg font-bold">{p.client}</h3>
                  <span className="text-xs uppercase tracking-[0.18em] text-background/60">
                    {p.category}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {compact ? null : (
          <Reveal className="mt-14">
            <MagneticLink to="/work" variant="outline" className="bg-transparent text-background">
              See All Work <ArrowUpRight className="h-4 w-4" />
            </MagneticLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          eyebrow="Process"
          title={
            <>
              How we make
              <br />
              brands <span className="kp-gradient-text">grow.</span>
            </>
          }
        />
        <ol className="mt-16 grid gap-0 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} as="li" className="group relative">
              <div className="border-t border-border pt-6 transition-colors duration-500 group-hover:border-transparent lg:pr-6">
                <span className="absolute left-0 top-0 h-px w-0 kp-gradient-bg transition-all duration-700 group-hover:w-full" />
                <span className="font-display text-4xl font-bold tracking-tighter text-border transition-colors duration-500 group-hover:text-foreground">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 pb-10 text-sm text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AboutSection() {
  const pillars = ["Strategy", "Creativity", "Technology", "Culture", "Growth"];
  return (
    <section className="border-y border-border bg-secondary/40 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="kp-eyebrow">About Kreative Planet</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 max-w-5xl font-display text-4xl font-bold uppercase leading-[0.92] tracking-tighter text-foreground sm:text-6xl lg:text-[5.5rem]">
            We&apos;re not another{" "}
            <span className="text-ink-soft/40">marketing agency.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Kreative Planet is built for brands that want to think differently, create better and
            grow faster.
          </p>
        </Reveal>
        <Reveal delay={200} className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-3">
          {pillars.map((p, i) => (
            <span key={p} className="flex items-center gap-4">
              <span className="font-display text-2xl font-bold uppercase tracking-tighter text-foreground sm:text-4xl">
                {p}
              </span>
              {i < pillars.length - 1 && (
                <span className="h-1.5 w-1.5 rounded-full kp-gradient-bg" />
              )}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
