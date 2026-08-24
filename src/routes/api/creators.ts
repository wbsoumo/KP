import { createAPIFileRoute } from "@tanstack/react-start/api";
import { fetchCreatorsFromMySQL, saveCreatorToMySQL, updateCreatorStatusInMySQL, initMySQLDatabase } from "@/lib/mysql-db";
import { type CreatorData } from "@/lib/creator-store";

export const APIRoute = createAPIFileRoute("/api/creators")({
  GET: async ({ request }) => {
    try {
      const url = new URL(request.url);
      if (url.searchParams.get("action") === "init_db") {
        await initMySQLDatabase();
        return new Response(
          JSON.stringify({
            success: true,
            message: "MySQL database table 'creators' initialized successfully on host 86.107.77.32 (taskbaz3_kp).",
          }),
          { headers: { "Content-Type": "application/json" } }
        );
      }

      const creators = await fetchCreatorsFromMySQL();
      return new Response(JSON.stringify({ success: true, creators }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(
        JSON.stringify({
          success: false,
          error: err?.message || err?.sqlMessage || "Failed to fetch creators from MySQL Database.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  POST: async ({ request }) => {
    try {
      const data = await request.json();
      
      // Init table or status update action from Admin
      if (data.action === "init_db") {
        await initMySQLDatabase();
        return new Response(JSON.stringify({ success: true, message: "MySQL database table initialized." }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      if (data.action === "update_status" && data.id && data.status) {
        await updateCreatorStatusInMySQL(data.id, data.status);
        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      if (!data.fullName || !data.email || !data.phone || !data.instagramHandle || !data.password) {
        return new Response(
          JSON.stringify({ success: false, error: "Please fill in all required fields." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const newCreator: CreatorData = {
        id: `creator-${Date.now()}`,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        instagramHandle: data.instagramHandle,
        instagramFollowers: data.instagramFollowers || "0",
        category: data.category || "CREATOR",
        managedBy: data.managedBy || "self",
        managerName: data.managerName || "",
        managerContact: data.managerContact || "",
        remarks: data.remarks || "",
        passwordHash: data.password,
        status: "pending",
        createdAt: new Date().toISOString(),
        metrics: {
          totalEarnings: 0,
          monthlyEarnings: 0,
          campaignsCompleted: 0,
          activeCampaigns: 0,
          reachGrowthPercentage: 0,
          engagementRate: 0,
          totalReach: "0",
        },
      };

      // Save to MySQL Database
      await saveCreatorToMySQL(newCreator);

      return new Response(
        JSON.stringify({ success: true, creator: newCreator }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Server error processing registration in MySQL DB." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
