export type AspectRatioType = "reel" | "square" | "landscape" | "portrait" | "auto";

export type MediaItem = {
  id: string;
  type: "video" | "image";
  url: string;
  title: string;
  category: string;
  aspectRatio?: AspectRatioType;
};

export const INITIAL_MEDIA_GALLERY: MediaItem[] = [
  {
    id: "vid-1",
    type: "video",
    url: "https://res.cloudinary.com/dt02mpeqj/video/upload/v1787505088/kreative-planet/videos/IMG_1027.mp4",
    title: "Midnight Fuel Reel",
    category: "VIDEO",
    aspectRatio: "reel",
  },
  {
    id: "vid-2",
    type: "video",
    url: "https://res.cloudinary.com/dt02mpeqj/video/upload/v1787505090/kreative-planet/videos/IMG_1028.mp4",
    title: "Brand Campaign Cut",
    category: "VIDEO",
    aspectRatio: "reel",
  },
  {
    id: "vid-3",
    type: "video",
    url: "https://res.cloudinary.com/dt02mpeqj/video/upload/v1787506837/kreative-planet/videos/IMG_4821.mp4",
    title: "Creative Production Reel",
    category: "VIDEO",
    aspectRatio: "reel",
  },
  {
    id: "vid-4",
    type: "video",
    url: "https://res.cloudinary.com/dt02mpeqj/video/upload/v1787506852/kreative-planet/videos/export-1787053026138.mp4",
    title: "Short-Form Social Series",
    category: "VIDEO",
    aspectRatio: "reel",
  },
  {
    id: "vid-5",
    type: "video",
    url: "https://res.cloudinary.com/dt02mpeqj/video/upload/v1787506296/kreative-planet/creative/IMG_1029.mp4",
    title: "Creative Commercial Ad",
    category: "ADVERTISING",
    aspectRatio: "reel",
  },
  {
    id: "img-sm-1",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505359/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_17.40.49.jpg",
    title: "Social Growth Concept I",
    category: "SOCIAL",
    aspectRatio: "portrait",
  },
  {
    id: "img-sm-2",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505361/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_18.05.08.jpg",
    title: "Social Growth Concept II",
    category: "SOCIAL",
    aspectRatio: "portrait",
  },
  {
    id: "img-sm-3",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505363/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_18.13.20.jpg",
    title: "Social Growth Concept III",
    category: "SOCIAL",
    aspectRatio: "portrait",
  },
  {
    id: "img-sm-4",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505364/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_18.16.52.jpg",
    title: "Social Growth Concept IV",
    category: "SOCIAL",
    aspectRatio: "portrait",
  },
  {
    id: "img-sm-5",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505366/kreative-planet/social%20media/WhatsApp_Image_2026-08-18_at_18.34.54.jpg",
    title: "Social Growth Concept V",
    category: "SOCIAL",
    aspectRatio: "portrait",
  },
  {
    id: "img-cr-1",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505288/kreative-planet/creative/WhatsApp_Image_2026-08-18_at_18.39.40.jpg",
    title: "Creative Ad Poster I",
    category: "ADVERTISING",
    aspectRatio: "portrait",
  },
  {
    id: "img-cr-2",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505290/kreative-planet/creative/WhatsApp_Image_2026-08-18_at_18.40.17.jpg",
    title: "Creative Ad Poster II",
    category: "ADVERTISING",
    aspectRatio: "portrait",
  },
  {
    id: "img-cr-3",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505293/kreative-planet/creative/WhatsApp_Image_2026-08-18_at_18.40.59.jpg",
    title: "Creative Ad Poster III",
    category: "ADVERTISING",
    aspectRatio: "portrait",
  },
  {
    id: "img-cr-4",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505296/kreative-planet/creative/WhatsApp_Image_2026-08-18_at_18.44.54.jpg",
    title: "Creative Ad Poster IV",
    category: "ADVERTISING",
    aspectRatio: "portrait",
  },
  {
    id: "img-cr-5",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787506352/kreative-planet/creative/WhatsApp_Image_2026-08-18_at_18.53.061.jpg",
    title: "Creative Ad Poster V",
    category: "ADVERTISING",
    aspectRatio: "portrait",
  },
  {
    id: "img-cc-1",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505367/kreative-planet/creator/WhatsApp_Image_2026-08-18_at_18.53.05.jpg",
    title: "Creator Constellation I",
    category: "CREATOR CAMPAIGNS",
    aspectRatio: "portrait",
  },
  {
    id: "img-cc-2",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505369/kreative-planet/creator/WhatsApp_Image_2026-08-18_at_18.53.06.jpg",
    title: "Creator Constellation II",
    category: "CREATOR CAMPAIGNS",
    aspectRatio: "portrait",
  },
  {
    id: "img-cc-3",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505371/kreative-planet/creator/WhatsApp_Image_2026-08-18_at_18.53.061.jpg",
    title: "Creator Constellation III",
    category: "CREATOR CAMPAIGNS",
    aspectRatio: "portrait",
  },
  {
    id: "img-cc-4",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505372/kreative-planet/creator/WhatsApp_Image_2026-08-18_at_18.54.56.jpg",
    title: "Creator Constellation IV",
    category: "CREATOR CAMPAIGNS",
    aspectRatio: "portrait",
  },
  {
    id: "img-br-1",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787506363/kreative-planet/brand/WhatsApp_Image_2026-08-18_at_18.47.37.jpg",
    title: "Brand System I",
    category: "BRANDING",
    aspectRatio: "landscape",
  },
  {
    id: "img-br-2",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505438/kreative-planet/brand/WhatsApp_Image_2026-08-18_at_18.48.49.jpg",
    title: "Brand System II",
    category: "BRANDING",
    aspectRatio: "landscape",
  },
  {
    id: "img-br-3",
    type: "image",
    url: "https://res.cloudinary.com/dt02mpeqj/image/upload/v1787505439/kreative-planet/brand/simran.jpg",
    title: "Brand Feature",
    category: "BRANDING",
    aspectRatio: "square",
  },
];

const STORAGE_KEY = "kp_admin_gallery_items";

export function getStoredMediaGallery(): MediaItem[] {
  if (typeof window === "undefined") return INITIAL_MEDIA_GALLERY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_MEDIA_GALLERY;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MEDIA_GALLERY;
  } catch {
    return INITIAL_MEDIA_GALLERY;
  }
}

export function saveStoredMediaGallery(items: MediaItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("kp_gallery_updated"));
  } catch (err) {
    console.error("Failed saving gallery to storage:", err);
  }
}
