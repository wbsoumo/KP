import { createAPIFileRoute } from "@tanstack/react-start/api";
import { fetchCreatorsFromVercelDB, saveCreatorToVercelDB, updateCreatorStatusInVercelDB } from "@/lib/vercel-db";
import { type CreatorData } from "@/lib/creator-store";

export const APIRoute = createAPIFileRoute("/api/creators")({
  GET: async () => {
    try {
      const creators = await fetchCreatorsFromVercelDB();
      return new Response(JSON.stringify({ success: true, creators }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to fetch creators from Vercel Database." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  POST: async ({ request }) => {
    try {
      const data = await request.json();
      
      // Update action from Admin
      if (data.action === "update_status" && data.id && data.status) {
        await updateCreatorStatusInVercelDB(data.id, data.status);
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

      // Save directly to Vercel Database
      await saveCreatorToVercelDB(newCreator);

      return new Response(
        JSON.stringify({ success: true, creator: newCreator }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Server error processing registration in Vercel DB." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
