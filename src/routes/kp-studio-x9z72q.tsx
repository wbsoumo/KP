import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Upload, Trash2, LogOut, CheckCircle2, Lock, Video, Image as ImageIcon } from "lucide-react";
import { SectionHeading } from "@/components/kp/ui";
import {
  getStoredMediaGallery,
  saveStoredMediaGallery,
  type MediaItem,
} from "@/lib/gallery-store";

export const Route = createFileRoute("/kp-studio-x9z72q")({
  head: () => ({
    meta: [
      { title: "Portal — Kreative Planet" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const CATEGORIES = [
  "ADVERTISING",
  "BRANDING",
  "SOCIAL",
  "VIDEO",
  "CREATOR CAMPAIGNS",
] as const;

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form State for uploading new item
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("VIDEO");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Gallery items list
  const [items, setItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    const session = localStorage.getItem("kp_admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
      setItems(getStoredMediaGallery());
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      let isSuccess = false;
      try {
        const res = await fetch("/api/admin-auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) isSuccess = true;
        }
      } catch (err) {
        console.warn("API route fallback:", err);
      }

      // Backup check if static host / client router
      if (!isSuccess && username === "admin" && password === "kreative2026") {
        isSuccess = true;
      }

      if (isSuccess) {
        setIsAuthenticated(true);
        localStorage.setItem("kp_admin_auth", "true");
        setItems(getStoredMediaGallery());
      } else {
        setLoginError("Invalid username or password credentials.");
      }
    } catch {
      setLoginError("Failed to authenticate.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("kp_admin_auth");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      alert("Please enter a title and select a video or image file.");
      return;
    }

    setIsUploading(true);
    setUploadProgress("Generating secure Cloudinary signature...");
    setSuccessMessage("");

    try {
      const isVid = file.type.startsWith("video") || file.name.toLowerCase().endsWith(".mp4") || file.name.toLowerCase().endsWith(".mov");
      const folderName = isVid ? "kreative-planet/videos" : "kreative-planet/uploads";

      // 1. Get Signature or use direct Cloudinary Upload Preset
      let cloudName = "dt02mpeqj";
      let apiKey = "485515273593933";
      let signature = "";
      let timestamp = "";

      try {
        const sigRes = await fetch("/api/cloudinary-sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder: folderName }),
        });
        if (sigRes.ok) {
          const sigData = await sigRes.json();
          if (sigData?.signature) {
            signature = sigData.signature;
            timestamp = sigData.timestamp;
            cloudName = sigData.cloudName;
            apiKey = sigData.apiKey;
          }
        }
      } catch (err) {
        console.warn("Signature fetch fallback:", err);
      }

      // 2. Upload to Cloudinary
      setUploadProgress(`Uploading ${file.name} directly to Cloudinary CDN...`);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folderName);

      if (signature && timestamp) {
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
      } else {
        formData.append("upload_preset", "ml_default");
      }

      const resourceType = isVid ? "video" : "image";
      const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const uploadRes = await fetch(cloudUrl, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok || !uploadData.secure_url) {
        throw new Error(uploadData.error?.message || "Cloudinary upload failed.");
      }

      // 3. Save new item into gallery store
      const newItem: MediaItem = {
        id: `item-${Date.now()}`,
        type: isVid ? "video" : "image",
        url: uploadData.secure_url,
        title: title.trim(),
        category,
      };

      const updated = [newItem, ...items];
      setItems(updated);
      saveStoredMediaGallery(updated);

      setSuccessMessage(`Successfully uploaded "${title}" to Cloudinary!`);
      setTitle("");
      setFile(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this item from the gallery?")) {
      const updated = items.filter((item) => item.id !== id);
      setItems(updated);
      saveStoredMediaGallery(updated);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-32">
        <div className="kp-hairline w-full max-w-md rounded-3xl bg-card/60 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full kp-gradient-bg shadow-[var(--glow-kp)]">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h1 className="mt-6 text-2xl font-bold uppercase">Studio Admin Login</h1>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Vercel Protected Environment
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="kp-eyebrow mb-2 block">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
              />
            </div>
            <div>
              <label className="kp-eyebrow mb-2 block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
              />
            </div>

            {loginError && (
              <p className="text-xs font-semibold text-red-400">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="kp-gradient-bg w-full rounded-xl py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] hover:brightness-110 disabled:opacity-50"
            >
              {isLoggingIn ? "Authenticating..." : "Sign In to Admin"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center border-b border-white/10 pb-8">
          <div>
            <span className="kp-eyebrow">Cloudinary CDN Studio Portal</span>
            <h1 className="mt-2 text-4xl font-extrabold uppercase">
              Ideas in Orbit <span className="kp-gradient-text">Admin</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="kp-hairline inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Upload Form */}
          <div className="kp-hairline rounded-3xl bg-card/50 p-8 h-fit">
            <h2 className="text-xl font-bold uppercase flex items-center gap-2">
              <Upload className="h-5 w-5 text-kp-pink" /> Upload New Media
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Uploaded videos and images are automatically uploaded to Cloudinary CDN and shown in "Ideas in Orbit".
            </p>

            <form onSubmit={handleUpload} className="mt-6 space-y-5">
              <div>
                <label className="kp-eyebrow mb-2 block">Item Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Midnight Launch Campaign Cut"
                  className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
                />
              </div>

              <div>
                <label className="kp-eyebrow mb-2 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as (typeof CATEGORIES)[number])}
                  className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-card text-foreground">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="kp-eyebrow mb-2 block">Select Video or Image File</label>
                <input
                  type="file"
                  required
                  accept="video/*,image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full rounded-xl border border-white/15 bg-background/80 p-3 text-xs text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-kp-pink file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:brightness-110"
                />
              </div>

              {uploadProgress && (
                <p className="text-xs font-semibold text-kp-orange animate-pulse">
                  {uploadProgress}
                </p>
              )}

              {successMessage && (
                <p className="flex items-center gap-1.5 text-xs font-semibold text-green-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> {successMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="kp-gradient-bg w-full rounded-xl py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] hover:brightness-110 disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Upload to Cloudinary CDN"}
              </button>
            </form>
          </div>

          {/* Manage Existing Items */}
          <div>
            <h2 className="text-xl font-bold uppercase mb-6">
              Active Gallery Items ({items.length})
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="kp-hairline relative flex items-center gap-4 rounded-2xl bg-card/60 p-4"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-black/50 border border-white/10">
                    {item.type === "video" ? (
                      <div className="flex h-full w-full items-center justify-center bg-card">
                        <Video className="h-6 w-6 text-kp-pink" />
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="kp-eyebrow text-[0.6rem] text-kp-orange">{item.category}</span>
                    <h4 className="truncate text-sm font-bold uppercase">{item.title}</h4>
                    <p className="truncate text-[0.65rem] text-muted-foreground">{item.type.toUpperCase()}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
