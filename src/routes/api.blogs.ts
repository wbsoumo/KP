import { createAPIFileRoute } from "@tanstack/react-start/api";
import { fetchBlogsFromMySQL, fetchBlogBySlugFromMySQL, saveBlogToMySQL, deleteBlogFromMySQL } from "@/lib/mysql-db";
import { type BlogPost } from "@/lib/blog-store";

export const APIRoute = createAPIFileRoute("/api/blogs")({
  GET: async ({ request }) => {
    try {
      const url = new URL(request.url);
      const slug = url.searchParams.get("slug");
      const includeDrafts = url.searchParams.get("includeDrafts") === "true";

      if (slug) {
        const blog = await fetchBlogBySlugFromMySQL(slug);
        return new Response(JSON.stringify({ success: true, blog }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      const blogs = await fetchBlogsFromMySQL(includeDrafts);
      return new Response(JSON.stringify({ success: true, blogs }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(
        JSON.stringify({ success: false, error: err?.message || "Failed to fetch blogs." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  POST: async ({ request }) => {
    try {
      const data = await request.json();

      if (data.action === "delete" && data.id) {
        await deleteBlogFromMySQL(data.id);
        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      if (!data.id || !data.slug || !data.title || !data.content) {
        return new Response(
          JSON.stringify({ success: false, error: "Missing required blog fields." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const blog: BlogPost = {
        id: data.id,
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || "",
        content: data.content,
        featuredImage: data.featuredImage || "",
        category: data.category || "GROWTH",
        author: data.author || "Kreative Planet Team",
        readTime: data.readTime || "5 min read",
        status: data.status || "published",
        faqs: data.faqs || [],
        seoData: data.seoData || {},
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveBlogToMySQL(blog);

      return new Response(JSON.stringify({ success: true, blog }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(
        JSON.stringify({ success: false, error: err?.message || "Server error saving blog post." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
