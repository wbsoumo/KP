import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, Reveal, SectionHeading } from "@/components/kp/ui";
import { PROCESS, CONTACTS } from "@/lib/kp-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kreative Planet — Creativity Without Gravity" },
      {
        name: "description",
        content:
          "Kreative Planet is a creative advertising and digital growth studio led by Roni Banerjee and Soumojit Saha.",
      },
      { property: "og:title", content: "About Kreative Planet — Creativity Without Gravity" },
      {
        property: "og:description",
        content: "A creative advertising and brand content studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              We build ideas
              <br />
              <span className="kp-gradient-text">without gravity</span>
            </>
          }
          sub="Kreative Planet is a creative advertising and brand content studio. We work with brands, businesses, founders, personal brands and creators to turn positioning into ideas people actually remember."
        />

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="kp-hairline rounded-3xl bg-card/50 p-8 space-y-6">
              <p className="kp-eyebrow">Leadership</p>
              {CONTACTS.map((c) => (
                <div key={c.name} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-kp-pink">{c.role}</p>
                  <h3 className="mt-1 text-xl font-bold uppercase text-foreground">{c.name}</h3>
                  <a
                    href={`tel:${c.tel}`}
                    className="mt-1.5 inline-block text-base font-medium text-foreground/80 hover:text-foreground"
                  >
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="kp-hairline rounded-3xl bg-card/50 p-8">
              <p className="kp-eyebrow mb-4">How we work</p>
              <ol className="space-y-5">
                {PROCESS.map((p) => (
                  <li key={p.step} className="flex gap-4">
                    <span className="kp-gradient-text text-sm font-bold">{p.step}</span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em]">{p.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{p.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-wrap gap-4">
          <CtaLink to="/contact">Start a project →</CtaLink>
          <CtaLink to="/work" variant="ghost">
            See the work
          </CtaLink>
        </div>
      </div>
    </main>
  );
}
