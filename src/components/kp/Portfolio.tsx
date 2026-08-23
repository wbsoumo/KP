import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/kp-data";
import { Reveal } from "./ui";

const CATEGORIES = ["ALL", "ADVERTISING", "BRANDING", "SOCIAL", "VIDEO", "CREATOR CAMPAIGNS"] as const;

const MEDIA_GALLERY: Array<{
  id: string;
  type: "video" | "image";
  url: string;
  title: string;
  category: string;
}> = [
  {
    id: "vid-1",
    type: "video",
    url: "https://res.cloudinary.com/dt02mpeqj/video/upload/v1787505088/kreative-planet/videos/IMG_1027.mp4",
    title: "Midnight Fuel Reel",
    category: "VIDEO",
  },
  {
    id: "vid-2",
    type: "video",
    url: "https://res.cloudinary.com/dt02mpeqj/video/upload/v1787505090/kreative-planet/videos/IMG_1028.mp4",
    title: "Brand Campaign Cut",
    category: "VIDEO",
  },
  {
    id: "vid-3",
    type: "video",
    url: "https://res.cloudinary.com/dt02mpeqj/video/upload/v1787506837/kreative-planet/videos/IMG_4821.mp4",
    title: "Creative Production Reel",
    category: "VIDEO",
  },
  {
    id: "vid-4",
    type: "video",
    url: "https://res.cloudinary.com/dt02mpeqj/video/upload/v1787506852/kreative-planet/videos/export-1787053026138.mp4",
    title: "Short-Form Social Series",
    category: "VIDEO",
  },
  {
    id: "vid-5",
    type: "video",
    url: "https://res.cloudinary.com/dt02mpeqj/video/upload/v1787506296/kreative-planet/creative/IMG_1029.mp4",
    title: "Creative Commercial Ad",
    category: "ADVERTISING",
  },
  {
    id: "img-sm-1",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505359/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_17.40.49.jpg",
    title: "Social Growth Concept I",
    category: "SOCIAL",
  },
  {
    id: "img-sm-2",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505361/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_18.05.08.jpg",
    title: "Social Growth Concept II",
    category: "SOCIAL",
  },
  {
    id: "img-sm-3",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505363/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_18.13.20.jpg",
    title: "Social Growth Concept III",
    category: "SOCIAL",
  },
  {
    id: "img-sm-4",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505364/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_18.16.52.jpg",
    title: "Social Growth Concept IV",
    category: "SOCIAL",
  },
  {
    id: "img-sm-5",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505366/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_18.34.54.jpg",
    title: "Social Growth Concept V",
    category: "SOCIAL",
  },
  {
    id: "img-cr-1",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505288/kreative-planet/creative/WhatsApp_Image_2026-08-18_at_18.39.40.jpg",
    title: "Creative Ad Poster I",
    category: "ADVERTISING",
  },
  {
    id: "img-cr-2",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505290/kreative-planet/creative/WhatsApp_Image_2026-08-18_at_18.40.17.jpg",
    title: "Creative Ad Poster II",
    category: "ADVERTISING",
  },
  {
    id: "img-cr-3",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505293/kreative-planet/creative/WhatsApp_Image_2026-08-18_at_18.40.59.jpg",
    title: "Creative Ad Poster III",
    category: "ADVERTISING",
  },
  {
    id: "img-cr-4",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505296/kreative-planet/creative/WhatsApp_Image_2026-08-18_at_18.44.54.jpg",
    title: "Creative Ad Poster IV",
    category: "ADVERTISING",
  },
  {
    id: "img-cr-5",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787506352/kreative-planet/creative/WhatsApp_Image_2026-08-18_at_18.53.061.jpg",
    title: "Creative Ad Poster V",
    category: "ADVERTISING",
  },
  {
    id: "img-cc-1",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505367/kreative-planet/creator/WhatsApp_Image_2026-08-18_at_18.53.05.jpg",
    title: "Creator Constellation I",
    category: "CREATOR CAMPAIGNS",
  },
  {
    id: "img-cc-2",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505369/kreative-planet/creator/WhatsApp_Image_2026-08-18_at_18.53.06.jpg",
    title: "Creator Constellation II",
    category: "CREATOR CAMPAIGNS",
  },
  {
    id: "img-cc-3",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505371/kreative-planet/creator/WhatsApp_Image_2026-08-18_at_18.53.061.jpg",
    title: "Creator Constellation III",
    category: "CREATOR CAMPAIGNS",
  },
  {
    id: "img-cc-4",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505372/kreative-planet/creator/WhatsApp_Image_2026-08-18_at_18.54.56.jpg",
    title: "Creator Constellation IV",
    category: "CREATOR CAMPAIGNS",
  },
  {
    id: "img-br-1",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787506363/kreative-planet/brand/WhatsApp_Image_2026-08-18_at_18.47.37.jpg",
    title: "Brand System I",
    category: "BRANDING",
  },
  {
    id: "img-br-2",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505438/kreative-planet/brand/WhatsApp_Image_2026-08-18_at_18.48.49.jpg",
    title: "Brand System II",
    category: "BRANDING",
  },
  {
    id: "img-br-3",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505439/kreative-planet/brand/simran.jpg",
    title: "Brand Feature",
    category: "BRANDING",
  },
];

export function Portfolio({ compact = false }: { compact?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("ALL");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredMedia = activeCategory === "ALL"
    ? MEDIA_GALLERY
    : MEDIA_GALLERY.filter((item) => item.category === activeCategory);

  const shownMedia = compact ? filteredMedia.slice(0, 4) : filteredMedia;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : shownMedia.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null && prev < shownMedia.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, shownMedia.length]);

  return (
    <div>
      {/* Category filter pills */}
      <div className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => {
              setActiveCategory(c);
              setSelectedIndex(null);
            }}
            className={`shrink-0 rounded-full px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition ${
              activeCategory === c
                ? "kp-gradient-bg text-white"
                : "kp-hairline text-foreground/60 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid of video & image media items */}
      <div className="grid grid-cols-1 items-end gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {shownMedia.map((item, i) => (
          <Reveal key={item.id} delay={(i % 4) * 80}>
            <button
              onClick={() => setSelectedIndex(i)}
              className="group relative block w-full text-left overflow-hidden rounded-2xl kp-hairline bg-card/60 transition-transform duration-500 hover:-translate-y-2 focus:outline-none"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-black/40">
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    preload="none"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
                  <span className="kp-eyebrow text-white/70">{item.category}</span>
                  <h3 className="mt-1 text-lg font-bold uppercase text-white leading-tight">
                    {item.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-kp-pink">
                    Click to Open Gallery →
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Gallery Lightbox Popup Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-xl p-4 sm:p-8 cursor-default"
          style={{ cursor: "auto" }}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 z-50 rounded-full border border-white/20 bg-background/80 p-3 text-white transition hover:bg-white/20 focus:outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous item button */}
          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : shownMedia.length - 1
              )
            }
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 rounded-full border border-white/20 bg-background/80 p-3 text-white transition hover:bg-white/20 focus:outline-none cursor-pointer"
            aria-label="Previous media"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Next item button */}
          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev !== null && prev < shownMedia.length - 1 ? prev + 1 : 0
              )
            }
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 rounded-full border border-white/20 bg-background/80 p-3 text-white transition hover:bg-white/20 focus:outline-none cursor-pointer"
            aria-label="Next media"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Popup Content Container */}
          <div className="relative max-h-[85vh] max-w-4xl w-full flex flex-col items-center justify-center">
            {shownMedia[selectedIndex].type === "video" ? (
              <video
                src={shownMedia[selectedIndex].url}
                controls
                autoPlay
                className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl border border-white/10 object-contain"
              />
            ) : (
              <img
                src={shownMedia[selectedIndex].url}
                alt={shownMedia[selectedIndex].title}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl border border-white/10 object-contain"
              />
            )}

            <div className="mt-4 text-center">
              <span className="kp-eyebrow text-white/70">
                {shownMedia[selectedIndex].category} · {selectedIndex + 1} of {shownMedia.length}
              </span>
              <h3 className="mt-1 text-2xl font-bold uppercase text-white">
                {shownMedia[selectedIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
