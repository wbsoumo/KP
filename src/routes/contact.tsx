import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, Reveal, SectionHeading } from "@/components/kp/ui";
import { PHONE, PHONE_TEL, WHATSAPP } from "@/lib/kp-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Kreative Planet — Start a Project" },
      {
        name: "description",
        content:
          "Tell us about your brand and we'll come back with an idea. Call +91 79806 57709 or message Kreative Planet on WhatsApp.",
      },
      { property: "og:title", content: "Contact Kreative Planet — Start a Project" },
      {
        property: "og:description",
        content: "Tell us about your brand and we'll come back with an idea.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let's launch
              <br />
              <span className="kp-gradient-text">something</span>
            </>
          }
          sub="Brand, business, personal brand or creator — tell us where you're headed and we'll bring the idea."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <a
              href={`tel:${PHONE_TEL}`}
              className="kp-hairline block rounded-3xl bg-card/50 p-8 transition-colors hover:border-white/30"
            >
              <p className="kp-eyebrow mb-4">Call the studio</p>
              <p className="text-3xl font-bold tracking-tight">{PHONE}</p>
              <p className="mt-3 text-sm text-muted-foreground">Mon – Sat, 10am – 8pm IST</p>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="kp-hairline block rounded-3xl bg-card/50 p-8 transition-colors hover:border-white/30"
            >
              <p className="kp-eyebrow mb-4">WhatsApp</p>
              <p className="text-3xl font-bold tracking-tight">Message us</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Fastest way to reach Roni and the team.
              </p>
            </a>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-wrap gap-4">
          <CtaLink to="/work" variant="ghost">
            See the work
          </CtaLink>
          <CtaLink to="/" variant="ghost">
            Enter the universe
          </CtaLink>
        </div>
      </div>
    </main>
  );
}
