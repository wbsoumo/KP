import { createAPIFileRoute } from "@tanstack/react-start/api";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dt02mpeqj",
  api_key: process.env.CLOUDINARY_API_KEY || "485515273593933",
  api_secret: process.env.CLOUDINARY_API_SECRET || "Jgi9yZG6AZ8BMUlS5UEZ0F-dmZ0",
  secure: true,
});

export const APIRoute = createAPIFileRoute("/api/cloudinary-sign")({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const timestamp = Math.round(new Date().getTime() / 1000);
      const folder = body.folder || "kreative-planet/uploads";

      const signature = cloudinary.utils.api_sign_request(
        {
          timestamp,
          folder,
        },
        process.env.CLOUDINARY_API_SECRET || "Jgi9yZG6AZ8BMUlS5UEZ0F-dmZ0"
      );

      return new Response(
        JSON.stringify({
          signature,
          timestamp,
          cloudName: process.env.CLOUDINARY_CLOUD_NAME || "dt02mpeqj",
          apiKey: process.env.CLOUDINARY_API_KEY || "485515273593933",
          folder,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err instanceof Error ? err.message : "Failed to generate signature" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
