import { createFileRoute, Outlet } from "@tanstack/react-router";

const title = "Work — Kreative Planet";
const description =
  "Selected branding, social, advertising, video, website and campaign work built by Kreative Planet for ambitious brands.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkLayout,
});

function WorkLayout() {
  return <Outlet />;
}
