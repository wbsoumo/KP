import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
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
  const [activeService, setActiveService] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const serviceWorks: Record<string, string[]> = {
    "social-media": [
      "/social%20media/WhatsApp%20Image%202026-08-18%20at%2017.40.49.jpeg",
      "/social%20media/WhatsApp%20Image%202026-08-18%20at%2018.05.08.jpeg",
      "/social%20media/WhatsApp%20Image%202026-08-18%20at%2018.13.20.jpeg",
      "/social%20media/WhatsApp%20Image%202026-08-18%20at%2018.16.52.jpeg",
      "/social%20media/WhatsApp%20Image%202026-08-18%20at%2018.34.54.jpeg",
    ],
    "video-production": [
      "/videos/IMG_1027.MP4",
      "/videos/IMG_1028.MP4",
      "/videos/IMG_4821.MP4",
      "/videos/export-1787053026138.mp4",
    ],
    "creative-advertising": [
      "/creative/IMG_1029.MP4",
      "/creative/WhatsApp%20Image%202026-08-18%20at%2018.39.40.jpeg",
      "/creative/WhatsApp%20Image%202026-08-18%20at%2018.40.17.jpeg",
      "/creative/WhatsApp%20Image%202026-08-18%20at%2018.40.59.jpeg",
      "/creative/WhatsApp%20Image%202026-08-18%20at%2018.44.54.jpeg",
    ],
    "website-seo": [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    ],
    "creator-management": [
      "/creator/WhatsApp%20Image%202026-08-18%20at%2018.53.05.jpeg",
      "/creator/WhatsApp%20Image%202026-08-18%20at%2018.53.06.jpeg",
      "/creator/WhatsApp%20Image%202026-08-18%20at%2018.53.061.jpeg",
      "/creator/WhatsApp%20Image%202026-08-18%20at%2018.54.56.jpeg",
      "/creator/WhatsApp%20Image%202026-08-18%20at%20218.53.06.jpeg",
    ],
    "collaborations": [
      "/brand/WhatsApp%20Image%202026-08-18%20at%2018.47.37.jpeg",
      "/brand/WhatsApp%20Image%202026-08-18%20at%2018.48.49.jpeg",
      "/brand/simran.jpeg",
    ],
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(activeService);
    }
  }, [activeService, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveService(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

        {/* Row of Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 md:justify-start">
          {services.map((s, i) => {
            const isActive = activeService === i;
            return (
              <button
                key={s.id}
                onClick={() => setActiveService(i)}
                onMouseEnter={() => setActiveService(i)}
                className={`group relative px-6 py-3 rounded-full border text-sm font-semibold tracking-tight transition-all duration-300 ${
                  isActive
                    ? "border-transparent bg-secondary/50 text-foreground shadow-[var(--shadow-lift)]"
                    : "border-border bg-background text-ink-soft hover:border-border/80 hover:bg-secondary/20 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full border border-transparent kp-gradient-border" />
                )}
                <span className="flex items-center gap-2">
                  <span className={`font-display text-[10px] tracking-wider ${
                    isActive ? "kp-gradient-text font-bold" : "text-ink-soft/70"
                  }`}>
                    0{i + 1}
                  </span>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel below */}
        <div className="mt-12 relative group/carousel">
          {/* Viewport */}
          <div className="overflow-hidden rounded-3xl border border-border bg-secondary/30 backdrop-blur-xl shadow-[var(--shadow-lift)]" ref={emblaRef}>
            <div className="flex">
              {services.map((s, i) => (
                <div key={s.id} className="flex-[0_0_100%] min-w-0 p-8 sm:p-12 relative overflow-hidden flex flex-col gap-10">
                  {/* Background ambient glow matching the active service */}
                  <div className="absolute -right-24 -top-24 h-[25rem] w-[25rem] rounded-full kp-gradient-bg opacity-10 blur-[100px] pointer-events-none" />

                  {/* Top: Details Grid */}
                  <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-start">
                    {/* Left: Title, Description & Action */}
                    <div>
                      <span className="font-display text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">
                        Service Details
                      </span>
                      <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                        {s.line}
                      </p>
                      
                      <div className="mt-6">
                        <Link
                          to="/services"
                          hash={s.id}
                          className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 font-display text-sm font-semibold text-foreground transition-all duration-300 hover:border-transparent hover:shadow-[var(--shadow-lift)] relative overflow-hidden"
                        >
                          <span className="absolute inset-0 rounded-full border border-transparent kp-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          Explore service
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Right: What We Offer list */}
                    <div className="md:border-l md:border-border md:pl-8 flex flex-col gap-3 h-full justify-center">
                      <p className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">
                        What we offer:
                      </p>
                      <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-1 text-sm text-ink-soft">
                        {s.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2.5">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full kp-gradient-bg" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom: One-line Work Images Marquee */}
                  <div className="relative w-full rounded-2xl overflow-hidden border border-border/50 bg-secondary/50 p-4 shadow-md">
                    {/* Fade masks on the left and right edges */}
                    <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] pointer-events-none z-10" />

                    <div className="relative flex overflow-hidden w-full">
                      <div className="flex w-max animate-kp-marquee items-center gap-4 pr-4">
                        {[...serviceWorks[s.id], ...serviceWorks[s.id]].map((imgUrl, idx) => {
                          const isVid = imgUrl.toLowerCase().endsWith(".mp4") || imgUrl.toLowerCase().endsWith(".webm") || imgUrl.toLowerCase().endsWith(".mov");
                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedImage(imgUrl)}
                            className={`h-28 sm:h-36 ${
                              s.id === "creative-advertising" ? "w-[149px] sm:w-[192px]" : "w-44 sm:w-56"
                            } rounded-xl overflow-hidden border border-border/50 shadow-sm shrink-0 cursor-zoom-in group/img relative text-left`}
                            >
                              {isVid ? (
                                <video
                                  src={imgUrl}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                />
                              ) : (
                                <img
                                  src={imgUrl}
                                  alt={`${s.title} work ${idx}`}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                />
                              )}
                              {/* Hover overlay hint */}
                              <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-background/80 text-foreground text-xs font-semibold px-2.5 py-1.5 rounded-full shadow backdrop-blur-sm">
                                  View
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-background hover:scale-105"
            aria-label="Previous service"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-background hover:scale-105"
            aria-label="Next service"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Lightbox Popup */}
      {selectedImage && (() => {
        const isVid = selectedImage.toLowerCase().endsWith(".mp4") || selectedImage.toLowerCase().endsWith(".webm") || selectedImage.toLowerCase().endsWith(".mov");
        return (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-300"
          >
            <div className="relative max-w-[90vw] max-h-[85vh] overflow-hidden rounded-2xl border border-border/50 shadow-2xl bg-secondary/20">
              {isVid ? (
                <video
                  src={selectedImage}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl animate-in zoom-in-95 duration-300"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img
                  src={selectedImage}
                  alt="Selected portfolio item"
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl animate-in zoom-in-95 duration-300"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-md hover:bg-background hover:scale-105 transition-all duration-300"
                aria-label="Close image popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        );
      })()}
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
