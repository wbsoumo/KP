export type Planet = {
  slug: string;
  index: string;
  name: string;
  domain: string;
  line: string;
  statement: string;
  copy: string;
  items: string[];
  hue: [string, string];
};

export const PLANETS: Planet[] = [
  {
    slug: "ad-planet",
    index: "01",
    name: "Ad Planet",
    domain: "Creative Advertising",
    line: "Ideas that stop the scroll.",
    statement: "WE DON'T MAKE BORING ADS.",
    copy: "Advertising built around a single idea sharp enough to survive a thumb moving at full speed.",
    items: [
      "Creative Advertising",
      "Campaign Concepts",
      "Product Advertising",
      "Social Ads",
      "Conceptual Campaigns",
      "Creative Ad Production",
    ],
    hue: ["#FF7A00", "#FF007A"],
  },
  {
    slug: "film-planet",
    index: "02",
    name: "Film Planet",
    domain: "Video & Production",
    line: "From the first frame to the final cut.",
    statement: "EVERY FRAME EARNS ITS PLACE.",
    copy: "Concept, shoot, edit, grade and motion — cinematic content made for feeds and for screens.",
    items: [
      "Video Production",
      "Reel Production",
      "Video Editing",
      "Motion Graphics",
      "Commercial Content",
      "Creative Films",
    ],
    hue: ["#FF007A", "#FF4D6D"],
  },
  {
    slug: "design-planet",
    index: "03",
    name: "Design Planet",
    domain: "Brand & Visual Design",
    line: "Make your identity impossible to forget.",
    statement: "IDENTITY IS GRAVITY.",
    copy: "Systems of type, colour and form that make a brand recognisable in a quarter of a second.",
    items: [
      "Brand Identity",
      "Logo Design",
      "Social Media Creatives",
      "Campaign Design",
      "Visual Identity",
      "Creative Direction",
    ],
    hue: ["#FF7A00", "#6C2BFF"],
  },
  {
    slug: "social-planet",
    index: "04",
    name: "Social Planet",
    domain: "Organic Reach & Content",
    line: "We don't buy attention. We create it.",
    statement: "WE DON'T BUY ATTENTION. WE CREATE IT.",
    copy: "Content designed to earn attention naturally — creative storytelling, platform-native formats, trends, consistency and audience psychology.",
    items: [
      "Organic Reach Strategy",
      "Social Media Management",
      "Content Strategy",
      "Reels",
      "Social Content",
      "Community Building",
      "Engagement Strategy",
      "Trend-led Content",
      "Performance Analysis",
    ],
    hue: ["#FF007A", "#6C2BFF"],
  },
  {
    slug: "creator-planet",
    index: "05",
    name: "Creator Planet",
    domain: "Creators & Influencers",
    line: "Where brands meet the right voices.",
    statement: "THE RIGHT VOICE CHANGES EVERYTHING.",
    copy: "Creator-led campaigns matched on audience, tone and intent — not on follower count alone.",
    items: [
      "Influencer Marketing",
      "Creator Collaborations",
      "UGC",
      "Brand × Creator Campaigns",
      "Creator Management",
      "Campaign Coordination",
    ],
    hue: ["#6C2BFF", "#FF007A"],
  },
  {
    slug: "digital-planet",
    index: "06",
    name: "Digital Planet",
    domain: "Web & Digital Experiences",
    line: "Digital spaces designed to be remembered.",
    statement: "A WEBSITE IS A CAMPAIGN.",
    copy: "Sites, launches and microsites built as experiences — fast, expressive and built to convert.",
    items: [
      "Creative Websites",
      "Landing Pages",
      "Campaign Websites",
      "Microsites",
      "Digital Experiences",
      "Conversion-focused Design",
    ],
    hue: ["#6C2BFF", "#FF7A00"],
  },
];

export type Project = {
  slug: string;
  name: string;
  category: "ADVERTISING" | "BRANDING" | "SOCIAL" | "VIDEO" | "CREATOR CAMPAIGNS";
  blurb: string;
  format: "phone" | "screen" | "poster" | "billboard";
  result: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "zero-gravity-launch",
    name: "Zero Gravity Launch",
    category: "ADVERTISING",
    blurb: "A product launch campaign built on one weightless idea.",
    format: "billboard",
    result: "4.2M organic impressions in 11 days",
  },
  {
    slug: "midnight-fuel",
    name: "Midnight Fuel",
    category: "VIDEO",
    blurb: "A three-film series shot for vertical, cut for attention.",
    format: "phone",
    result: "62% average completion on Reels",
  },
  {
    slug: "orbit-labs",
    name: "Orbit Labs",
    category: "BRANDING",
    blurb: "Identity system for a studio that refused a safe logo.",
    format: "poster",
    result: "Full identity in 5 weeks",
  },
  {
    slug: "the-daily-drop",
    name: "The Daily Drop",
    category: "SOCIAL",
    blurb: "Organic content engine — 90 days, zero paid spend.",
    format: "phone",
    result: "0 to 148K followers, unpaid",
  },
  {
    slug: "constellation-24",
    name: "Constellation 24",
    category: "CREATOR CAMPAIGNS",
    blurb: "24 creators, one narrative, one weekend.",
    format: "screen",
    result: "1.8M creator-led reach",
  },
  {
    slug: "signal-house",
    name: "Signal House",
    category: "ADVERTISING",
    blurb: "Conceptual campaign for a founder-led personal brand.",
    format: "poster",
    result: "3x inbound enquiries",
  },
  {
    slug: "afterglow",
    name: "Afterglow",
    category: "BRANDING",
    blurb: "Visual identity and campaign design for a beauty label.",
    format: "screen",
    result: "Retail rollout across 40 stores",
  },
  {
    slug: "loop-theory",
    name: "Loop Theory",
    category: "SOCIAL",
    blurb: "Trend-led short form built on a repeatable format.",
    format: "phone",
    result: "11 formats, 27 viral cuts",
  },
];

export const PROCESS = [
  { step: "01", title: "DISCOVER", copy: "Understand the brand, audience and objective." },
  { step: "02", title: "THINK", copy: "Find the creative angle." },
  { step: "03", title: "CREATE", copy: "Design, shoot, edit and produce." },
  { step: "04", title: "LAUNCH", copy: "Put the idea into the world." },
  { step: "05", title: "IMPACT", copy: "Analyse, learn and grow." },
];

export const GROWTH_ORBIT = [
  "IDEA",
  "CONTENT",
  "ATTENTION",
  "ENGAGEMENT",
  "COMMUNITY",
  "GROWTH",
];

export const CREATORS = [
  { name: "Fashion & Style", audience: "Gen Z · Metro", format: "Reels · UGC" },
  { name: "Tech & Gadgets", audience: "Enthusiasts", format: "Reviews · Films" },
  { name: "Food & Travel", audience: "Urban 24-38", format: "Vlogs · Series" },
  { name: "Fitness & Wellness", audience: "Habit-driven", format: "UGC · Challenges" },
  { name: "Finance & Business", audience: "Founders", format: "Explainers" },
  { name: "Comedy & Culture", audience: "Mass reach", format: "Sketch · Trends" },
  { name: "Beauty & Skincare", audience: "18-34", format: "UGC · Tutorials" },
  { name: "Gaming & Esports", audience: "Late-night", format: "Streams · Clips" },
];

export const CONTACTS = [
  {
    role: "Marketing & Graphics",
    name: "Roni Banerjee",
    phone: "+91 79806 57709",
    tel: "+917980657709",
    whatsapp: "https://wa.me/917980657709?text=Hi%20Kreative%20Planet%2C%20I%27d%20like%20to%20discuss%20marketing%20and%20graphics.",
  },
  {
    role: "Technical & Website Development",
    name: "Soumojit Saha",
    phone: "+91 80162 22991",
    tel: "+918016222991",
    whatsapp: "https://wa.me/918016222991?text=Hi%20Kreative%20Planet%2C%20I%27d%20like%20to%20discuss%20website%20and%20tech%20development.",
  },
];

export const PHONE = "+91 79806 57709";
export const PHONE_TEL = "+917980657709";
export const WHATSAPP = "https://wa.me/917980657709?text=Hi%20Kreative%20Planet%2C%20I%27d%20like%20to%20start%20a%20project.";

export const OFFICE_ADDRESS = {
  title: "Office Address",
  line1: "Technopolis, 11th Floor, BP Block,",
  line2: "Sector V, Bidhannagar, North 24 Parganas,",
  line3: "Salt Lake, Kolkata - 700091, India",
  full: "Technopolis, 11th Floor, BP Block, Sector V, Bidhannagar, North 24 Parganas, Salt Lake, Kolkata - 700091, India",
};
