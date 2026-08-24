import { createAPIFileRoute } from "@tanstack/react-start/api";
import { initMySQLDatabase } from "@/lib/mysql-db";

export const APIRoute = createAPIFileRoute("/api/init-db")({
  GET: async () => {
    try {
      await initMySQLDatabase();
      return new Response(
        JSON.stringify({
          success: true,
          message: "MySQL database table 'creators' initialized successfully on host 86.107.77.32 (taskbaz3_kp).",
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Database init error." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
