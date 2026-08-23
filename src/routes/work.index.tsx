import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/kp/Portfolio";
import { CtaLink, SectionHeading } from "@/components/kp/ui";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Our Creative Galaxy — Work by Kreative Planet" },
      {
        name: "description",
        content:
          "Advertising, branding, social, video and creator campaigns launched by Kreative Planet — ideas built to earn attention.",
      },
      { property: "og:title", content: "Our Creative Galaxy — Work by Kreative Planet" },
      {
        property: "og:description",
        content: "Ideas we've launched into the world. Advertising, branding, social, video and creator campaigns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Portfolio"
          title={
            <>
              Our Creative
              <br />
              <span className="kp-gradient-text">Galaxy</span>
            </>
          }
          sub="Ideas we've launched into the world."
        />
        <div className="mt-16">
          <Portfolio />
        </div>
        <div className="mt-24 flex flex-wrap gap-4">
          <CtaLink to="/contact">Start a project →</CtaLink>
          <CtaLink to="/" variant="ghost">
            Enter the universe
          </CtaLink>
        </div>
      </div>
    </main>
  );
}
