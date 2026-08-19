import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { MagneticButton } from "@/components/site/MagneticLink";

const title = "Contact — Kreative Planet";
const description =
  "Start a project with Kreative Planet. Tell us about your brand and we'll come back with a creative and growth direction.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const interests = [
  "Social Media",
  "Video Production",
  "Creative Advertising",
  "Website & SEO",
  "Creator Management",
  "Collaborations",
];

function ContactPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) =>
    setSelected((prev) => (prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]));

  return (
    <>
      <section id="talk" className="px-5 pb-24 pt-32 sm:px-8 sm:pt-44">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal>
              <p className="kp-eyebrow">Contact</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-[0.88] tracking-tighter text-foreground sm:text-7xl">
                Start a <span className="kp-gradient-text">project.</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft">
                Tell us about your brand and where you want to be. We&apos;ll come back with a
                creative and growth direction — not a generic deck.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-12 space-y-6">
              <div className="border-t border-border pt-4">
                <p className="kp-eyebrow">Email</p>
                <a
                  href="mailto:hello@kreativeplanet.com"
                  className="mt-2 block font-display text-lg text-foreground transition-colors hover:text-kp-magenta"
                >
                  hello@kreativeplanet.com
                </a>
              </div>
              <div className="border-t border-border pt-4">
                <p className="kp-eyebrow">Response time</p>
                <p className="mt-2 font-display text-lg text-foreground">Within 24 hours</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="kp-eyebrow">Office address</p>
                <address className="mt-2 block font-display text-base not-italic leading-relaxed text-foreground">
                  Technopolis, 11th Floor, BP Block,
                  <br />
                  Sector V, Bidhannagar, North 24 Parganas,
                  <br />
                  Salt Lake, Kolkata - 700091, India
                </address>
              </div>
              <div className="border-t border-border pt-4">
                <p className="kp-eyebrow">Contact Details</p>
                <div className="mt-3 space-y-3 font-display text-base text-foreground">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-ink-soft">
                      Technical Support
                    </span>
                    <a
                      href="tel:+918016222991"
                      className="mt-0.5 block font-semibold hover:text-kp-magenta transition-colors"
                    >
                      Soumojit Saha: +91 8016222991
                    </a>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-ink-soft">
                      Marketing & Creative
                    </span>
                    <a
                      href="tel:+917980657709"
                      className="mt-0.5 block font-semibold hover:text-kp-magenta transition-colors"
                    >
                      Roni Banerjee: +91 7980657709
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <form
              className="rounded-lg border border-border p-6 sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                toast.success("Thanks — your brief is on its way.", {
                  description: "We'll get back to you within 24 hours.",
                });
                form.reset();
                setSelected([]);
              }}
            >
              <div className="grid gap-5">
                <Field label="Name" name="name" placeholder="Your name" />
                <Field label="Email" name="email" type="email" placeholder="you@brand.com" />
                <Field label="Brand / Company" name="company" placeholder="Brand name" required={false} />

                <fieldset>
                  <legend className="kp-eyebrow">What do you need?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {interests.map((item) => {
                      const active = selected.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggle(item)}
                          className={`rounded-full border px-4 py-2 text-xs transition-all duration-300 ${
                            active
                              ? "border-transparent kp-gradient-bg text-primary-foreground"
                              : "border-border text-ink-soft hover:text-foreground"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                  <input type="hidden" name="interests" value={selected.join(", ")} />
                </fieldset>

                <div>
                  <label htmlFor="brief" className="kp-eyebrow">
                    Project brief
                  </label>
                  <textarea
                    id="brief"
                    name="brief"
                    rows={4}
                    required
                    placeholder="What are you building, and what does growth look like for you?"
                    className="mt-3 w-full resize-none rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-ink-soft/60 focus:border-kp-magenta"
                  />
                </div>

                <MagneticButton type="submit" className="mt-2 w-full">
                  Send Brief <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="kp-eyebrow">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-3 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-ink-soft/60 focus:border-kp-magenta"
      />
    </div>
  );
}
