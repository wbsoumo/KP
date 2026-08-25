import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, Reveal, SectionHeading } from "@/components/kp/ui";
import { CONTACTS, OFFICE_ADDRESS } from "@/lib/kp-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Kreative Planet — Start a Project" },
      {
        name: "description",
        content:
          "Marketing & Graphics: Roni Banerjee (+91 79806 57709) | Technical & Web Development: Soumojit Saha (+91 80162 22991).",
      },
      { property: "og:title", content: "Contact Kreative Planet — Start a Project" },
      {
        property: "og:description",
        content: "Get in touch with Kreative Planet for Marketing, Graphics and Technical Development.",
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
          sub="Brand, business, personal brand or creator — reach out to our leaders for marketing, graphics or website development."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CONTACTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 120}>
              <div className="kp-hairline rounded-3xl bg-card/50 p-8 flex flex-col justify-between h-full">
                <div>
                  <p className="kp-eyebrow mb-2">{c.role}</p>
                  <h3 className="text-2xl font-bold uppercase">{c.name}</h3>
                  <a
                    href={`tel:${c.tel}`}
                    className="mt-4 block text-xl font-semibold tracking-tight text-foreground hover:text-kp-pink transition-colors"
                  >
                    {c.phone}
                  </a>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CtaLink href={`tel:${c.tel}`}>Call →</CtaLink>
                  <CtaLink href={c.whatsapp} variant="ghost">
                    WhatsApp →
                  </CtaLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Office Address Card */}
        <Reveal delay={240} className="mt-8">
          <div className="kp-hairline rounded-3xl bg-card/50 p-8">
            <p className="kp-eyebrow text-kp-pink mb-2">{OFFICE_ADDRESS.title}</p>
            <h3 className="text-xl font-bold uppercase text-foreground">Kreative Planet Studio</h3>
            <p className="mt-3 text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl">
              {OFFICE_ADDRESS.line1}<br />
              {OFFICE_ADDRESS.line2}<br />
              {OFFICE_ADDRESS.line3}
            </p>
          </div>
        </Reveal>

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
