import { type CreatorData } from "@/lib/creator-store";

const MYSQL_CONFIG = {
  host: process.env.MYSQL_HOST || "86.107.77.32",
  user: process.env.MYSQL_USER || "taskbaz3_kp",
  password: process.env.MYSQL_PASSWORD || "ynxmAWJYbj2kmyKHVVtP",
  database: process.env.MYSQL_DATABASE || "taskbaz3_kp",
  port: Number(process.env.MYSQL_PORT) || 3306,
  connectTimeout: 10000,
};

let pool: any = null;

async function getPool() {
  if (typeof window !== "undefined") return null;
  if (!pool) {
    const mysql = await import("mysql2/promise");
    pool = mysql.createPool({
      ...MYSQL_CONFIG,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function initMySQLDatabase() {
  if (typeof window !== "undefined") return;
  const p = await getPool();
  if (!p) return;
  await p.query(`
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
      metrics JSON,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log("MySQL creators table initialized successfully!");
}

export async function fetchCreatorsFromMySQL(): Promise<CreatorData[]> {
  if (typeof window !== "undefined") return [];

  try {
    const p = await getPool();
    if (!p) return [];
    await initMySQLDatabase();
    const [rows] = await p.query("SELECT * FROM creators ORDER BY created_at DESC;");

    if (Array.isArray(rows)) {
      return rows.map((r: any) => ({
        id: r.id,
        fullName: r.full_name,
        email: r.email,
        phone: r.phone,
        instagramHandle: r.instagram_handle,
        instagramFollowers: r.instagram_followers || "0",
        category: r.category,
        managedBy: r.managed_by as "self" | "manager",
        managerName: r.manager_name || "",
        managerContact: r.manager_contact || "",
        remarks: r.remarks || "",
        passwordHash: r.password_hash,
        status: r.status,
        createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
        metrics: typeof r.metrics === "string" ? JSON.parse(r.metrics) : r.metrics || undefined,
      }));
    }
  } catch (err) {
    console.warn("MySQL fetch error:", err);
  }

  return [];
}

export async function saveCreatorToMySQL(creator: CreatorData): Promise<boolean> {
  if (typeof window !== "undefined") return false;

  try {
    const p = await getPool();
    if (!p) return false;
    await initMySQLDatabase();

    const sql = `
      INSERT INTO creators (
        id, full_name, email, phone, instagram_handle, instagram_followers, category,
        managed_by, manager_name, manager_contact, remarks, password_hash, status, metrics, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE
        full_name = VALUES(full_name),
        email = VALUES(email),
        phone = VALUES(phone),
        instagram_handle = VALUES(instagram_handle),
        category = VALUES(category),
        managed_by = VALUES(managed_by),
        manager_name = VALUES(manager_name),
        manager_contact = VALUES(manager_contact),
        remarks = VALUES(remarks),
        status = VALUES(status),
        metrics = VALUES(metrics);
    `;

    await p.execute(sql, [
      creator.id,
      creator.fullName,
      creator.email,
      creator.phone,
      creator.instagramHandle,
      creator.instagramFollowers || "",
      creator.category,
      creator.managedBy,
      creator.managerName || "",
      creator.managerContact || "",
      creator.remarks || "",
      creator.passwordHash,
      creator.status,
      JSON.stringify(creator.metrics || {}),
    ]);

    return true;
  } catch (err) {
    console.warn("MySQL insert error:", err);
    return false;
  }
}

export async function updateCreatorStatusInMySQL(id: string, status: string): Promise<boolean> {
  if (typeof window !== "undefined") return false;

  try {
    const p = await getPool();
    if (!p) return false;
    await p.execute("UPDATE creators SET status = ? WHERE id = ?", [status, id]);
    return true;
  } catch (err) {
    console.warn("MySQL update error:", err);
    return false;
  }
}
