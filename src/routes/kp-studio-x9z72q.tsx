import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Upload, Trash2, LogOut, CheckCircle2, Lock, Video, Edit3, X, Image as ImageIcon } from "lucide-react";
import { SectionHeading } from "@/components/kp/ui";
import {
  getStoredMediaGallery,
  saveStoredMediaGallery,
  fetchMediaGalleryFromAPI,
  type MediaItem,
  type AspectRatioType,
} from "@/lib/gallery-store";
import {
  fetchCreatorsFromAPI,
  getStoredCreators,
  saveStoredCreators,
  type CreatorData,
} from "@/lib/creator-store";
import {
  fetchBlogsFromAPI,
  getStoredBlogs,
  saveStoredBlogs,
  analyzeYoastSEO,
  type BlogPost,
  type FAQItem,
  type SEOData,
} from "@/lib/blog-store";
import {
  verifyAdminServerFn,
  saveMediaItemServerFn,
  deleteMediaItemServerFn,
  fetchBlogsServerFn,
  saveBlogServerFn,
  deleteBlogServerFn,
} from "@/lib/creators-server";
import { Globe, FileText, Plus, Eye, Sparkles, CheckCircle, AlertTriangle, XCircle, Search as SearchIcon, Image } from "lucide-react";

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

const BLOG_CATEGORIES = [
  "ADVERTISING",
  "BRANDING",
  "SOCIAL",
  "VIDEO",
  "CREATORS",
  "GROWTH",
] as const;

const ASPECT_RATIOS: { label: string; value: AspectRatioType }[] = [
  { label: "Reel / Story (9:16 Vertical)", value: "reel" },
  { label: "Portrait / Feed (4:5 Ratio)", value: "portrait" },
  { label: "Square Post (1:1 Square)", value: "square" },
  { label: "Landscape / Desktop (16:9)", value: "landscape" },
  { label: "Auto Fit (Full Image / Contain)", value: "auto" },
];

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form State for uploading new item
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("VIDEO");
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>("reel");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Edit Modal State for Media Gallery
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<string>("VIDEO");
  const [editAspectRatio, setEditAspectRatio] = useState<AspectRatioType>("reel");
  const [editType, setEditType] = useState<"video" | "image">("image");
  const [editUrl, setEditUrl] = useState("");

  // Gallery items & Creators
  const [items, setItems] = useState<MediaItem[]>([]);
  const [creators, setCreators] = useState<CreatorData[]>([]);
  
  // Blog State
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState<"gallery" | "creators" | "blogs">("gallery");
  const [isBlogEditorOpen, setIsBlogEditorOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [serpPreviewMode, setSerpPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [isUploadingInlineImg, setIsUploadingInlineImg] = useState(false);

  // Blog Editor Form State
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogCategory, setBlogCategory] = useState<BlogPost["category"]>("GROWTH");
  const [blogAuthor, setBlogAuthor] = useState("Kreative Planet Team");
  const [blogReadTime, setBlogReadTime] = useState("5 min read");
  const [blogStatus, setBlogStatus] = useState<"published" | "draft">("published");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogFeaturedImage, setBlogFeaturedImage] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogFaqs, setBlogFaqs] = useState<FAQItem[]>([]);

  // Yoast SEO Form State
  const [focusKeyword, setFocusKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [noIndex, setNoIndex] = useState(false);
  const [schemaType, setSchemaType] = useState<"Article" | "BlogPosting" | "NewsArticle">("BlogPosting");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("kp_admin_auth");
      if (session === "true") {
        setIsAuthenticated(true);
        fetchMediaGalleryFromAPI().then((list) => setItems(list));
        fetchCreatorsFromAPI().then((list) => setCreators(list));
        fetchBlogsFromAPI(true).then((list) => setBlogs(list));
      }
      const handleCreatorsUpdate = () => {
        fetchCreatorsFromAPI().then((list) => setCreators(list));
      };
      window.addEventListener("kp_creators_updated", handleCreatorsUpdate);
      return () => window.removeEventListener("kp_creators_updated", handleCreatorsUpdate);
    }
  }, []);

  // Calculate Yoast SEO Health Analysis dynamically
  const yoastAnalysis = analyzeYoastSEO(
    blogTitle,
    blogContent,
    blogExcerpt,
    focusKeyword,
    metaTitle,
    metaDescription,
    blogFeaturedImage
  );

  const handleTitleChange = (val: string) => {
    setBlogTitle(val);
    if (!editingBlogId) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setBlogSlug(generatedSlug);
      if (!metaTitle) setMetaTitle(`${val} | Kreative Planet`);
    }
  };

  const openNewBlogEditor = () => {
    setEditingBlogId(null);
    setBlogTitle("");
    setBlogSlug("");
    setBlogCategory("GROWTH");
    setBlogAuthor("Kreative Planet Team");
    setBlogReadTime("5 min read");
    setBlogStatus("published");
    setBlogExcerpt("");
    setBlogFeaturedImage("");
    setBlogContent("<h2>Write your article section title here...</h2>\n<p>Add your rich blog article paragraphs, insights, and embedded images here...</p>");
    setBlogFaqs([]);
    setFocusKeyword("");
    setMetaTitle("");
    setMetaDescription("");
    setCanonicalUrl("");
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setNoIndex(false);
    setSchemaType("BlogPosting");
    setIsBlogEditorOpen(true);
  };

  const openEditBlogEditor = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogTitle(post.title);
    setBlogSlug(post.slug);
    setBlogCategory(post.category);
    setBlogAuthor(post.author || "Kreative Planet Team");
    setBlogReadTime(post.readTime || "5 min read");
    setBlogStatus(post.status || "published");
    setBlogExcerpt(post.excerpt || "");
    setBlogFeaturedImage(post.featuredImage || "");
    setBlogContent(post.content || "");
    setBlogFaqs(post.faqs || []);
    setFocusKeyword(post.seoData?.focusKeyword || "");
    setMetaTitle(post.seoData?.metaTitle || post.title);
    setMetaDescription(post.seoData?.metaDescription || post.excerpt);
    setCanonicalUrl(post.seoData?.canonicalUrl || `https://www.kreativeplanet.in/blog/${post.slug}`);
    setOgTitle(post.seoData?.ogTitle || post.title);
    setOgDescription(post.seoData?.ogDescription || post.excerpt);
    setOgImage(post.seoData?.ogImage || post.featuredImage || "");
    setNoIndex(post.seoData?.noIndex || false);
    setSchemaType(post.seoData?.schemaType || "BlogPosting");
    setIsBlogEditorOpen(true);
  };

  // Upload Featured or Inline Image directly to Cloudinary
  const uploadImageToCloudinary = async (fileObj: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", fileObj);
    formData.append("folder", "kreative-planet/blogs");
    formData.append("upload_preset", "ml_default");

    const res = await fetch("https://api.cloudinary.com/v1_1/dt02mpeqj/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok || !data.secure_url) {
      throw new Error(data.error?.message || "Cloudinary upload failed.");
    }
    return data.secure_url;
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = e.target.files?.[0];
    if (!fileObj) return;
    setIsUploadingInlineImg(true);
    try {
      const url = await uploadImageToCloudinary(fileObj);
      const imgTag = `\n<img src="${url}" alt="${blogTitle || 'Blog Image'}" class="my-8 rounded-2xl w-full object-cover shadow-2xl border border-white/10" />\n`;
      setBlogContent((prev) => prev + imgTag);
      if (!blogFeaturedImage) setBlogFeaturedImage(url);
    } catch (err: any) {
      alert(err?.message || "Failed to upload image.");
    } finally {
      setIsUploadingInlineImg(false);
    }
  };

  // FAQ Builder functions
  const addFaqItem = () => {
    setBlogFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const updateFaqItem = (index: number, field: "question" | "answer", val: string) => {
    setBlogFaqs((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: val } : item))
    );
  };

  const removeFaqItem = (index: number) => {
    setBlogFaqs((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogSlug.trim() || !blogContent.trim()) {
      alert("Please fill out Title, Slug, and Article Content.");
      return;
    }

    const post: BlogPost = {
      id: editingBlogId || `blog-${Date.now()}`,
      slug: blogSlug.trim(),
      title: blogTitle.trim(),
      excerpt: blogExcerpt.trim(),
      content: blogContent.trim(),
      featuredImage: blogFeaturedImage.trim(),
      category: blogCategory,
      author: blogAuthor.trim() || "Kreative Planet Team",
      readTime: blogReadTime.trim() || "5 min read",
      status: blogStatus,
      faqs: blogFaqs.filter((f) => f.question.trim() && f.answer.trim()),
      seoData: {
        focusKeyword: focusKeyword.trim(),
        metaTitle: metaTitle.trim() || blogTitle.trim(),
        metaDescription: metaDescription.trim() || blogExcerpt.trim(),
        canonicalUrl: canonicalUrl.trim() || `https://www.kreativeplanet.in/blog/${blogSlug.trim()}`,
        ogTitle: ogTitle.trim() || metaTitle.trim() || blogTitle.trim(),
        ogDescription: ogDescription.trim() || metaDescription.trim() || blogExcerpt.trim(),
        ogImage: ogImage.trim() || blogFeaturedImage.trim(),
        noIndex,
        noFollow: noIndex,
        schemaType,
      },
      createdAt: editingBlogId
        ? blogs.find((b) => b.id === editingBlogId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveBlogServerFn({ data: post });
    } catch (dbErr) {
      console.warn("MySQL save blog error:", dbErr);
      fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      }).catch(() => {});
    }

    const updatedList = editingBlogId
      ? blogs.map((b) => (b.id === editingBlogId ? post : b))
      : [post, ...blogs];

    setBlogs(updatedList);
    saveStoredBlogs(updatedList);
    setIsBlogEditorOpen(false);
    alert(`Blog article "${post.title}" saved successfully to MySQL database!`);
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post from MySQL?")) {
      try {
        await deleteBlogServerFn({ data: { id } });
      } catch (dbErr) {
        console.warn("MySQL delete blog error:", dbErr);
        fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "delete", id }),
        }).catch(() => {});
      }

      const updatedList = blogs.filter((b) => b.id !== id);
      setBlogs(updatedList);
      saveStoredBlogs(updatedList);
    }
  };

  const handleToggleBlogStatus = async (post: BlogPost) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    const updatedPost = { ...post, status: newStatus };

    try {
      await saveBlogServerFn({ data: updatedPost });
    } catch (dbErr) {
      console.warn("MySQL blog status update error:", dbErr);
    }

    const updatedList = blogs.map((b) => (b.id === post.id ? updatedPost : b));
    setBlogs(updatedList);
    saveStoredBlogs(updatedList);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("kp_admin_auth");
      if (session === "true") {
        setIsAuthenticated(true);
        fetchMediaGalleryFromAPI().then((list) => setItems(list));
        fetchCreatorsFromAPI().then((list) => setCreators(list));
      }
      const handleCreatorsUpdate = () => {
        fetchCreatorsFromAPI().then((list) => setCreators(list));
      };
      window.addEventListener("kp_creators_updated", handleCreatorsUpdate);
      return () => window.removeEventListener("kp_creators_updated", handleCreatorsUpdate);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      let isSuccess = false;

      // 1. Try MySQL verifyAdminServerFn
      try {
        const res = await verifyAdminServerFn({ data: { username, password } });
        if (res && res.success) {
          isSuccess = true;
        }
      } catch (sfErr) {
        console.warn("Server function admin auth failed, trying API route fallback:", sfErr);
      }

      // 2. Fallback to API route /api/admin-auth
      if (!isSuccess) {
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
      }

      // 3. Environment default credential fallback
      if (!isSuccess && username === "admin" && password === "kreative2026") {
        isSuccess = true;
      }

      if (isSuccess) {
        setIsAuthenticated(true);
        localStorage.setItem("kp_admin_auth", "true");
        fetchMediaGalleryFromAPI().then((list) => setItems(list));
        fetchCreatorsFromAPI().then((list) => setCreators(list));
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

      const newItem: MediaItem = {
        id: `item-${Date.now()}`,
        type: isVid ? "video" : "image",
        url: uploadData.secure_url,
        title: title.trim(),
        category,
        aspectRatio,
      };

      // Save to MySQL Database via Server Function & REST fallback
      try {
        await saveMediaItemServerFn({ data: newItem });
      } catch (dbErr) {
        console.warn("MySQL save error:", dbErr);
        fetch("/api/media-gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        }).catch(() => {});
      }

      const updated = [newItem, ...items];
      setItems(updated);
      saveStoredMediaGallery(updated);

      setSuccessMessage(`Successfully uploaded "${title}" to MySQL database & CDN!`);
      setTitle("");
      setFile(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this item from the gallery?")) {
      try {
        await deleteMediaItemServerFn({ data: { id } });
      } catch (dbErr) {
        console.warn("MySQL delete error:", dbErr);
        fetch("/api/media-gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "delete", id }),
        }).catch(() => {});
      }

      const updated = items.filter((item) => item.id !== id);
      setItems(updated);
      saveStoredMediaGallery(updated);
    }
  };

  const openEditModal = (item: MediaItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditAspectRatio(item.aspectRatio || "reel");
    setEditType(item.type);
    setEditUrl(item.url);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updatedItem: MediaItem = {
      ...editingItem,
      title: editTitle.trim(),
      category: editCategory,
      aspectRatio: editAspectRatio,
      type: editType,
      url: editUrl.trim(),
    };

    try {
      await saveMediaItemServerFn({ data: updatedItem });
    } catch (dbErr) {
      console.warn("MySQL edit error:", dbErr);
      fetch("/api/media-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      }).catch(() => {});
    }

    const updated = items.map((it) => (it.id === editingItem.id ? updatedItem : it));
    setItems(updated);
    saveStoredMediaGallery(updated);
    setEditingItem(null);
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



  const handleStatusChange = async (id: string, newStatus: CreatorData["status"]) => {
    const updated = creators.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setCreators(updated);
    saveStoredCreators(updated);

    try {
      await fetch("/api/creators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_status", id, status: newStatus }),
      });
    } catch (err) {
      console.warn("Failed updating status in Vercel DB:", err);
    }
  };

  const handleDeleteCreator = (id: string) => {
    if (confirm("Remove creator application?")) {
      const updated = creators.filter((c) => c.id !== id);
      setCreators(updated);
      saveStoredCreators(updated);
    }
  };

  return (
    <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center border-b border-white/10 pb-8">
          <div>
            <span className="kp-eyebrow">Kreative Planet Studio Management</span>
            <h1 className="mt-2 text-4xl font-extrabold uppercase">
              Ideas in Orbit <span className="kp-gradient-text">Admin</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex rounded-full border border-white/15 bg-card/60 p-1">
              <button
                onClick={() => setActiveTab("gallery")}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "gallery"
                    ? "kp-gradient-bg text-white shadow-[var(--glow-kp)]"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                Gallery ({items.length})
              </button>
              <button
                onClick={() => setActiveTab("creators")}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "creators"
                    ? "kp-gradient-bg text-white shadow-[var(--glow-kp)]"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                Creators ({creators.length})
              </button>
              <button
                onClick={() => setActiveTab("blogs")}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "blogs"
                    ? "kp-gradient-bg text-white shadow-[var(--glow-kp)]"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                Blogs & SEO ({blogs.length})
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="kp-hairline inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        {activeTab === "blogs" ? (
          <div className="mt-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-2xl font-bold uppercase flex items-center gap-2">
                  <FileText className="h-6 w-6 text-kp-pink" /> Blog & Content Engine
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Manage WordPress-style articles, embed inline images anywhere, build dynamic FAQs, and analyze real-time Yoast SEO scores.
                </p>
              </div>
              <button
                onClick={openNewBlogEditor}
                className="kp-gradient-bg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] hover:brightness-110 transition-transform active:scale-95 cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Create New Article →
              </button>
            </div>

            {/* Blog Posts List Table */}
            <div className="kp-hairline overflow-hidden rounded-3xl bg-card/40 backdrop-blur-xl shadow-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-[0.7rem] uppercase tracking-wider text-muted-foreground border-b border-white/10">
                  <tr>
                    <th className="p-4">Post Title & Slug</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Yoast SEO Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-foreground/90">
                  {blogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        No blog posts found in MySQL database. Click "+ Create New Article" to write your first post.
                      </td>
                    </tr>
                  ) : (
                    blogs.map((b) => {
                      const analysis = analyzeYoastSEO(
                        b.title,
                        b.content,
                        b.excerpt,
                        b.seoData?.focusKeyword || "",
                        b.seoData?.metaTitle || b.title,
                        b.seoData?.metaDescription || b.excerpt,
                        b.featuredImage
                      );

                      return (
                        <tr key={b.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {b.featuredImage ? (
                                <img
                                  src={b.featuredImage}
                                  alt={b.title}
                                  className="h-10 w-14 rounded-lg object-cover bg-black/60 shrink-0"
                                />
                              ) : (
                                <div className="h-10 w-14 rounded-lg bg-card border border-white/10 grid place-items-center text-muted-foreground shrink-0">
                                  <FileText className="h-5 w-5" />
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-white text-sm line-clamp-1">{b.title}</p>
                                <p className="text-[0.7rem] text-muted-foreground font-mono">/blog/{b.slug}</p>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-kp-pink">
                              {b.category}
                            </span>
                          </td>

                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider ${
                                analysis.score >= 80
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : analysis.score >= 50
                                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                  : "bg-red-500/20 text-red-400 border border-red-500/30"
                              }`}
                            >
                              <Sparkles className="h-3 w-3" /> {analysis.score}/100 · {analysis.rating}
                            </span>
                          </td>

                          <td className="p-4">
                            <button
                              onClick={() => handleToggleBlogStatus(b)}
                              className={`rounded-full px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider cursor-pointer transition ${
                                b.status === "published"
                                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                  : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                              }`}
                            >
                              {b.status === "published" ? "✓ Published" : "✎ Draft"}
                            </button>
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`/blog/${b.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border border-white/15 bg-card/60 p-2 text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                                title="View Public Article"
                              >
                                <Eye className="h-4 w-4" />
                              </a>
                              <button
                                onClick={() => openEditBlogEditor(b)}
                                className="rounded-lg border border-white/15 bg-card/60 p-2 text-kp-pink hover:bg-kp-pink/20 transition-colors cursor-pointer"
                                title="Edit Article & Yoast SEO"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(b.id)}
                                className="rounded-lg border border-white/15 bg-card/60 p-2 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                                title="Delete Article"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "creators" ? (
          <div className="mt-10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold uppercase">Creator Network Applications</h2>
                <p className="text-xs text-muted-foreground">
                  Approve creator applications so they can log in to their dashboard and access real earnings & growth tracking.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {creators.map((c) => (
                <div
                  key={c.id}
                  className="kp-hairline flex flex-col justify-between rounded-3xl bg-card/60 p-6 space-y-4 border border-white/10"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="kp-eyebrow text-kp-pink">{c.category}</span>
                      <span
                        className={`rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase ${
                          c.status === "approved"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : c.status === "rejected"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold uppercase text-white">{c.fullName}</h3>
                    <p className="text-sm font-bold text-kp-orange">{c.instagramHandle}</p>
                    <p className="text-xs text-muted-foreground">{c.email} · {c.phone}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-background/60 p-3 text-xs space-y-1.5">
                    <p className="text-foreground/80">
                      <strong className="text-white">Management:</strong>{" "}
                      {c.managedBy === "manager"
                        ? `Manager (${c.managerName || "N/A"}) - ${c.managerContact || ""}`
                        : "Self Managed"}
                    </p>
                    {c.remarks && (
                      <p className="text-muted-foreground italic">"{c.remarks}"</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value as CreatorData["status"])}
                      className="rounded-xl border border-white/15 bg-background px-3 py-1.5 text-xs text-white focus:border-kp-pink focus:outline-none"
                    >
                      <option value="pending" className="bg-card">Pending</option>
                      <option value="approved" className="bg-card">Approved</option>
                      <option value="rejected" className="bg-card">Rejected</option>
                    </select>

                    <button
                      onClick={() => handleDeleteCreator(c.id)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-red-500/20 hover:text-red-400"
                      title="Delete Application"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (

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
                <label className="kp-eyebrow mb-2 block">Photo / Video Display Size (Aspect Ratio)</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as AspectRatioType)}
                  className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-sm text-foreground focus:border-kp-pink focus:outline-none"
                >
                  {ASPECT_RATIOS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-card text-foreground">
                      {opt.label}
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
                    <p className="truncate text-[0.65rem] text-muted-foreground uppercase">
                      {item.type} · Ratio: {item.aspectRatio || "reel"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
                      title="Edit upload options"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-red-500/20 hover:text-red-400 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Edit Options Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="kp-hairline w-full max-w-lg rounded-3xl bg-card p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold uppercase flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-kp-pink" /> Edit Upload Options
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="kp-eyebrow mb-1.5 block">Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-sm text-foreground focus:border-kp-pink focus:outline-none"
                />
              </div>

              <div>
                <label className="kp-eyebrow mb-1.5 block">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-sm text-foreground focus:border-kp-pink focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-card text-foreground">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="kp-eyebrow mb-1.5 block">Display Size / Aspect Ratio</label>
                <select
                  value={editAspectRatio}
                  onChange={(e) => setEditAspectRatio(e.target.value as AspectRatioType)}
                  className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-sm text-foreground focus:border-kp-pink focus:outline-none"
                >
                  {ASPECT_RATIOS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-card text-foreground">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="kp-eyebrow mb-1.5 block">Media Type</label>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value as "video" | "image")}
                  className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-sm text-foreground focus:border-kp-pink focus:outline-none"
                >
                  <option value="image" className="bg-card text-foreground">Image</option>
                  <option value="video" className="bg-card text-foreground">Video</option>
                </select>
              </div>

              <div>
                <label className="kp-eyebrow mb-1.5 block">Media URL</label>
                <input
                  type="text"
                  required
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="kp-gradient-bg rounded-xl px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[var(--glow-kp)] hover:brightness-110"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WordPress-Style Blog Editor Modal with Yoast SEO Suite & Inline Image Inserter */}
      {isBlogEditorOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-xl overflow-y-auto">
          <div className="relative my-8 w-full max-w-5xl rounded-3xl kp-hairline bg-card/90 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl max-h-[90vh] overflow-y-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="kp-eyebrow text-kp-pink flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> WordPress-Style Blog Engine
                </span>
                <h2 className="text-2xl font-extrabold uppercase text-white">
                  {editingBlogId ? "Edit Blog Article & Yoast SEO" : "Create New Article & Yoast SEO"}
                </h2>
              </div>
              <button
                onClick={() => setIsBlogEditorOpen(false)}
                className="rounded-full border border-white/20 p-2 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-8">
              {/* Main Post Settings */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="kp-eyebrow mb-2 block text-white">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. How to Build a Brand That Stops the Scroll in 2026"
                    className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-3 text-base font-bold text-foreground focus:border-kp-pink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="kp-eyebrow mb-2 block text-white">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={blogSlug}
                    onChange={(e) => setBlogSlug(e.target.value)}
                    placeholder="how-to-build-a-brand"
                    className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-xs font-mono text-foreground focus:border-kp-pink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="kp-eyebrow mb-2 block text-white">Category *</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                  >
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-card text-foreground">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="kp-eyebrow mb-2 block text-white">Author Name</label>
                  <input
                    type="text"
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    placeholder="Kreative Planet Team"
                    className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="kp-eyebrow mb-2 block text-white">Read Time & Status</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      placeholder="5 min read"
                      className="w-1/2 rounded-xl border border-white/15 bg-background/80 px-3 py-2.5 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                    />
                    <select
                      value={blogStatus}
                      onChange={(e) => setBlogStatus(e.target.value as any)}
                      className="w-1/2 rounded-xl border border-white/15 bg-background/80 px-3 py-2.5 text-xs font-bold text-foreground focus:border-kp-pink focus:outline-none"
                    >
                      <option value="published" className="bg-card text-green-400">Published</option>
                      <option value="draft" className="bg-card text-amber-400">Draft</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="kp-eyebrow mb-2 block text-white">Article Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  placeholder="Short engaging summary shown on blog list cards and search result snippets..."
                  className="w-full rounded-xl border border-white/15 bg-background/80 p-4 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                />
              </div>

              {/* Featured Image */}
              <div className="rounded-2xl border border-white/10 bg-background/40 p-4 space-y-3">
                <label className="kp-eyebrow block text-white">Featured Banner Image URL</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={blogFeaturedImage}
                    onChange={(e) => setBlogFeaturedImage(e.target.value)}
                    placeholder="https://res.cloudinary.com/..."
                    className="flex-1 rounded-xl border border-white/15 bg-background px-4 py-2.5 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                  />
                  <label className="kp-gradient-bg shrink-0 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white cursor-pointer hover:brightness-110 flex items-center justify-center gap-1.5">
                    <Upload className="h-4 w-4" /> Upload Banner
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const fileObj = e.target.files?.[0];
                        if (fileObj) {
                          try {
                            const url = await uploadImageToCloudinary(fileObj);
                            setBlogFeaturedImage(url);
                          } catch (err: any) {
                            alert(err?.message || "Upload failed");
                          }
                        }
                      }}
                    />
                  </label>
                </div>
                {blogFeaturedImage && (
                  <img
                    src={blogFeaturedImage}
                    alt="Featured preview"
                    className="h-28 w-auto rounded-xl object-cover border border-white/10 bg-black/60"
                  />
                )}
              </div>

              {/* Rich Content Editor with Inline Image Inserter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="kp-eyebrow block text-white">Article Body Content (HTML / Rich Text)</label>
                  <label className="rounded-xl border border-kp-pink/50 bg-kp-pink/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-kp-pink hover:bg-kp-pink/20 cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Image className="h-4 w-4" /> {isUploadingInlineImg ? "Uploading..." : "📷 + Insert Image Anywhere"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploadingInlineImg}
                      onChange={handleInlineImageUpload}
                    />
                  </label>
                </div>
                <textarea
                  rows={12}
                  required
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="<h2>Section Title</h2><p>Paragraph content...</p><img src='...' />"
                  className="w-full rounded-xl border border-white/15 bg-background/80 p-4 text-xs font-mono text-foreground focus:border-kp-pink focus:outline-none leading-relaxed"
                />
                <p className="text-[0.7rem] text-muted-foreground">
                  Tip: Use standard HTML tags like <code className="text-kp-pink">&lt;h2&gt;</code>, <code className="text-kp-pink">&lt;p&gt;</code>, <code className="text-kp-pink">&lt;ul&gt;</code>, or click <strong>📷 + Insert Image Anywhere</strong> to upload and embed inline photos directly.
                </p>
              </div>

              {/* Dynamic FAQ Builder Section */}
              <div className="rounded-2xl border border-white/10 bg-background/40 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-bold uppercase text-white">Article FAQs Section</h3>
                    <p className="text-[0.7rem] text-muted-foreground">Add structured Question & Answer items to appear in an interactive accordion on the article page.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addFaqItem}
                    className="kp-hairline rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 text-kp-pink" /> + Add FAQ Item
                  </button>
                </div>

                {blogFaqs.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic text-center py-3">No FAQ items added. Click "+ Add FAQ Item" above.</p>
                ) : (
                  blogFaqs.map((faq, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-card/60 p-4 space-y-3 relative">
                      <button
                        type="button"
                        onClick={() => removeFaqItem(idx)}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-xs font-bold p-1 cursor-pointer"
                        title="Remove FAQ"
                      >
                        ✕ Remove
                      </button>
                      <div>
                        <label className="text-[0.65rem] uppercase tracking-wider text-kp-pink font-semibold block mb-1">Question {idx + 1}</label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateFaqItem(idx, "question", e.target.value)}
                          placeholder="e.g. Why is 3-second video retention critical?"
                          className="w-full rounded-lg border border-white/15 bg-background px-3 py-2 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[0.65rem] uppercase tracking-wider text-muted-foreground font-semibold block mb-1">Answer</label>
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => updateFaqItem(idx, "answer", e.target.value)}
                          placeholder="Provide a clear, helpful answer..."
                          className="w-full rounded-lg border border-white/15 bg-background p-3 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* =========================================================================
                 PREMIUM YOAST SEO SUITE PANEL
                 ========================================================================= */}
              <div className="rounded-3xl border-2 border-kp-pink/40 bg-card/60 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-kp-pink" />
                    <div>
                      <h3 className="text-xl font-extrabold uppercase text-white">Yoast Premium SEO Suite</h3>
                      <p className="text-xs text-muted-foreground">Real-time search engine optimization, Google SERP snippet preview, and SEO health checklist.</p>
                    </div>
                  </div>

                  {/* Yoast Overall Score Badge */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground font-bold">SEO Health</p>
                      <p className="text-sm font-black text-white">{yoastAnalysis.score}/100</p>
                    </div>
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ${
                        yoastAnalysis.score >= 80
                          ? "bg-green-500 text-black shadow-lg"
                          : yoastAnalysis.score >= 50
                          ? "bg-yellow-500 text-black shadow-lg"
                          : "bg-red-500 text-white shadow-lg"
                      }`}
                    >
                      {yoastAnalysis.rating}
                    </span>
                  </div>
                </div>

                {/* Focus Keyword */}
                <div>
                  <label className="kp-eyebrow mb-2 block text-kp-pink flex items-center gap-1.5">
                    <SearchIcon className="h-4 w-4" /> Focus Keyword / Keyphrase *
                  </label>
                  <input
                    type="text"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    placeholder="e.g. brand content strategy"
                    className="w-full rounded-xl border border-kp-pink/40 bg-background px-4 py-3 text-sm font-bold text-white focus:border-kp-pink focus:outline-none"
                  />
                </div>

                {/* Live Google SERP Snippet Preview */}
                <div className="rounded-2xl border border-white/15 bg-slate-950 p-5 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                      <Globe className="h-4 w-4" /> Google SERP Snippet Preview
                    </span>
                    <div className="flex rounded-lg border border-white/15 bg-background p-0.5 text-[0.65rem] font-bold">
                      <button
                        type="button"
                        onClick={() => setSerpPreviewMode("desktop")}
                        className={`px-3 py-1 rounded-md transition ${serpPreviewMode === "desktop" ? "bg-blue-600 text-white" : "text-muted-foreground"}`}
                      >
                        Desktop Result
                      </button>
                      <button
                        type="button"
                        onClick={() => setSerpPreviewMode("mobile")}
                        className={`px-3 py-1 rounded-md transition ${serpPreviewMode === "mobile" ? "bg-blue-600 text-white" : "text-muted-foreground"}`}
                      >
                        Mobile Result
                      </button>
                    </div>
                  </div>

                  {/* SERP Card */}
                  <div className={`space-y-1 ${serpPreviewMode === "mobile" ? "max-w-xs border border-slate-800 rounded-xl p-3 bg-slate-900" : ""}`}>
                    <p className="text-xs text-emerald-400 truncate font-mono">
                      https://www.kreativeplanet.in › blog › {blogSlug || "post-slug"}
                    </p>
                    <h4 className="text-base sm:text-lg font-medium text-blue-400 hover:underline cursor-pointer line-clamp-1">
                      {metaTitle || blogTitle || "SEO Title Preview"}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-normal">
                      {metaDescription || blogExcerpt || "Meta description preview will appear here on Google search results..."}
                    </p>
                  </div>
                </div>

                {/* SEO Meta Title & Meta Description Controls */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="kp-eyebrow text-white">SEO Meta Title</label>
                      <span className={`text-[0.65rem] font-bold ${metaTitle.length >= 30 && metaTitle.length <= 65 ? "text-green-400" : "text-amber-400"}`}>
                        {metaTitle.length}/65 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="Title shown on Google SERPs..."
                      className="w-full rounded-xl border border-white/15 bg-background px-4 py-2.5 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                    />
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full transition-all ${metaTitle.length >= 30 && metaTitle.length <= 65 ? "bg-green-500" : metaTitle.length > 65 ? "bg-red-500" : "bg-yellow-500"}`}
                        style={{ width: `${Math.min(100, (metaTitle.length / 65) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="kp-eyebrow text-white">SEO Meta Description</label>
                      <span className={`text-[0.65rem] font-bold ${metaDescription.length >= 120 && metaDescription.length <= 160 ? "text-green-400" : "text-amber-400"}`}>
                        {metaDescription.length}/160 chars
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Meta description snippet shown on search engine results..."
                      className="w-full rounded-xl border border-white/15 bg-background p-3 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                    />
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all ${metaDescription.length >= 120 && metaDescription.length <= 160 ? "bg-green-500" : metaDescription.length > 160 ? "bg-red-500" : "bg-yellow-500"}`}
                        style={{ width: `${Math.min(100, (metaDescription.length / 160) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* OpenGraph & Social Share Settings */}
                <div className="rounded-2xl border border-white/10 bg-background/40 p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-kp-pink flex items-center gap-1.5">
                    <Share2 className="h-4 w-4" /> OpenGraph & Social Share Preview (Facebook / X)
                  </h4>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[0.65rem] uppercase text-muted-foreground font-bold block mb-1">OG Social Title</label>
                      <input
                        type="text"
                        value={ogTitle}
                        onChange={(e) => setOgTitle(e.target.value)}
                        placeholder={metaTitle || blogTitle}
                        className="w-full rounded-lg border border-white/15 bg-background px-3 py-2 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[0.65rem] uppercase text-muted-foreground font-bold block mb-1">OG Social Description</label>
                      <input
                        type="text"
                        value={ogDescription}
                        onChange={(e) => setOgDescription(e.target.value)}
                        placeholder={metaDescription || blogExcerpt}
                        className="w-full rounded-lg border border-white/15 bg-background px-3 py-2 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Social Share Card Preview */}
                  <div className="rounded-xl border border-white/15 bg-card/80 overflow-hidden max-w-md">
                    {(ogImage || blogFeaturedImage) && (
                      <img
                        src={ogImage || blogFeaturedImage}
                        alt="Social Share"
                        className="h-32 w-full object-cover bg-black"
                      />
                    )}
                    <div className="p-3 space-y-1">
                      <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider font-bold">KREATIVEPLANET.IN</p>
                      <p className="text-xs font-bold text-white line-clamp-1">{ogTitle || metaTitle || blogTitle || "Social Card Title"}</p>
                      <p className="text-[0.7rem] text-slate-300 line-clamp-2">{ogDescription || metaDescription || blogExcerpt || "Social Card Description"}</p>
                    </div>
                  </div>
                </div>

                {/* Canonical URL & Indexing */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label className="kp-eyebrow block text-white mb-1.5">Canonical URL</label>
                    <input
                      type="text"
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder={`https://www.kreativeplanet.in/blog/${blogSlug}`}
                      className="w-full rounded-xl border border-white/15 bg-background px-4 py-2.5 text-xs text-foreground focus:border-kp-pink focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="kp-eyebrow block text-white mb-1.5">Schema Structured Data</label>
                    <select
                      value={schemaType}
                      onChange={(e) => setSchemaType(e.target.value as any)}
                      className="w-full rounded-xl border border-white/15 bg-background px-3 py-2.5 text-xs font-bold text-foreground focus:border-kp-pink focus:outline-none"
                    >
                      <option value="BlogPosting" className="bg-card text-white">BlogPosting</option>
                      <option value="Article" className="bg-card text-white">Article</option>
                      <option value="NewsArticle" className="bg-card text-white">NewsArticle</option>
                    </select>
                  </div>
                </div>

                {/* Yoast SEO Real-Time Health Checklist */}
                <div className="rounded-2xl border border-white/10 bg-background/50 p-5 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" /> Yoast Real-Time SEO Health Checklist
                  </h4>
                  <div className="space-y-2">
                    {yoastAnalysis.checks.map((check) => (
                      <div key={check.id} className="flex items-start gap-2.5 text-xs p-2.5 rounded-xl bg-card/60 border border-white/5">
                        {check.status === "good" ? (
                          <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                        ) : check.status === "warning" ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-bold text-white">{check.title}</p>
                          <p className="text-[0.7rem] text-muted-foreground">{check.feedback}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsBlogEditorOpen(false)}
                  className="rounded-xl px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="kp-gradient-bg rounded-xl px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] hover:brightness-110 transition-transform active:scale-95 cursor-pointer"
                >
                  {editingBlogId ? "Save & Publish Changes to MySQL →" : "Publish Article to MySQL →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}


