export type FAQItem = {
  question: string;
  answer: string;
};

export type SEOData = {
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  schemaType?: "Article" | "BlogPosting" | "NewsArticle";
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: "ADVERTISING" | "BRANDING" | "SOCIAL" | "VIDEO" | "CREATORS" | "GROWTH";
  author: string;
  readTime: string;
  status: "published" | "draft";
  faqs: FAQItem[];
  seoData: SEOData;
  createdAt: string;
  updatedAt?: string;
};

export type YoastCheckItem = {
  id: string;
  title: string;
  status: "good" | "warning" | "error";
  feedback: string;
};

export type YoastAnalysisResult = {
  score: number; // 0 - 100
  rating: "Good" | "Needs Improvement" | "Poor";
  checks: YoastCheckItem[];
};

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "how-to-build-a-brand-that-stops-the-scroll",
    title: "How to Build a Brand That Stops the Scroll in 2026",
    excerpt: "Attention is the rarest currency on the internet. Here is our step-by-step strategy for crafting brand identities and content engines that convert casual scrollers into loyal customers.",
    content: `
      <h2>The New Currency of Digital Growth: Thumb-Stopping Attention</h2>
      <p>In a world where millions of reels, posts, and ads compete for your customer's attention every second, traditional branding is dead. If your brand takes more than 3 seconds to communicate its core value proposition, scrollers move on.</p>
      
      <p>At <strong>Kreative Planet</strong>, we call this <em>Creativity Without Gravity</em> — lifting your positioning above the clutter through sharp storytelling, high-contrast visual design, and performance-backed content engines.</p>
      
      <img src="https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505359/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_17.40.49.jpg" alt="Scroll Stopping Brand Strategy" class="my-8 rounded-2xl w-full object-cover shadow-2xl border border-white/10" />

      <h2>1. The 3-Second Hook Rule</h2>
      <p>Whether you are producing short-form video reels or high-converting product ads, the first 3 seconds dictate 80% of your campaign's performance. Focus on:</p>
      <ul>
        <li><strong>Visual Pattern Interrupts:</strong> Bold motion graphics, unexpected color contrast, or immediate human facial expressions.</li>
        <li><strong>Curiosity Gaps:</strong> Asking a provocative question or presenting a relatable problem before showing the product.</li>
        <li><strong>Micro-Typography:</strong> Subtitles with high legibility for 85% of users watching videos on mute.</li>
      </ul>

      <h2>2. Content Engines vs. One-off Posts</h2>
      <p>Successful brands don't rely on random viral hits. They build <strong>Content Engines</strong> — scalable systems of concept-led ads, creator collaborations, and organic social formats designed to execute month after month.</p>

      <img src="https://res.cloudinary.com/dt02mpeqj/video/upload/so_0/v1787505088/kreative-planet/videos/IMG_1027.jpg" alt="Video Production & Reels Strategy" class="my-8 rounded-2xl w-full object-cover shadow-2xl border border-white/10" />

      <h2>3. Creator Collaborations That Authentically Convert</h2>
      <p>Stop sending generic scripts to influencers. The highest-converting creator campaigns treat creators as authentic co-producers who understand their audience's culture and language.</p>
    `,
    featuredImage: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505359/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_17.40.49.jpg",
    category: "GROWTH",
    author: "Roni Banerjee & Soumojit Saha",
    readTime: "5 min read",
    status: "published",
    faqs: [
      {
        question: "Why is scroll-stopping creative so critical for modern advertising?",
        answer: "Modern consumers scroll through over 300 feet of content daily. Without an immediate visual or narrative pattern interrupt in the first 3 seconds, user retention drops drastically, inflating your customer acquisition cost (CAC)."
      },
      {
        question: "How often should brands update their social content strategy?",
        answer: "We recommend reviewing performance metrics weekly and refreshing creative angles every 2 to 4 weeks to prevent ad fatigue and keep organic reach consistent."
      }
    ],
    seoData: {
      focusKeyword: "brand content strategy",
      metaTitle: "How to Build a Brand That Stops the Scroll (2026 Guide) | Kreative Planet",
      metaDescription: "Learn how to craft scroll-stopping brand content, 3-second video hooks, and scalable creator campaigns with Kreative Planet.",
      canonicalUrl: "https://www.kreativeplanet.in/blog/how-to-build-a-brand-that-stops-the-scroll",
      ogTitle: "How to Build a Brand That Stops the Scroll (2026 Guide)",
      ogDescription: "Attention is currency. Master the 3-second rule and scalable content engines to grow your brand organically.",
      ogImage: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505359/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_17.40.49.jpg",
      noIndex: false,
      noFollow: false,
      schemaType: "BlogPosting",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "blog-2",
    slug: "video-first-marketing-why-reels-and-shorts-win",
    title: "Video-First Marketing: Why Reels & Short-Form Content Drive 4x Growth",
    excerpt: "Discover why vertical video production and short-form reels are outperforming traditional banner advertising across all industries in 2026.",
    content: `
      <h2>The Domination of Vertical Short-Form Video</h2>
      <p>Short-form video has transitioned from a social media trend to the primary driver of digital commerce. Platforms prioritize vertical video algorithms because they maximize user engagement time.</p>

      <img src="https://res.cloudinary.com/dt02mpeqj/video/upload/so_0/v1787505090/kreative-planet/videos/IMG_1028.jpg" alt="Short Form Reel Production" class="my-8 rounded-2xl w-full object-cover shadow-2xl border border-white/10" />

      <h2>Key Pillars of High-Converting Commercial Reels</h2>
      <ul>
        <li><strong>Hooking within 1.5 seconds:</strong> Motion, visual surprise, or direct benefit callout.</li>
        <li><strong>Pacing & Editing:</strong> Dynamic cuts every 2 to 3 seconds keep retention graphs steady.</li>
        <li><strong>Strong CTA:</strong> Directing scrollers to link in bio or specific landing page.</li>
      </ul>
    `,
    featuredImage: "https://res.cloudinary.com/dt02mpeqj/video/upload/so_0/v1787505090/kreative-planet/videos/IMG_1028.jpg",
    category: "VIDEO",
    author: "Kreative Planet Film Studio",
    readTime: "4 min read",
    status: "published",
    faqs: [
      {
        question: "What video aspect ratio works best for social campaigns?",
        answer: "Vertical 9:16 aspect ratio is ideal for Instagram Reels, YouTube Shorts, and TikTok, providing 100% mobile screen real estate."
      }
    ],
    seoData: {
      focusKeyword: "short-form video marketing",
      metaTitle: "Video-First Marketing: Why Reels Drive 4x Organic Growth | Kreative Planet",
      metaDescription: "Explore how vertical short-form reels and commercial video production scale brand engagement and conversions.",
      canonicalUrl: "https://www.kreativeplanet.in/blog/video-first-marketing-why-reels-and-shorts-win",
      ogTitle: "Video-First Marketing: Why Reels Drive 4x Growth",
      ogDescription: "Why short-form vertical video is outperforming traditional ads across all industries.",
      ogImage: "https://res.cloudinary.com/dt02mpeqj/video/upload/so_0/v1787505090/kreative-planet/videos/IMG_1028.jpg",
      noIndex: false,
      noFollow: false,
      schemaType: "Article",
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const STORAGE_KEY_BLOGS = "kp_blogs_db_v1";

import { fetchBlogsServerFn } from "@/lib/creators-server";

export async function fetchBlogsFromAPI(includeDrafts = false): Promise<BlogPost[]> {
  try {
    const res = await fetchBlogsServerFn({ data: { includeDrafts } });
    if (res?.success && Array.isArray(res.blogs) && res.blogs.length > 0) {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(res.blogs));
      }
      return res.blogs;
    }
  } catch (err) {
    console.warn("Server function fetch blogs error:", err);
  }

  try {
    const res = await fetch(`/api/blogs${includeDrafts ? "?includeDrafts=true" : ""}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(data.blogs));
        }
        return data.blogs;
      }
    }
  } catch (err) {
    console.warn("API fetch blogs fallback error:", err);
  }

  return getStoredBlogs();
}

export function getStoredBlogs(): BlogPost[] {
  if (typeof window === "undefined") return INITIAL_BLOGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BLOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(INITIAL_BLOGS));
      return INITIAL_BLOGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_BLOGS;
  } catch {
    return INITIAL_BLOGS;
  }
}

export function saveStoredBlogs(blogs: BlogPost[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(blogs));
    window.dispatchEvent(new Event("kp_blogs_updated"));
  } catch (err) {
    console.error("Failed to save blogs to storage:", err);
  }
}

/* =========================================================================
   YOAST-STYLE REAL-TIME SEO ANALYSIS HELPER
   ========================================================================= */

export function analyzeYoastSEO(
  title: string,
  content: string,
  excerpt: string,
  focusKeyword: string,
  metaTitle: string,
  metaDescription: string,
  featuredImage: string
): YoastAnalysisResult {
  const keyword = focusKeyword.trim().toLowerCase();
  const checks: YoastCheckItem[] = [];
  let score = 0;

  const plainContent = content.replace(/<[^>]+>/g, " ").toLowerCase();
  const wordCount = plainContent.split(/\s+/).filter(Boolean).length;

  // 1. Focus Keyword Provided
  if (!keyword) {
    checks.push({
      id: "no-keyword",
      title: "Focus Keyword",
      status: "error",
      feedback: "No focus keyword set. Specify a keyphrase to enable Yoast SEO analysis.",
    });
    return { score: 15, rating: "Poor", checks };
  } else {
    checks.push({
      id: "has-keyword",
      title: "Focus Keyword",
      status: "good",
      feedback: `Focus keyword set to "${focusKeyword}".`,
    });
    score += 15;
  }

  // 2. Keyword in SEO Title
  const cleanTitle = (metaTitle || title).toLowerCase();
  if (cleanTitle.includes(keyword)) {
    checks.push({
      id: "keyword-in-title",
      title: "Keyword in SEO Title",
      status: "good",
      feedback: "The focus keyword appears in the SEO title.",
    });
    score += 15;
  } else {
    checks.push({
      id: "keyword-in-title",
      title: "Keyword in SEO Title",
      status: "error",
      feedback: "The focus keyword does not appear in the SEO title.",
    });
  }

  // 3. SEO Title Length (30-65 chars)
  const titleLength = (metaTitle || title).length;
  if (titleLength >= 30 && titleLength <= 65) {
    checks.push({
      id: "title-length",
      title: "SEO Title Width",
      status: "good",
      feedback: `SEO title length is optimal (${titleLength} characters).`,
    });
    score += 15;
  } else if (titleLength > 65) {
    checks.push({
      id: "title-length",
      title: "SEO Title Width",
      status: "warning",
      feedback: `SEO title is too long (${titleLength} chars). Google may truncate it.`,
    });
    score += 8;
  } else {
    checks.push({
      id: "title-length",
      title: "SEO Title Width",
      status: "error",
      feedback: `SEO title is too short (${titleLength} chars). Aim for 30-65 characters.`,
    });
  }

  // 4. Keyword in Meta Description
  const cleanDesc = metaDescription.toLowerCase();
  if (cleanDesc.includes(keyword)) {
    checks.push({
      id: "keyword-in-meta",
      title: "Keyword in Meta Description",
      status: "good",
      feedback: "The focus keyword appears in the meta description.",
    });
    score += 15;
  } else {
    checks.push({
      id: "keyword-in-meta",
      title: "Keyword in Meta Description",
      status: "warning",
      feedback: "Include your focus keyword in the meta description for higher CTR.",
    });
    score += 5;
  }

  // 5. Meta Description Length (120-160 chars)
  const descLength = metaDescription.length;
  if (descLength >= 120 && descLength <= 160) {
    checks.push({
      id: "meta-length",
      title: "Meta Description Length",
      status: "good",
      feedback: `Meta description length is ideal (${descLength} characters).`,
    });
    score += 15;
  } else if (descLength > 160) {
    checks.push({
      id: "meta-length",
      title: "Meta Description Length",
      status: "warning",
      feedback: `Meta description is slightly long (${descLength} chars). May be cut off on mobile SERPs.`,
    });
    score += 8;
  } else {
    checks.push({
      id: "meta-length",
      title: "Meta Description Length",
      status: "error",
      feedback: `Meta description is too short (${descLength} chars). Recommended: 120-160 characters.`,
    });
  }

  // 6. Content Length (Recommended >= 300 words)
  if (wordCount >= 300) {
    checks.push({
      id: "content-length",
      title: "Text Length",
      status: "good",
      feedback: `Good text length (${wordCount} words). Well above 300 words minimum.`,
    });
    score += 15;
  } else {
    checks.push({
      id: "content-length",
      title: "Text Length",
      status: "warning",
      feedback: `Text length is ${wordCount} words. Consider adding more detailed content (300+ words).`,
    });
    score += 5;
  }

  // 7. Featured Image Check
  if (featuredImage && featuredImage.trim()) {
    checks.push({
      id: "featured-image",
      title: "Social Share & OpenGraph Image",
      status: "good",
      feedback: "Featured image is set for social sharing & rich snippets.",
    });
    score += 10;
  } else {
    checks.push({
      id: "featured-image",
      title: "Social Share & OpenGraph Image",
      status: "warning",
      feedback: "No featured image provided. Adding one improves social sharing click-through rates.",
    });
  }

  let rating: "Good" | "Needs Improvement" | "Poor" = "Poor";
  if (score >= 80) rating = "Good";
  else if (score >= 50) rating = "Needs Improvement";

  return { score, rating, checks };
}
