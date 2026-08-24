import { sql } from "@vercel/postgres";
import { kv } from "@vercel/kv";
import { type CreatorData } from "@/lib/creator-store";

export async function initCreatorTable() {
  try {
    if (process.env.POSTGRES_URL || process.env.VERCEL_POSTGRES_URL) {
      await sql`
        CREATE TABLE IF NOT EXISTS creators (
          id VARCHAR(255) PRIMARY KEY,
          full_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(255) NOT NULL,
          instagram_handle VARCHAR(255) NOT NULL,
          instagram_followers VARCHAR(255),
          category VARCHAR(255) NOT NULL,
          managed_by VARCHAR(50) NOT NULL,
          manager_name VARCHAR(255),
          manager_contact VARCHAR(255),
          remarks TEXT,
          password_hash VARCHAR(255) NOT NULL,
          status VARCHAR(50) NOT NULL DEFAULT 'pending',
          metrics JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
    }
  } catch (err) {
    console.warn("Vercel Postgres table init fallback:", err);
  }
}

export async function fetchCreatorsFromVercelDB(): Promise<CreatorData[]> {
  try {
    // 1. Try Vercel Postgres SQL Database first
    if (process.env.POSTGRES_URL || process.env.VERCEL_POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING) {
      await initCreatorTable();
      const { rows } = await sql`SELECT * FROM creators ORDER BY created_at DESC;`;
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          fullName: r.full_name,
          email: r.email,
          phone: r.phone,
          instagramHandle: r.instagram_handle,
          instagramFollowers: r.instagram_followers,
          category: r.category,
          managedBy: r.managed_by as "self" | "manager",
          managerName: r.manager_name,
          managerContact: r.manager_contact,
          remarks: r.remarks,
          passwordHash: r.password_hash,
          status: r.status,
          createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
          metrics: r.metrics || undefined,
        }));
      }
    }
  } catch (err) {
    console.warn("Vercel Postgres fetch failed, checking Vercel KV:", err);
  }

  try {
    // 2. Try Vercel KV (Key-Value Redis Database)
    if (process.env.KV_REST_API_URL || process.env.VERCEL_KV_REST_API_URL) {
      const creators = await kv.get<CreatorData[]>("kp_creators_list");
      if (creators && Array.isArray(creators)) {
        return creators;
      }
    }
  } catch (err) {
    console.warn("Vercel KV fetch failed:", err);
  }

  return [];
}

export async function saveCreatorToVercelDB(creator: CreatorData): Promise<boolean> {
  let isSaved = false;

  // 1. Save to Vercel Postgres
  try {
    if (process.env.POSTGRES_URL || process.env.VERCEL_POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING) {
      await initCreatorTable();
      await sql`
        INSERT INTO creators (
          id, full_name, email, phone, instagram_handle, instagram_followers, category,
          managed_by, manager_name, manager_contact, remarks, password_hash, status, metrics, created_at
        ) VALUES (
          ${creator.id}, ${creator.fullName}, ${creator.email}, ${creator.phone},
          ${creator.instagramHandle}, ${creator.instagramFollowers || ""}, ${creator.category},
          ${creator.managedBy}, ${creator.managerName || ""}, ${creator.managerContact || ""},
          ${creator.remarks || ""}, ${creator.passwordHash}, ${creator.status},
          ${JSON.stringify(creator.metrics || {})}, ${creator.createdAt}
        )
        ON CONFLICT (id) DO UPDATE SET
          full_name = EXCLUDED.full_name,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone,
          instagram_handle = EXCLUDED.instagram_handle,
          category = EXCLUDED.category,
          managed_by = EXCLUDED.managed_by,
          manager_name = EXCLUDED.manager_name,
          manager_contact = EXCLUDED.manager_contact,
          remarks = EXCLUDED.remarks,
          status = EXCLUDED.status,
          metrics = EXCLUDED.metrics;
      `;
      isSaved = true;
    }
  } catch (err) {
    console.warn("Vercel Postgres insert failed:", err);
  }

  // 2. Backup / Sync to Vercel KV Database
  try {
    if (process.env.KV_REST_API_URL || process.env.VERCEL_KV_REST_API_URL) {
      const existing = (await kv.get<CreatorData[]>("kp_creators_list")) || [];
      const updated = [creator, ...existing.filter((c) => c.id !== creator.id)];
      await kv.set("kp_creators_list", updated);
      isSaved = true;
    }
  } catch (err) {
    console.warn("Vercel KV save failed:", err);
  }

  return isSaved;
}

export async function updateCreatorStatusInVercelDB(id: string, status: string): Promise<boolean> {
  try {
    if (process.env.POSTGRES_URL || process.env.VERCEL_POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING) {
      await sql`UPDATE creators SET status = ${status} WHERE id = ${id};`;
      return true;
    }
  } catch (err) {
    console.warn("Vercel Postgres status update failed:", err);
  }
  return false;
}
