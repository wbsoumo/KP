import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/admin-auth")({
  POST: async ({ request }) => {
    try {
      const { username, password } = await request.json();

      const expectedUser = process.env.ADMIN_USERNAME || "admin";
      const expectedPass = process.env.ADMIN_PASSWORD || "kreative2026";

      if (username === expectedUser && password === expectedPass) {
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
