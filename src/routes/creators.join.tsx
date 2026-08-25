import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Phone, Instagram, KeyRound, ArrowRight, CheckCircle2, UserCheck, FileText, AlertCircle } from "lucide-react";
import { getStoredCreators, saveStoredCreators, type CreatorData } from "@/lib/creator-store";

export const Route = createFileRoute("/creators/join")({
  head: () => ({
    meta: [
      { title: "Join Creator Network — Kreative Planet" },
      { name: "description", content: "Apply to join the Kreative Planet Creator Network." },
    ],
  }),
  component: CreatorJoinPage,
});

const CATEGORIES = [
  "LIFESTYLE & BEAUTY",
  "TECH & GAMING",
  "FITNESS & HEALTH",
  "FASHION & STYLE",
  "FOOD & TRAVEL",
  "ENTERTAINMENT & REELS",
  "BUSINESS & FINANCE",
];

function CreatorJoinPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [managedBy, setManagedBy] = useState<"self" | "manager">("self");
  const [managerName, setManagerName] = useState("");
  const [managerContact, setManagerContact] = useState("");
  const [remarks, setRemarks] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim() || !email.trim() || !phone.trim() || !instagramHandle.trim() || !password) {
      setErrorMsg("Please fill out all mandatory fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        instagramHandle: instagramHandle.trim(),
        instagramFollowers: instagramFollowers.trim() || "N/A",
        category,
        managedBy,
        managerName: managedBy === "manager" ? managerName.trim() : "",
        managerContact: managedBy === "manager" ? managerContact.trim() : "",
        remarks: remarks.trim(),
        password,
      };

      // Save directly to server API & MySQL database
      const res = await fetch("/api/creators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text().catch(() => "");
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (!res.ok || !data?.success) {
        const errorDetail = data?.error || (text.includes("<!DOCTYPE") ? "Server API route returned 404/500 HTML. Check Vercel serverless functions." : text) || "Failed to save creator registration in MySQL database.";
        throw new Error(errorDetail);
      }

      const createdCreator = data.creator;

      // Sync local cache
      if (createdCreator && typeof window !== "undefined") {
        const existing = getStoredCreators();
        const updated = [createdCreator, ...existing.filter((c) => c.id !== createdCreator.id)];
        saveStoredCreators(updated);
      }

      setSuccessMsg(true);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to register in database. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successMsg) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-36">
        <div className="kp-hairline w-full max-w-lg rounded-3xl bg-card/60 p-10 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-500/20 text-green-400">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold uppercase">Application Submitted!</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Thank you <span className="text-white font-bold">{fullName}</span>. Your creator application has been sent to the Kreative Planet studio team for review.
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-background/60 p-4 text-xs text-foreground/80">
            Once approved by our admin team, you can log in to your creator dashboard using your handle (<span className="text-kp-pink">{instagramHandle}</span>) and password.
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/creators/login"
              className="kp-gradient-bg rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)]"
            >
              Go to Login →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="kp-eyebrow text-kp-pink">Join Kreative Planet</span>
          <h1 className="mt-3 text-4xl font-extrabold uppercase sm:text-5xl">
            CREATOR <span className="kp-gradient-text">APPLICATION</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Fill in your creator details to request access to the network and brand opportunities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 kp-hairline rounded-3xl bg-card/50 p-8 shadow-2xl backdrop-blur-xl">
          {/* Full Name & Phone */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="kp-eyebrow mb-2 block flex items-center gap-2 text-white">
                <User className="h-4 w-4 text-kp-pink" /> Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
              />
            </div>

            <div>
              <label className="kp-eyebrow mb-2 block flex items-center gap-2 text-white">
                <Phone className="h-4 w-4 text-kp-orange" /> Contact Phone *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
              />
            </div>
          </div>

          {/* Email & Instagram Handle */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="kp-eyebrow mb-2 block text-white">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@example.com"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
              />
            </div>

            <div>
              <label className="kp-eyebrow mb-2 block flex items-center gap-2 text-white">
                <Instagram className="h-4 w-4 text-kp-pink" /> Instagram Handle *
              </label>
              <input
                type="text"
                required
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                placeholder="@yourhandle"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
              />
            </div>
          </div>

          {/* Followers & Category */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="kp-eyebrow mb-2 block text-white">Follower Count</label>
              <input
                type="text"
                value={instagramFollowers}
                onChange={(e) => setInstagramFollowers(e.target.value)}
                placeholder="e.g. 50K, 250K"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
              />
            </div>

            <div>
              <label className="kp-eyebrow mb-2 block text-white">Primary Content Niche</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-card text-foreground">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Management Radio selection */}
          <div className="border-t border-white/10 pt-6">
            <label className="kp-eyebrow mb-3 block flex items-center gap-2 text-white">
              <UserCheck className="h-4 w-4 text-kp-purple" /> Profile Managed By *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                <input
                  type="radio"
                  name="managedBy"
                  value="self"
                  checked={managedBy === "self"}
                  onChange={() => setManagedBy("self")}
                  className="accent-kp-pink"
                />
                Managed by Myself
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                <input
                  type="radio"
                  name="managedBy"
                  value="manager"
                  checked={managedBy === "manager"}
                  onChange={() => setManagedBy("manager")}
                  className="accent-kp-pink"
                />
                Managed by Agency / Manager
              </label>
            </div>

            {managedBy === "manager" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 rounded-2xl border border-white/10 bg-background/60 p-4">
                <div>
                  <label className="kp-eyebrow mb-1.5 block">Manager Name / Agency</label>
                  <input
                    type="text"
                    required
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    placeholder="e.g. TalentHub (Rohan)"
                    className="w-full rounded-xl border border-white/15 bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                  />
                </div>
                <div>
                  <label className="kp-eyebrow mb-1.5 block">Manager Contact</label>
                  <input
                    type="text"
                    required
                    value={managerContact}
                    onChange={(e) => setManagerContact(e.target.value)}
                    placeholder="Phone or email"
                    className="w-full rounded-xl border border-white/15 bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Remarks (Optional) */}
          <div className="border-t border-white/10 pt-6">
            <label className="kp-eyebrow mb-2 block flex items-center gap-2 text-white">
              <FileText className="h-4 w-4 text-kp-pink" /> Additional Remarks (Optional)
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Tell us about your recent brand collabs, target audience, or specific growth goals..."
              className="w-full rounded-xl border border-white/15 bg-background/80 p-4 text-sm text-foreground focus:border-kp-pink focus:outline-none"
            />
          </div>

          {/* Account Password */}
          <div className="border-t border-white/10 pt-6">
            <label className="kp-eyebrow mb-2 block flex items-center gap-2 text-white">
              <KeyRound className="h-4 w-4 text-kp-orange" /> Account Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a secure password for creator login"
              className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
            />
          </div>

          {errorMsg && (
            <p className="flex items-center gap-2 text-xs font-semibold text-red-400">
              <AlertCircle className="h-4 w-4" /> {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="kp-gradient-bg w-full rounded-xl py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] hover:brightness-110 disabled:opacity-50 transition-transform active:scale-95"
          >
            {isSubmitting ? "Submitting Application..." : "Submit Creator Application →"}
          </button>
        </form>
      </div>
    </main>
  );
}
