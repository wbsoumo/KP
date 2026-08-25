export type CreatorStatus = "pending" | "approved" | "rejected";

export type CreatorData = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  instagramHandle: string;
  instagramFollowers?: string;
  category: string;
  managedBy: "self" | "manager";
  managerName?: string;
  managerContact?: string;
  remarks?: string;
  passwordHash: string; // Plain/Base64 stored for portal validation
  status: CreatorStatus;
  createdAt: string;
  metrics?: {
    totalEarnings: number;
    monthlyEarnings: number;
    campaignsCompleted: number;
    activeCampaigns: number;
    reachGrowthPercentage: number;
    engagementRate: number;
    totalReach: string;
  };
};

const STORAGE_KEY_CREATORS = "kp_creators_db_v1";
const STORAGE_KEY_SESSION = "kp_creator_session_v1";

export const INITIAL_CREATORS: CreatorData[] = [
  {
    id: "creator-demo-1",
    fullName: "Aarav Sharma",
    email: "aarav@kreativeplanet.com",
    phone: "+91 98765 43210",
    instagramHandle: "@aarav.creates",
    instagramFollowers: "245K",
    category: "TECH & GAMING",
    managedBy: "self",
    remarks: "Top performing tech reviewer.",
    passwordHash: "creator123",
    status: "approved",
    createdAt: new Date().toISOString(),
    metrics: {
      totalEarnings: 345000,
      monthlyEarnings: 82000,
      campaignsCompleted: 14,
      activeCampaigns: 2,
      reachGrowthPercentage: 24.8,
      engagementRate: 5.6,
      totalReach: "1.8M",
    },
  },
  {
    id: "creator-demo-2",
    fullName: "Simran Kaur",
    email: "simran@kreativeplanet.com",
    phone: "+91 98123 45678",
    instagramHandle: "@simran_vibes",
    instagramFollowers: "510K",
    category: "LIFESTYLE & BEAUTY",
    managedBy: "manager",
    managerName: "TalentHub Asia (Rohan)",
    managerContact: "+91 98989 12345",
    remarks: "Exclusive brand collaborations.",
    passwordHash: "creator123",
    status: "approved",
    createdAt: new Date().toISOString(),
    metrics: {
      totalEarnings: 680000,
      monthlyEarnings: 145000,
      campaignsCompleted: 28,
      activeCampaigns: 4,
      reachGrowthPercentage: 38.2,
      engagementRate: 6.8,
      totalReach: "3.4M",
    },
  },
];

import { fetchCreatorsServerFn } from "@/lib/creators-server";

export async function fetchCreatorsFromAPI(): Promise<CreatorData[]> {
  try {
    const serverRes = await fetchCreatorsServerFn();
    if (serverRes?.success && Array.isArray(serverRes.creators) && serverRes.creators.length > 0) {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_CREATORS, JSON.stringify(serverRes.creators));
      }
      return serverRes.creators;
    }
  } catch (err) {
    console.warn("Server function fetch creators error:", err);
  }

  try {
    const res = await fetch("/api/creators");
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.creators) && data.creators.length > 0) {
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY_CREATORS, JSON.stringify(data.creators));
        }
        return data.creators;
      }
    }
  } catch (err) {
    console.warn("API fetch creators fallback:", err);
  }
  return getStoredCreators();
}

export function getStoredCreators(): CreatorData[] {
  if (typeof window === "undefined") return INITIAL_CREATORS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CREATORS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CREATORS, JSON.stringify(INITIAL_CREATORS));
      return INITIAL_CREATORS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CREATORS;
  } catch {
    return INITIAL_CREATORS;
  }
}

export function saveStoredCreators(creators: CreatorData[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CREATORS, JSON.stringify(creators));
    window.dispatchEvent(new Event("kp_creators_updated"));
  } catch (err) {
    console.error("Failed to save creators:", err);
  }
}

export function getActiveCreatorSession(): CreatorData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setActiveCreatorSession(creator: CreatorData | null): void {
  if (typeof window === "undefined") return;
  if (!creator) {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  } else {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(creator));
  }
}
