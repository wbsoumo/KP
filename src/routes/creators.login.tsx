import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, User, KeyRound, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { getStoredCreators, setActiveCreatorSession } from "@/lib/creator-store";

export const Route = createFileRoute("/creators/login")({
  head: () => ({
    meta: [
      { title: "Creator Portal Login — Kreative Planet" },
      { name: "description", content: "Login to your Kreative Planet Creator Dashboard." },
    ],
  }),
  component: CreatorLoginPage,
});

function CreatorLoginPage() {
  const navigate = useNavigate();
  const [handleOrEmail, setHandleOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoggingIn(true);

    try {
      const creators = getStoredCreators();
      const input = handleOrEmail.trim().toLowerCase().replace(/^@/, "");

      const found = creators.find((c) => {
        const matchesHandle = c.instagramHandle.toLowerCase().replace(/^@/, "") === input;
        const matchesEmail = c.email.toLowerCase() === input;
        return matchesHandle || matchesEmail;
      });

      if (!found) {
        setErrorMsg("No creator account found with this handle or email.");
        return;
      }

      if (found.passwordHash !== password) {
        setErrorMsg("Incorrect password.");
        return;
      }

      if (found.status === "pending") {
        setErrorMsg("Your creator application is currently pending admin approval.");
        return;
      }

      if (found.status === "rejected") {
        setErrorMsg("Your creator application was not approved.");
        return;
      }

      // Successful login
      setActiveCreatorSession(found);
      navigate({ to: "/creators/dashboard" });
    } catch {
      setErrorMsg("Failed to authenticate session.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-36">
      <div className="kp-hairline w-full max-w-md rounded-3xl bg-card/60 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full kp-gradient-bg shadow-[var(--glow-kp)]">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-6 text-2xl font-extrabold uppercase">Creator Login</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Kreative Planet Creator Dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label className="kp-eyebrow mb-2 block text-white">Instagram Handle or Email</label>
            <input
              type="text"
              required
              value={handleOrEmail}
              onChange={(e) => setHandleOrEmail(e.target.value)}
              placeholder="@aarav.creates or aarav@example.com"
              className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
            />
          </div>

          <div>
            <label className="kp-eyebrow mb-2 block text-white">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
            />
          </div>

          {errorMsg && (
            <p className="flex items-center gap-2 text-xs font-semibold text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" /> {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="kp-gradient-bg w-full rounded-xl py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] hover:brightness-110 disabled:opacity-50 transition-transform active:scale-95"
          >
            {isLoggingIn ? "Logging in..." : "Login to Dashboard →"}
          </button>
        </form>

        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Don't have an account yet?{" "}
            <Link to="/creators/join" className="font-bold text-kp-pink hover:underline">
              Apply to Network
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
