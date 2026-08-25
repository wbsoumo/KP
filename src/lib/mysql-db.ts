import { type CreatorData } from "@/lib/creator-store";
import { INITIAL_MEDIA_GALLERY, type MediaItem } from "@/lib/gallery-store";
import { INITIAL_BLOGS, type BlogPost } from "@/lib/blog-store";

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

  // 1. Creators table
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

  // 2. Admin Users table
  await p.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id VARCHAR(255) PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Seed default admin user if missing
  const [adminRows] = await p.query("SELECT * FROM admin_users WHERE username = 'admin';");
  if (Array.isArray(adminRows) && adminRows.length === 0) {
    const defaultUser = process.env.ADMIN_USERNAME || "admin";
    const defaultPass = process.env.ADMIN_PASSWORD || "kreative2026";
    await p.execute(
      "INSERT INTO admin_users (id, username, password_hash, created_at) VALUES (?, ?, ?, NOW())",
      ["admin-1", defaultUser, defaultPass]
    );
    console.log("MySQL default admin user seeded!");
  }

  // 3. Media Gallery ("Ideas in Orbit" portfolio) table
  await p.query(`
    CREATE TABLE IF NOT EXISTS media_gallery (
      id VARCHAR(255) PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      url TEXT NOT NULL,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      aspect_ratio VARCHAR(50) DEFAULT 'reel',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Seed initial gallery items if empty
  const [galleryRows] = await p.query("SELECT COUNT(*) as count FROM media_gallery;");
  const count = Array.isArray(galleryRows) && (galleryRows[0] as any)?.count;
  if (count === 0) {
    for (const item of INITIAL_MEDIA_GALLERY) {
      await p.execute(
        `INSERT INTO media_gallery (id, type, url, title, category, aspect_ratio, created_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE title = VALUES(title), category = VALUES(category), aspect_ratio = VALUES(aspect_ratio);`,
        [item.id, item.type, item.url, item.title, item.category, item.aspectRatio || "reel"]
      );
    }
    console.log(`MySQL media gallery seeded with ${INITIAL_MEDIA_GALLERY.length} items!`);
  }

  // 4. Blogs table with Yoast SEO Suite & FAQs JSON
  await p.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id VARCHAR(255) PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT,
      content LONGTEXT NOT NULL,
      featured_image TEXT,
      category VARCHAR(255) NOT NULL DEFAULT 'GROWTH',
      author VARCHAR(255) DEFAULT 'Kreative Planet Team',
      read_time VARCHAR(50) DEFAULT '5 min read',
      status VARCHAR(50) DEFAULT 'published',
      faqs JSON,
      seo_data JSON,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Seed initial blog posts if empty
  const [blogRows] = await p.query("SELECT COUNT(*) as count FROM blogs;");
  const blogCount = Array.isArray(blogRows) && (blogRows[0] as any)?.count;
  if (blogCount === 0) {
    for (const blog of INITIAL_BLOGS) {
      await p.execute(
        `INSERT INTO blogs (
          id, slug, title, excerpt, content, featured_image, category,
          author, read_time, status, faqs, seo_data, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content);`,
        [
          blog.id,
          blog.slug,
          blog.title,
          blog.excerpt || "",
          blog.content,
          blog.featuredImage || "",
          blog.category,
          blog.author,
          blog.readTime,
          blog.status,
          JSON.stringify(blog.faqs || []),
          JSON.stringify(blog.seoData || {}),
        ]
      );
    }
    console.log(`MySQL blogs seeded with ${INITIAL_BLOGS.length} posts!`);
  }

  console.log("MySQL database tables (creators, admin_users, media_gallery, blogs) initialized successfully!");
}

/* =========================================================================
   CREATORS FUNCTIONS
   ========================================================================= */

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
    console.warn("MySQL fetch creators error:", err);
  }

  return [];
}

export async function saveCreatorToMySQL(creator: CreatorData): Promise<boolean> {
  if (typeof window !== "undefined") return false;

  const p = await getPool();
  if (!p) throw new Error("Could not initialize MySQL connection pool.");
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
}

export async function updateCreatorStatusInMySQL(id: string, status: string): Promise<boolean> {
  if (typeof window !== "undefined") return false;

  const p = await getPool();
  if (!p) throw new Error("Could not initialize MySQL connection pool.");
  await p.execute("UPDATE creators SET status = ? WHERE id = ?", [status, id]);
  return true;
}

/* =========================================================================
   ADMIN AUTH FUNCTIONS
   ========================================================================= */

export async function verifyAdminCredentialsInMySQL(username: string, password: string): Promise<boolean> {
  if (typeof window !== "undefined") return false;

  try {
    const p = await getPool();
    if (!p) return false;
    await initMySQLDatabase();

    const [rows] = await p.execute("SELECT * FROM admin_users WHERE username = ?", [username]);
    if (Array.isArray(rows) && rows.length > 0) {
      const admin = rows[0] as any;
      if (admin.password_hash === password) {
        return true;
      }
    }

    // Fallback to env default credentials if database record matches env
    const defaultUser = process.env.ADMIN_USERNAME || "admin";
    const defaultPass = process.env.ADMIN_PASSWORD || "kreative2026";
    if (username === defaultUser && password === defaultPass) {
      return true;
    }
  } catch (err) {
    console.warn("MySQL admin auth check error:", err);
  }

  return false;
}

/* =========================================================================
   MEDIA GALLERY ("IDEAS IN ORBIT") FUNCTIONS
   ========================================================================= */

export async function fetchMediaGalleryFromMySQL(): Promise<MediaItem[]> {
  if (typeof window !== "undefined") return [];

  try {
    const p = await getPool();
    if (!p) return [];
    await initMySQLDatabase();

    const [rows] = await p.query("SELECT * FROM media_gallery ORDER BY created_at DESC;");

    if (Array.isArray(rows) && rows.length > 0) {
      return rows.map((r: any) => ({
        id: r.id,
        type: r.type as "video" | "image",
        url: r.url,
        title: r.title,
        category: r.category,
        aspectRatio: r.aspect_ratio || "reel",
      }));
    }
  } catch (err) {
    console.warn("MySQL fetch media gallery error:", err);
  }

  return INITIAL_MEDIA_GALLERY;
}

export async function saveMediaItemToMySQL(item: MediaItem): Promise<boolean> {
  if (typeof window !== "undefined") return false;

  const p = await getPool();
  if (!p) throw new Error("Could not initialize MySQL connection pool.");
  await initMySQLDatabase();

  const sql = `
    INSERT INTO media_gallery (id, type, url, title, category, aspect_ratio, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE
      type = VALUES(type),
      url = VALUES(url),
      title = VALUES(title),
      category = VALUES(category),
      aspect_ratio = VALUES(aspect_ratio);
  `;

  await p.execute(sql, [
    item.id,
    item.type,
    item.url,
    item.title,
    item.category,
    item.aspectRatio || "reel",
  ]);

  return true;
}

export async function deleteMediaItemFromMySQL(id: string): Promise<boolean> {
  if (typeof window !== "undefined") return false;

  const p = await getPool();
  if (!p) throw new Error("Could not initialize MySQL connection pool.");
  await p.execute("DELETE FROM media_gallery WHERE id = ?", [id]);
  return true;
}

/* =========================================================================
   BLOGS & YOAST SEO FUNCTIONS
   ========================================================================= */

export async function fetchBlogsFromMySQL(includeDrafts = false): Promise<BlogPost[]> {
  if (typeof window !== "undefined") return [];

  try {
    const p = await getPool();
    if (!p) return [];
    await initMySQLDatabase();

    const query = includeDrafts
      ? "SELECT * FROM blogs ORDER BY created_at DESC;"
      : "SELECT * FROM blogs WHERE status = 'published' ORDER BY created_at DESC;";

    const [rows] = await p.query(query);

    if (Array.isArray(rows) && rows.length > 0) {
      return rows.map((r: any) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt || "",
        content: r.content,
        featuredImage: r.featured_image || "",
        category: r.category || "GROWTH",
        author: r.author || "Kreative Planet Team",
        readTime: r.read_time || "5 min read",
        status: r.status as "published" | "draft",
        faqs: typeof r.faqs === "string" ? JSON.parse(r.faqs) : r.faqs || [],
        seoData: typeof r.seo_data === "string" ? JSON.parse(r.seo_data) : r.seo_data || {},
        createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
        updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
      }));
    }
  } catch (err) {
    console.warn("MySQL fetch blogs error:", err);
  }

  return INITIAL_BLOGS;
}

export async function fetchBlogBySlugFromMySQL(slug: string): Promise<BlogPost | null> {
  if (typeof window !== "undefined") return null;

  try {
    const p = await getPool();
    if (!p) return null;
    await initMySQLDatabase();

    const [rows] = await p.execute("SELECT * FROM blogs WHERE slug = ?", [slug]);

    if (Array.isArray(rows) && rows.length > 0) {
      const r = rows[0] as any;
      return {
        id: r.id,
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt || "",
        content: r.content,
        featuredImage: r.featured_image || "",
        category: r.category || "GROWTH",
        author: r.author || "Kreative Planet Team",
        readTime: r.read_time || "5 min read",
        status: r.status as "published" | "draft",
        faqs: typeof r.faqs === "string" ? JSON.parse(r.faqs) : r.faqs || [],
        seoData: typeof r.seo_data === "string" ? JSON.parse(r.seo_data) : r.seo_data || {},
        createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
        updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
      };
    }
  } catch (err) {
    console.warn("MySQL fetch blog by slug error:", err);
  }

  return INITIAL_BLOGS.find((b) => b.slug === slug) || null;
}

export async function saveBlogToMySQL(blog: BlogPost): Promise<boolean> {
  if (typeof window !== "undefined") return false;

  const p = await getPool();
  if (!p) throw new Error("Could not initialize MySQL connection pool.");
  await initMySQLDatabase();

  const sql = `
    INSERT INTO blogs (
      id, slug, title, excerpt, content, featured_image, category,
      author, read_time, status, faqs, seo_data, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    ON DUPLICATE KEY UPDATE
      slug = VALUES(slug),
      title = VALUES(title),
      excerpt = VALUES(excerpt),
      content = VALUES(content),
      featured_image = VALUES(featured_image),
      category = VALUES(category),
      author = VALUES(author),
      read_time = VALUES(read_time),
      status = VALUES(status),
      faqs = VALUES(faqs),
      seo_data = VALUES(seo_data),
      updated_at = NOW();
  `;

  await p.execute(sql, [
    blog.id,
    blog.slug,
    blog.title,
    blog.excerpt || "",
    blog.content,
    blog.featuredImage || "",
    blog.category,
    blog.author,
    blog.readTime,
    blog.status,
    JSON.stringify(blog.faqs || []),
    JSON.stringify(blog.seoData || {}),
  ]);

  return true;
}

export async function deleteBlogFromMySQL(id: string): Promise<boolean> {
  if (typeof window !== "undefined") return false;

  const p = await getPool();
  if (!p) throw new Error("Could not initialize MySQL connection pool.");
  await p.execute("DELETE FROM blogs WHERE id = ?", [id]);
  return true;
}
