import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Clock, ArrowRight, BookOpen, Sparkles, User } from "lucide-react";
import { fetchBlogsFromAPI, getStoredBlogs, type BlogPost } from "@/lib/blog-store";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog & Insights — Kreative Planet" },
      {
        name: "description",
        content: "Explore actionable insights on creative advertising, vertical video growth, brand positioning, and digital content engines.",
      },
      { property: "og:title", content: "Blog & Insights — Kreative Planet" },
      {
        property: "og:description",
        content: "Actionable guides on branding, advertising, short-form video reels, and organic growth.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogListingPage,
});

const CATEGORIES = ["ALL", "ADVERTISING", "BRANDING", "SOCIAL", "VIDEO", "CREATORS", "GROWTH"] as const;

function BlogListingPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(() =>
    getStoredBlogs().filter((b) => b.status === "published")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("ALL");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogsFromAPI(false).then((list) => {
      const activeList = list && list.length > 0 ? list : getStoredBlogs();
      setBlogs(activeList.filter((b) => b.status === "published"));
      setLoading(false);
    });
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = activeCategory === "ALL" || blog.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredBlogs[0];
  const gridPosts = filteredBlogs.slice(1);

  return (
    <main className="px-5 pb-20 pt-24 md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <Reveal>
            <span className="kp-eyebrow text-kp-pink flex items-center justify-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Kreative Planet Journal
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-[0.92] tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
              INSIGHTS <span className="kp-gradient-text">WITHOUT GRAVITY</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
              Strategy, vertical video production secrets, brand positionings, and digital content engines engineered for growth.
            </p>
          </Reveal>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-6 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, strategies, keyphrases..."
              className="w-full rounded-2xl border border-white/15 bg-card/60 pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-kp-pink focus:outline-none backdrop-blur-md shadow-xl transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "kp-gradient-bg text-white shadow-[var(--glow-kp)] scale-105"
                    : "kp-hairline text-foreground/70 hover:text-foreground hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-20 text-center py-20 text-muted-foreground flex flex-col items-center gap-3">
            <BookOpen className="h-8 w-8 animate-pulse text-kp-pink" />
            <p className="text-xs uppercase tracking-widest font-semibold">Loading Articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="mt-20 text-center py-20 kp-hairline rounded-3xl bg-card/40 backdrop-blur-md max-w-md mx-auto space-y-3">
            <p className="text-lg font-bold text-white">No matching articles found</p>
            <p className="text-xs text-muted-foreground">Try adjusting your search query or switching category filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("ALL");
              }}
              className="mt-4 kp-gradient-bg px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
            >
              Reset Filters →
            </button>
          </div>
        ) : (
          <div className="mt-16 space-y-16">
            {/* Featured Post Card */}
            {featuredPost && (
              <Reveal>
                <article className="group relative overflow-hidden rounded-3xl kp-hairline bg-card/50 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-kp-pink/50">
                  <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-8 p-6 sm:p-10">
                    {/* Featured Image */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/60">
                      <img
                        src={featuredPost.featuredImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 rounded-full kp-gradient-bg px-3.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-lg">
                        Featured · {featuredPost.category}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="flex flex-col justify-between space-y-5">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold">
                        <span className="flex items-center gap-1.5 text-kp-pink">
                          <User className="h-3.5 w-3.5" /> {featuredPost.author}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl font-extrabold uppercase leading-tight text-white sm:text-3xl lg:text-4xl group-hover:text-kp-pink transition-colors">
                        <Link to={`/blog/${featuredPost.slug}` as any}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div>
                        <Link
                          to={`/blog/${featuredPost.slug}` as any}
                          className="kp-gradient-bg inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] group-hover:brightness-110 transition-transform active:scale-95"
                        >
                          Read Full Article <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )}

            {/* Grid of Remaining Posts */}
            {gridPosts.length > 0 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((blog, idx) => (
                  <Reveal key={blog.id} delay={(idx % 3) * 100}>
                    <article className="group relative flex flex-col h-full overflow-hidden rounded-3xl kp-hairline bg-card/40 p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-kp-pink/50">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/60">
                        <img
                          src={blog.featuredImage || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"}
                          alt={blog.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-background/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-kp-pink backdrop-blur-md">
                          {blog.category}
                        </span>
                      </div>

                      <div className="mt-5 flex flex-col flex-1 justify-between space-y-4">
                        <div>
                          <div className="flex items-center gap-3 text-[0.7rem] text-muted-foreground font-semibold">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {blog.readTime}
                            </span>
                            <span>·</span>
                            <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          </div>

                          <h3 className="mt-3 text-xl font-bold uppercase leading-snug text-white group-hover:text-kp-pink transition-colors">
                            <Link to={`/blog/${blog.slug}` as any}>
                              {blog.title}
                            </Link>
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                            {blog.excerpt}
                          </p>
                        </div>

                        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                          <span className="text-[0.7rem] font-semibold text-white/70">{blog.author}</span>
                          <Link
                            to={`/blog/${blog.slug}` as any}
                            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-kp-pink group-hover:translate-x-1 transition-transform"
                          >
                            Read →
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
