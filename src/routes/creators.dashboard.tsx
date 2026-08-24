import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  IndianRupee,
  Briefcase,
  Users,
  Award,
  Zap,
  LogOut,
  Sparkles,
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { getActiveCreatorSession, setActiveCreatorSession, type CreatorData } from "@/lib/creator-store";

export const Route = createFileRoute("/creators/dashboard")({
  head: () => ({
    meta: [
      { title: "Creator Dashboard — Kreative Planet" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CreatorDashboardPage,
});

function CreatorDashboardPage() {
  const navigate = useNavigate();
  const [creator, setCreator] = useState<CreatorData | null>(null);

  useEffect(() => {
    const session = getActiveCreatorSession();
    if (!session) {
      navigate({ to: "/creators/login" });
    } else {
      setCreator(session);
    }
  }, [navigate]);

  if (!creator) return null;

  const metrics = creator.metrics || {
    totalEarnings: 240000,
    monthlyEarnings: 65000,
    campaignsCompleted: 8,
    activeCampaigns: 2,
    reachGrowthPercentage: 18.5,
    engagementRate: 5.2,
    totalReach: "1.2M",
  };

  const handleLogout = () => {
    setActiveCreatorSession(null);
    navigate({ to: "/creators/login" });
  };

  return (
    <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1350px]">
        {/* Header bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-8">
          <div>
            <span className="kp-eyebrow text-kp-pink flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Kreative Planet Creator Network
            </span>
            <h1 className="mt-2 text-3xl font-extrabold uppercase sm:text-4xl">
              Welcome Back, <span className="kp-gradient-text">{creator.fullName}</span>
            </h1>
            <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
              {creator.instagramHandle} · {creator.category} · Status:{" "}
              <span className="text-green-400 font-bold uppercase">{creator.status}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="kp-hairline inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-foreground hover:bg-white/10 transition-colors w-fit"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        {/* Real Metrics Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="kp-hairline rounded-3xl bg-card/60 p-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute right-4 top-4 rounded-xl bg-kp-pink/15 p-2 text-kp-pink">
              <IndianRupee className="h-5 w-5" />
            </div>
            <span className="kp-eyebrow text-muted-foreground">Total Earnings With Us</span>
            <h3 className="mt-3 text-3xl font-extrabold text-white">
              ₹{metrics.totalEarnings.toLocaleString("en-IN")}
            </h3>
            <p className="mt-2 text-xs text-green-400 font-semibold flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +₹{metrics.monthlyEarnings.toLocaleString("en-IN")} this month
            </p>
          </div>

          <div className="kp-hairline rounded-3xl bg-card/60 p-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute right-4 top-4 rounded-xl bg-kp-orange/15 p-2 text-kp-orange">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="kp-eyebrow text-muted-foreground">Campaigns Completed</span>
            <h3 className="mt-3 text-3xl font-extrabold text-white">
              {metrics.campaignsCompleted} Brands
            </h3>
            <p className="mt-2 text-xs text-kp-orange font-semibold">
              {metrics.activeCampaigns} Active Campaigns Live
            </p>
          </div>

          <div className="kp-hairline rounded-3xl bg-card/60 p-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute right-4 top-4 rounded-xl bg-kp-purple/15 p-2 text-kp-purple">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="kp-eyebrow text-muted-foreground">Growth With Us</span>
            <h3 className="mt-3 text-3xl font-extrabold text-white">
              +{metrics.reachGrowthPercentage}%
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Organic reach growth rate
            </p>
          </div>

          <div className="kp-hairline rounded-3xl bg-card/60 p-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute right-4 top-4 rounded-xl bg-green-500/15 p-2 text-green-400">
              <Users className="h-5 w-5" />
            </div>
            <span className="kp-eyebrow text-muted-foreground">Total Audience Reach</span>
            <h3 className="mt-3 text-3xl font-extrabold text-white">
              {metrics.totalReach}
            </h3>
            <p className="mt-2 text-xs font-semibold text-kp-pink">
              {metrics.engagementRate}% Engagement Rate
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Active Campaigns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="kp-hairline rounded-3xl bg-card/50 p-8">
              <h2 className="text-xl font-extrabold uppercase flex items-center gap-2">
                <Zap className="h-5 w-5 text-kp-pink" /> Active & Upcoming Brand Campaigns
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-white/10 bg-background/60 p-5 gap-4">
                  <div>
                    <span className="kp-eyebrow text-kp-pink">Live Reel Campaign</span>
                    <h4 className="text-base font-bold uppercase mt-1">Midnight Fuel Energy Drink Collab</h4>
                    <p className="text-xs text-muted-foreground mt-1">1x Instagram Reel + 2x Stories</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-sm font-bold text-white">₹45,000</span>
                    <p className="text-[0.65rem] text-green-400 font-semibold uppercase">Content Approved</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-white/10 bg-background/60 p-5 gap-4">
                  <div>
                    <span className="kp-eyebrow text-kp-orange">Upcoming Launch</span>
                    <h4 className="text-base font-bold uppercase mt-1">Urban Lifestyle Brand Commercial</h4>
                    <p className="text-xs text-muted-foreground mt-1">Dedicated Studio Shoot + Social Amplification</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-sm font-bold text-white">₹85,000</span>
                    <p className="text-[0.65rem] text-kp-orange font-semibold uppercase">Contract Signed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Creative Support & Strategy */}
            <div className="kp-hairline rounded-3xl bg-card/50 p-8">
              <h2 className="text-xl font-extrabold uppercase flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-kp-purple" /> Studio Support & Growth Strategy
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-background/60 p-5">
                  <h4 className="font-bold uppercase text-sm">Video Editing Assistance</h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Upload raw footage for 4K color grading, dynamic subtitles, and motion graphics support from KP Editors.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-background/60 p-5">
                  <h4 className="font-bold uppercase text-sm">Monthly Content Calendar</h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Custom monthly content hooks and viral reel scripts prepared by Kreative Planet strategists.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Overview Card */}
          <div className="kp-hairline h-fit rounded-3xl bg-card/50 p-8 space-y-6">
            <h2 className="text-xl font-extrabold uppercase flex items-center gap-2">
              <Award className="h-5 w-5 text-kp-orange" /> Creator Profile
            </h2>
            <div className="space-y-4 text-xs">
              <div>
                <span className="kp-eyebrow text-muted-foreground">Full Name</span>
                <p className="text-sm font-bold text-white mt-1">{creator.fullName}</p>
              </div>
              <div>
                <span className="kp-eyebrow text-muted-foreground">Instagram Handle</span>
                <p className="text-sm font-bold text-kp-pink mt-1">{creator.instagramHandle}</p>
              </div>
              <div>
                <span className="kp-eyebrow text-muted-foreground">Contact Email</span>
                <p className="text-sm font-bold text-white mt-1">{creator.email}</p>
              </div>
              <div>
                <span className="kp-eyebrow text-muted-foreground">Contact Phone</span>
                <p className="text-sm font-bold text-white mt-1">{creator.phone}</p>
              </div>
              <div>
                <span className="kp-eyebrow text-muted-foreground">Managed By</span>
                <p className="text-sm font-bold text-white mt-1 uppercase">
                  {creator.managedBy === "manager"
                    ? `Manager (${creator.managerName || "N/A"})`
                    : "Self Managed"}
                </p>
              </div>
              {creator.remarks && (
                <div>
                  <span className="kp-eyebrow text-muted-foreground">Remarks</span>
                  <p className="text-xs text-foreground/80 mt-1 italic">{creator.remarks}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
