import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Database, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { initMySQLDatabase } from "@/lib/mysql-db";

export const Route = createFileRoute("/init-db")({
  head: () => ({
    meta: [
      { title: "Initialize Database — Kreative Planet" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: InitDbPage,
});

function InitDbPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const runInit = async () => {
    setStatus("loading");
    setMessage("Connecting to MySQL server (86.107.77.32)...");

    try {
      let success = false;
      try {
        const res = await fetch("/api/creators", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "init_db" }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            success = true;
            setMessage("MySQL database table 'creators' initialized successfully!");
          }
        }
      } catch (err) {
        console.warn("API route init fallback:", err);
      }

      if (!success) {
        await initMySQLDatabase();
        setMessage("MySQL database initialized via client/server fallback!");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to initialize database table.");
    }
  };

  useEffect(() => {
    runInit();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-36">
      <div className="kp-hairline w-full max-w-lg rounded-3xl bg-card/60 p-8 text-center shadow-2xl backdrop-blur-xl space-y-6">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full kp-gradient-bg shadow-[var(--glow-kp)]">
          <Database className="h-8 w-8 text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold uppercase">MySQL Database Migration</h1>
          <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">
            Host: 86.107.77.32 · Database: taskbaz3_kp
          </p>
        </div>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="h-6 w-6 animate-spin text-kp-pink" />
            <p className="text-xs font-semibold text-kp-orange">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-left space-y-2">
            <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
              <CheckCircle2 className="h-5 w-5" /> Migration Completed
            </div>
            <p className="text-xs text-foreground/80">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-left space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertCircle className="h-5 w-5" /> Initialization Error
            </div>
            <p className="text-xs text-foreground/80">{message}</p>
          </div>
        )}

        <button
          onClick={runInit}
          disabled={status === "loading"}
          className="kp-gradient-bg w-full rounded-xl py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] hover:brightness-110 disabled:opacity-50"
        >
          Re-run DB Initialization →
        </button>
      </div>
    </main>
  );
}
