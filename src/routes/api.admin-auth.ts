import { createAPIFileRoute } from "@tanstack/react-start/api";
import { verifyAdminCredentialsInMySQL } from "@/lib/mysql-db";

export const APIRoute = createAPIFileRoute("/api/admin-auth")({
  POST: async ({ request }) => {
    try {
      const { username, password } = await request.json();

      const isValid = await verifyAdminCredentialsInMySQL(username, password);

      if (isValid) {
        return new Response(
          JSON.stringify({ success: true, token: "kp_auth_valid_session_2026" }),
          {
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": "kp_admin_session=kp_auth_valid_session_2026; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400",
            },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid username or password credentials." }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Authentication error." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
