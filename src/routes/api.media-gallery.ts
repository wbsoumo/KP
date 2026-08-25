import { createAPIFileRoute } from "@tanstack/react-start/api";
import { fetchMediaGalleryFromMySQL, saveMediaItemToMySQL, deleteMediaItemFromMySQL } from "@/lib/mysql-db";
import { type MediaItem } from "@/lib/gallery-store";

export const APIRoute = createAPIFileRoute("/api/media-gallery")({
  GET: async () => {
    try {
      const items = await fetchMediaGalleryFromMySQL();
      return new Response(JSON.stringify({ success: true, items }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(
        JSON.stringify({ success: false, error: err?.message || "Failed to fetch gallery items." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  POST: async ({ request }) => {
    try {
      const data = await request.json();
      if (data.action === "delete" && data.id) {
        await deleteMediaItemFromMySQL(data.id);
        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      if (!data.id || !data.type || !data.url || !data.title || !data.category) {
        return new Response(
          JSON.stringify({ success: false, error: "Missing required media fields." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const item: MediaItem = {
        id: data.id,
        type: data.type,
        url: data.url,
        title: data.title,
        category: data.category,
        aspectRatio: data.aspectRatio || "reel",
      };

      await saveMediaItemToMySQL(item);

      return new Response(JSON.stringify({ success: true, item }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(
        JSON.stringify({ success: false, error: err?.message || "Server error saving media item." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
