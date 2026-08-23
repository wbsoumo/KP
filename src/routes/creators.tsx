import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, Reveal, SectionHeading } from "@/components/kp/ui";
import { CREATORS } from "@/lib/kp-data";

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      { title: "Creator Constellation — Kreative Planet" },
      {
        name: "description",
        content:
          "Creator and influencer campaigns built around ideas, not just impressions. Kreative Planet matches brands with the right creators across every category.",
      },
      { property: "og:title", content: "Creator Constellation — Kreative Planet" },
      {
        property: "og:description",
        content: "Creator and influencer campaigns built around ideas, not just impressions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreatorsPage,
});

function CreatorsPage() {
  return (
    <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
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
          sub="We connect brands with creators whose audiences already lean in — then build the creative that makes the collaboration feel inevitable."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CREATORS.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) * 80}>
              <div className="kp-hairline h-full rounded-2xl bg-card/50 p-6 transition-colors hover:border-white/30">
                <h2 className="text-lg font-bold uppercase leading-tight">{c.name}</h2>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-foreground/60">
                  {c.audience}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {c.format}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 flex flex-wrap gap-4">
          <CtaLink to="/contact">Build a creator campaign →</CtaLink>
          <CtaLink to="/work" variant="ghost">
            See the work
          </CtaLink>
        </div>
      </div>
    </main>
  );
}
