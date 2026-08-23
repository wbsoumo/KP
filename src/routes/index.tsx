import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaLink, Magnetic, PlanetBody, Reveal, SectionHeading } from "@/components/kp/ui";
import { Portfolio } from "@/components/kp/Portfolio";
import { ServicesSection } from "@/components/site/sections";
import { CREATORS, GROWTH_ORBIT, PHONE, PHONE_TEL, PLANETS, WHATSAPP } from "@/lib/kp-data";

const TITLE = "Kreative Planet — Creativity Without Gravity";
const DESCRIPTION =
  "Kreative Planet is a creative advertising and brand content studio founded by Roni Banerjee. Advertising, film, design, social, creators and digital — every planet a capability.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-36 md:px-10 md:pb-36 md:pt-48">
      <div className="pointer-events-none absolute -right-24 top-20 hidden lg:block">
        <PlanetBody size={420} from="#FF7A00" to="#6C2BFF" className="kp-float opacity-70" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <p className="kp-eyebrow">Creative Advertising &amp; Brand Content Studio</p>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="mt-6 text-[clamp(2.6rem,9vw,8rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
            Kreative
            <br />
            <span className="kp-gradient-text">Planet</span>
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Creativity Without Gravity. We build ideas that escape the ordinary — advertising, film,
            design, social, creators and digital, orbiting one brand at a time.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap gap-4">
            <CtaLink to="/contact">Start a project →</CtaLink>
            <CtaLink to="/" hash="planets" variant="ghost">
              Explore the planets
            </CtaLink>
          </div>
        </Reveal>
        <Reveal delay={340}>
          <p className="mt-14 text-xs uppercase tracking-[0.3em] text-foreground/50">
            Founded by Roni Banerjee ·{" "}
            <a href={`tel:${PHONE_TEL}`} className="text-foreground/80 hover:text-foreground">
              {PHONE}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Planets() {
  return (
    <section id="planets" className="scroll-mt-28 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="The system"
          title={
            <>
              Six <span className="kp-gradient-text">planets</span>,
              <br />
              one universe
            </>
          }
          sub="Each planet is a capability. Together they hold a brand in orbit — from the first idea to the launch that lands."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANETS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90}>
              <article
                data-planet
                className="kp-hairline group relative h-full overflow-hidden rounded-3xl bg-card/50 p-8 transition-colors hover:border-white/30"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="kp-eyebrow">{p.index}</p>
                    <h3 className="mt-3 text-2xl font-bold uppercase leading-tight">{p.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {p.domain}
                    </p>
                  </div>
                  <PlanetBody
                    size={72}
                    from={p.hue[0]}
                    to={p.hue[1]}
                    ring={false}
                    className="shrink-0 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.items.slice(0, 5).map((it) => (
                    <li
                      key={it}
                      className="kp-hairline rounded-full px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-foreground/65"
                    >
                      {it}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/70">
                  {p.statement}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandGrowthSection() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32 border-t border-white/10 bg-card/30">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Capabilities & Showcase"
          title={
            <>
              Everything your brand <br />
              <span className="kp-gradient-text">needs to grow.</span>
            </>
          }
          sub="360° Creative & Digital Growth Agency helping ambitious brands turn ideas into attention, content and revenue."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <Reveal delay={60}>
              <div className="kp-hairline rounded-2xl bg-card/50 p-6">
                <h3 className="text-xl font-bold uppercase">Social Media &amp; Content Engine</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Strategy, script writing, reels, shorts and content calendars designed to capture attention and build loyal communities.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="kp-hairline rounded-2xl bg-card/50 p-6">
                <h3 className="text-xl font-bold uppercase">High-Impact Video Production</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cinematic shoots, motion graphics and crisp editing built for vertical feeds and big screens alike.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="kp-hairline rounded-2xl bg-card/50 p-6">
                <h3 className="text-xl font-bold uppercase">Websites, SEO &amp; Influencers</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fast conversion-driven web design, local SEO optimization and strategic brand × creator collaborations.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={240}>
            <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[32rem] [perspective:1000px]">
              <div className="absolute inset-[12%] rounded-full kp-gradient-bg opacity-[0.22] blur-3xl" />
              <div className="absolute inset-[6%] rounded-full border border-white/15 animate-kp-spin-slow">
                <span className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF7A00] shadow-[0_0_12px_#FF7A00]" />
              </div>
              <div className="absolute inset-[22%] rounded-full border border-white/15 animate-kp-spin-slower">
                <span className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#FF007A] shadow-[0_0_12px_#FF007A]" />
              </div>
              <div className="absolute inset-[36%] flex items-center justify-center overflow-hidden rounded-full kp-gradient-bg animate-kp-float shadow-[var(--shadow-orbit)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_55%)]" />
                <span className="relative font-display text-xs font-extrabold uppercase tracking-[0.25em] text-white">
                  360° Growth
                </span>
              </div>
              <span className="absolute right-[6%] top-[16%] rounded-full border border-white/20 bg-background/80 px-3.5 py-1.5 font-display text-[0.65rem] uppercase tracking-[0.2em] text-foreground/80 backdrop-blur animate-kp-float">
                Content
              </span>
              <span className="absolute bottom-[16%] left-[2%] rounded-full border border-white/20 bg-background/80 px-3.5 py-1.5 font-display text-[0.65rem] uppercase tracking-[0.2em] text-foreground/80 backdrop-blur animate-kp-float [animation-delay:1.4s]">
                Growth
              </span>
              <span className="absolute left-[8%] top-[24%] rounded-full border border-white/20 bg-background/80 px-3.5 py-1.5 font-display text-[0.65rem] uppercase tracking-[0.2em] text-foreground/80 backdrop-blur animate-kp-float [animation-delay:0.8s]">
                Videos
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GrowthOrbit() {
  return (
    <section className="px-5 py-20 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="kp-hairline flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-3xl bg-card/40 px-6 py-8">
            {GROWTH_ORBIT.map((g, i) => (
              <span
                key={g}
                className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-foreground/60"
              >
                {g}
                {i < GROWTH_ORBIT.length - 1 ? (
                  <span className="ml-8 text-foreground/25">◦</span>
                ) : null}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Ideas in <span className="kp-gradient-text">orbit</span>
            </>
          }
          sub="Campaigns, films, identities and content engines built for brands that wanted to be remembered."
        />
        <div className="mt-14">
          <Portfolio compact />
        </div>
        <div className="mt-16">
          <CtaLink to="/work" variant="ghost">
            See all work →
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

function CreatorTeaser() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Creators"
          title={
            <>
              A creator
              <br />
              <span className="kp-gradient-text">constellation</span>
            </>
          }
          sub="We match brands with voices their audience already trusts, then build the creative that makes the collaboration feel inevitable."
        />
        <div className="mt-14 flex flex-wrap gap-3">
          {CREATORS.map((c, i) => (
            <Reveal key={c.name} delay={(i % 6) * 60}>
              <span className="kp-hairline inline-flex rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-foreground/70">
                {c.name}
              </span>
            </Reveal>
          ))}
        </div>
        <div className="mt-14">
          <CtaLink to="/creators" variant="ghost">
            Enter the constellation →
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="relative overflow-hidden px-5 py-28 md:px-10 md:py-36">
      <div className="pointer-events-none absolute -left-32 bottom-0 hidden md:block">
        <PlanetBody size={340} from="#FF007A" to="#6C2BFF" className="kp-float opacity-50" />
      </div>
      <div className="relative mx-auto max-w-[1400px] text-center">
        <Reveal>
          <h2 className="text-[clamp(2.2rem,7vw,6rem)] font-extrabold uppercase leading-[0.95]">
            Let's launch
            <br />
            <span className="kp-gradient-text">something</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Tell us where your brand is headed. We'll bring the idea.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CtaLink href={`tel:${PHONE_TEL}`}>{PHONE}</CtaLink>
            <CtaLink href={WHATSAPP} variant="ghost">
              WhatsApp us
            </CtaLink>
          </div>
        </Reveal>
        <Reveal delay={280}>
          <p className="mt-10 text-xs uppercase tracking-[0.3em] text-foreground/50">
            <Magnetic>
              <Link to="/about" className="hover:text-foreground">
                About the studio →
              </Link>
            </Magnetic>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main>
      <Hero />
      <Planets />
      <BrandGrowthSection />
      <ServicesSection />
      <GrowthOrbit />
      <FeaturedWork />
      <CreatorTeaser />
      <ContactBand />
    </main>
  );
}
