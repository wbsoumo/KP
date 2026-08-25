import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Insights — Kreative Planet" },
      {
        name: "description",
        content:
          "Explore actionable insights on creative advertising, vertical video growth, brand positioning, and digital content engines.",
      },
      { property: "og:title", content: "Blog & Insights — Kreative Planet" },
      {
        property: "og:description",
        content: "Actionable guides on branding, advertising, short-form video reels, and organic growth.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogLayout,
});

function BlogLayout() {
  return <Outlet />;
}
