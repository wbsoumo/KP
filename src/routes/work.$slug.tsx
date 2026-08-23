import { createFileRoute, notFound } from "@tanstack/react-router";
import { CtaLink, Reveal } from "@/components/kp/ui";
import { PROJECTS } from "@/lib/kp-data";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found — Kreative Planet" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.name} — Kreative Planet`;
    return {
      meta: [
        { title },
        { name: "description", content: `${project.blurb} ${project.result}.` },
        { property: "og:title", content: title },
        { property: "og:description", content: project.blurb },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();

  return (
    <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <p className="kp-eyebrow">{project.category}</p>
          <h1 className="mt-5 text-[clamp(2.2rem,7vw,5rem)] font-extrabold uppercase leading-[0.95]">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.blurb}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="kp-hairline mt-14 aspect-[16/9] w-full overflow-hidden rounded-3xl"
            style={{
              background:
                "radial-gradient(120% 90% at 20% 10%, rgba(255,122,0,.5), transparent 60%), radial-gradient(100% 80% at 80% 70%, rgba(108,43,255,.5), transparent 60%), linear-gradient(160deg,#0d0715,#05050A)",
            }}
          />
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="kp-eyebrow mb-2">Result</p>
              <p className="text-sm text-foreground/85">{project.result}</p>
            </div>
            <div>
              <p className="kp-eyebrow mb-2">Format</p>
              <p className="text-sm uppercase text-foreground/85">{project.format}</p>
            </div>
            <div>
              <p className="kp-eyebrow mb-2">Discipline</p>
              <p className="text-sm uppercase text-foreground/85">{project.category}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-24 flex flex-wrap gap-4">
          <CtaLink to="/contact">Start a project →</CtaLink>
          <CtaLink to="/work" variant="ghost">
            Back to the galaxy
          </CtaLink>
        </div>
      </div>
    </main>
  );
}
