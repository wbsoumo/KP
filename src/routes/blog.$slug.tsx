import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Clock, User, ArrowLeft, Share2, Check, HelpCircle, ChevronDown, BookOpen } from "lucide-react";
import { fetchBlogBySlugServerFn } from "@/lib/creators-server";
import { getStoredBlogs, type BlogPost } from "@/lib/blog-store";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }: any) => {
    const blog: BlogPost | null = loaderData?.blog || null;
    const title = blog?.seoData?.metaTitle || blog?.title || "Blog Post — Kreative Planet";
    const description = blog?.seoData?.metaDescription || blog?.excerpt || "Actionable creative growth insights from Kreative Planet.";
    const ogImage = blog?.seoData?.ogImage || blog?.featuredImage || "";
    const canonical = blog?.seoData?.canonicalUrl || (blog ? `https://www.kreativeplanet.in/blog/${blog.slug}` : "");

    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...(blog?.seoData?.noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
        { property: "og:title", content: blog?.seoData?.ogTitle || title },
        { property: "og:description", content: blog?.seoData?.ogDescription || description },
        ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: canonical ? [{ rel: "canonical", href: canonical }] : [],
    };
  },
  loader: async ({ params }) => {
    try {
      const res = await fetchBlogBySlugServerFn({ data: { slug: params.slug } });
      if (res?.success && res.blog) {
        return { blog: res.blog };
      }
    } catch {
      // fallback
    }
    const local = getStoredBlogs().find((b) => b.slug === params.slug);
    return { blog: local || null };
  },
  component: BlogPostDetailPage,
});

function BlogPostDetailPage() {
  const { slug } = Route.useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogBySlugServerFn({ data: { slug } })
      .then((res) => {
        if (res?.success && res.blog) {
          setBlog(res.blog);
        } else {
          const local = getStoredBlogs().find((b) => b.slug === slug);
          setBlog(local || null);
        }
      })
      .catch(() => {
        const local = getStoredBlogs().find((b) => b.slug === slug);
        setBlog(local || null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-36">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <BookOpen className="h-8 w-8 animate-pulse text-kp-pink" />
          <p className="text-xs uppercase tracking-widest font-semibold">Loading Article...</p>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-36">
        <div className="kp-hairline w-full max-w-md rounded-3xl bg-card/60 p-8 text-center backdrop-blur-xl space-y-4">
          <h1 className="text-2xl font-extrabold uppercase">Article Not Found</h1>
          <p className="text-xs text-muted-foreground">The blog post you are looking for does not exist or has been removed.</p>
          <Link
            to="/blog/index"
            className="kp-gradient-bg inline-flex rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)]"
          >
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Schema.org JSON-LD for Search Engines
  const schemaData = {
    "@context": "https://schema.org",
    "@type": blog.seoData?.schemaType || "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage,
    author: {
      "@type": "Organization",
      name: blog.author || "Kreative Planet",
      url: "https://www.kreativeplanet.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Kreative Planet",
      logo: {
        "@type": "ImageObject",
        url: "https://www.kreativeplanet.in/favicon.ico",
      },
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.kreativeplanet.in/blog/${blog.slug}`,
    },
  };

  return (
    <main className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <article className="mx-auto max-w-4xl">
        {/* Back Link */}
        <Reveal>
          <Link
            to="/blog/index"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-kp-pink transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Link>
        </Reveal>

        {/* Category & Date Header */}
        <Reveal delay={60}>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-semibold">
            <span className="rounded-full kp-gradient-bg px-3.5 py-1 font-bold uppercase tracking-wider text-white">
              {blog.category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-kp-pink">
              <User className="h-3.5 w-3.5" /> {blog.author}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {blog.readTime}
            </span>
            <span>·</span>
            <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
        </Reveal>

        {/* Article Title */}
        <Reveal delay={120}>
          <h1 className="mt-6 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>
        </Reveal>

        {/* Excerpt */}
        {blog.excerpt && (
          <Reveal delay={180}>
            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg border-l-2 border-kp-pink pl-4 italic">
              {blog.excerpt}
            </p>
          </Reveal>
        )}

        {/* Share Button & Actions */}
        <Reveal delay={220} className="mt-8 flex items-center justify-between border-y border-white/10 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Share this insight:</span>
          </div>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-card/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-white/10 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-400" /> Link Copied!
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-kp-pink" /> Copy Article Link
              </>
            )}
          </button>
        </Reveal>

        {/* Featured Image */}
        {blog.featuredImage && (
          <Reveal delay={260} className="mt-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl kp-hairline bg-black/60 shadow-2xl">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        )}

        {/* Main Body Content (HTML with Inline Images Support) */}
        <Reveal delay={300}>
          <div
            className="mt-12 space-y-6 text-foreground/90 text-base leading-relaxed font-sans
                       [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-2
                       [&_h3]:text-xl [&_h3]:font-bold [&_h3]:uppercase [&_h3]:text-kp-pink [&_h3]:mt-8 [&_h3]:mb-3
                       [&_p]:leading-relaxed [&_p]:text-foreground/80
                       [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
                       [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4
                       [&_blockquote]:border-l-4 [&_blockquote]:border-kp-pink [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-muted-foreground
                       [&_img]:rounded-2xl [&_img]:my-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:shadow-2xl [&_img]:border [&_img]:border-white/10 [&_img]:cursor-zoom-in"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.tagName === "IMG") {
                setLightboxImage((target as HTMLImageElement).src);
              }
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </Reveal>

        {/* Dynamic FAQ Accordion Section */}
        {blog.faqs && blog.faqs.length > 0 && (
          <Reveal delay={340} className="mt-20 border-t border-white/10 pt-14">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="h-5 w-5 text-kp-pink" />
              <h2 className="text-2xl font-extrabold uppercase text-white tracking-tight">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {blog.faqs.map((faq, idx) => {
                const isOpen = activeFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="kp-hairline rounded-2xl bg-card/40 backdrop-blur-md overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-foreground hover:text-kp-pink transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-kp-pink shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* Author Bio & Growth CTA */}
        <Reveal delay={380} className="mt-20 rounded-3xl kp-hairline bg-card/50 p-8 text-center shadow-2xl backdrop-blur-xl space-y-4">
          <span className="kp-eyebrow text-kp-pink">Creativity Without Gravity</span>
          <h3 className="text-2xl font-extrabold uppercase text-white">Ready to turn attention into growth?</h3>
          <p className="text-xs max-w-lg mx-auto text-muted-foreground">
            Kreative Planet helps ambitious brands build high-converting content engines, short-form reels, and creative advertising.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="kp-gradient-bg inline-flex rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[var(--glow-kp)] hover:brightness-110"
            >
              Start a Project →
            </Link>
          </div>
        </Reveal>
      </article>

      {/* Image Lightbox Modal for Embedded Post Images */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 cursor-zoom-out animate-in fade-in duration-300"
        >
          <img
            src={lightboxImage}
            alt="Expanded view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-white/20"
          />
        </div>
      )}
    </main>
  );
}
