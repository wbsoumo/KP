import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "./ui";
import { getStoredMediaGallery, fetchMediaGalleryFromAPI, type MediaItem } from "@/lib/gallery-store";

const CATEGORIES = ["ALL", "ADVERTISING", "BRANDING", "SOCIAL", "VIDEO", "CREATOR CAMPAIGNS"] as const;

const getAspectClass = (ratio?: string) => {
  switch (ratio) {
    case "square":
      return "aspect-square object-cover";
    case "landscape":
      return "aspect-[16/9] object-cover";
    case "portrait":
      return "aspect-[4/5] object-cover";
    case "auto":
      return "aspect-auto max-h-[500px] object-contain bg-black/80";
    case "reel":
    default:
      return "aspect-[9/16] object-cover";
  }
};

export function Portfolio({ compact = false }: { compact?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("ALL");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);

  useEffect(() => {
    setMediaList(getStoredMediaGallery());
    fetchMediaGalleryFromAPI().then((list) => {
      if (list && list.length > 0) setMediaList(list);
    });

    const handleUpdate = () => {
      fetchMediaGalleryFromAPI().then((list) => {
        if (list && list.length > 0) setMediaList(list);
      });
    };
    window.addEventListener("kp_gallery_updated", handleUpdate);
    return () => window.removeEventListener("kp_gallery_updated", handleUpdate);
  }, []);

  const filteredMedia = activeCategory === "ALL"
    ? [
        ...mediaList.filter((item) => item.type === "video"),
        ...mediaList.filter((item) => item.type !== "video"),
      ]
    : mediaList.filter((item) => item.category === activeCategory);

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
      <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {shownMedia.map((item, i) => (
          <Reveal key={item.id} delay={(i % 4) * 80}>
            <button
              onClick={() => setSelectedIndex(i)}
              className="group relative block w-full text-left overflow-hidden rounded-2xl kp-hairline bg-card/60 transition-transform duration-500 hover:-translate-y-2 focus:outline-none"
            >
              <div className={`relative w-full overflow-hidden bg-black/40 ${getAspectClass(item.aspectRatio)}`}>
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    poster={
                      item.url.includes("cloudinary.com")
                        ? item.url.replace("/upload/", "/upload/so_0/").replace(/\.(mp4|mov|webm)$/i, ".jpg")
                        : undefined
                    }
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        el.setAttribute("playsinline", "true");
                        el.setAttribute("webkit-playsinline", "true");
                        el.play().catch(() => {});
                      }
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    className={`h-full w-full ${item.aspectRatio === "auto" ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-105`}
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
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 select-none"
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute top-6 right-6 z-50 rounded-full border border-white/20 bg-background/80 p-3 text-white transition hover:bg-white/20 focus:outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous item button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : shownMedia.length - 1
              );
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 rounded-full border border-white/20 bg-background/80 p-3 text-white transition hover:bg-white/20 focus:outline-none cursor-pointer"
            aria-label="Previous media"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Next item button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null && prev < shownMedia.length - 1 ? prev + 1 : 0
              );
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 rounded-full border border-white/20 bg-background/80 p-3 text-white transition hover:bg-white/20 focus:outline-none cursor-pointer"
            aria-label="Next media"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Popup Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-4xl w-full flex flex-col items-center justify-center"
          >
            {shownMedia[selectedIndex].type === "video" ? (
              <video
                key={shownMedia[selectedIndex].url}
                src={shownMedia[selectedIndex].url}
                poster={
                  shownMedia[selectedIndex].url.includes("cloudinary.com")
                    ? shownMedia[selectedIndex].url.replace("/upload/", "/upload/so_0/").replace(/\.(mp4|mov|webm)$/i, ".jpg")
                    : undefined
                }
                controls
                autoPlay
                playsInline
                preload="auto"
                ref={(el) => {
                  if (el) {
                    el.setAttribute("playsinline", "true");
                    el.setAttribute("webkit-playsinline", "true");
                    el.play().catch(() => {});
                  }
                }}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl border border-white/10 object-contain bg-black"
              />
            ) : (
              <img
                key={shownMedia[selectedIndex].url}
                src={shownMedia[selectedIndex].url}
                alt={shownMedia[selectedIndex].title}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl border border-white/10 object-contain bg-black"
              />
            )}

            <div className="mt-4 text-center pointer-events-auto">
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
