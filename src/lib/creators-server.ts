import { createServerFn } from "@tanstack/react-start";
import {
  saveCreatorToMySQL,
  fetchCreatorsFromMySQL,
  updateCreatorStatusInMySQL,
  initMySQLDatabase,
  verifyAdminCredentialsInMySQL,
  fetchMediaGalleryFromMySQL,
  saveMediaItemToMySQL,
  deleteMediaItemFromMySQL,
  fetchBlogsFromMySQL,
  fetchBlogBySlugFromMySQL,
  saveBlogToMySQL,
  deleteBlogFromMySQL,
} from "@/lib/mysql-db";
import { type CreatorData } from "@/lib/creator-store";
import { type MediaItem } from "@/lib/gallery-store";
import { type BlogPost } from "@/lib/blog-store";

/* =========================================================================
   CREATORS SERVER FUNCTIONS
   ========================================================================= */

export const saveCreatorServerFn = createServerFn({ method: "POST" })
  .validator((data: any) => data as CreatorData)
  .handler(async ({ data }) => {
    try {
      await initMySQLDatabase();
      const saved = await saveCreatorToMySQL(data);
      if (!saved) {
        return { success: false, error: "MySQL database save operation failed." };
      }
      return { success: true, creator: data };
    } catch (err: any) {
      console.error("saveCreatorServerFn Error:", err);
      return { success: false, error: err?.message || err?.sqlMessage || "Database server error." };
    }
  });

export const fetchCreatorsServerFn = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const creators = await fetchCreatorsFromMySQL();
      return { success: true, creators };
    } catch (err: any) {
      console.error("fetchCreatorsServerFn Error:", err);
      return { success: false, error: err?.message || "Failed to fetch creators from MySQL." };
    }
  });

export const updateCreatorStatusServerFn = createServerFn({ method: "POST" })
  .validator((data: { id: string; status: string }) => data)
  .handler(async ({ data }) => {
    try {
      await updateCreatorStatusInMySQL(data.id, data.status);
      return { success: true };
    } catch (err: any) {
      console.error("updateCreatorStatusServerFn Error:", err);
      return { success: false, error: err?.message || "Status update error." };
    }
  });

export const initDbServerFn = createServerFn({ method: "POST" })
  .handler(async () => {
    try {
      await initMySQLDatabase();
      return { success: true, message: "MySQL database initialized successfully on 86.107.77.32 (taskbaz3_kp)." };
    } catch (err: any) {
      console.error("initDbServerFn Error:", err);
      return { success: false, error: err?.message || err?.sqlMessage || "Failed DB init." };
    }
  });

/* =========================================================================
   ADMIN AUTH SERVER FUNCTIONS
   ========================================================================= */

export const verifyAdminServerFn = createServerFn({ method: "POST" })
  .validator((data: { username?: string; password?: string }) => data)
  .handler(async ({ data }) => {
    try {
      if (!data?.username || !data?.password) {
        return { success: false, error: "Username and password required." };
      }
      const isValid = await verifyAdminCredentialsInMySQL(data.username, data.password);
      if (isValid) {
        return { success: true, token: "kp_auth_valid_session_2026" };
      }
      return { success: false, error: "Invalid username or password credentials." };
    } catch (err: any) {
      console.error("verifyAdminServerFn Error:", err);
      return { success: false, error: err?.message || "Authentication server error." };
    }
  });

/* =========================================================================
   MEDIA GALLERY ("IDEAS IN ORBIT") SERVER FUNCTIONS
   ========================================================================= */

export const fetchMediaGalleryServerFn = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const items = await fetchMediaGalleryFromMySQL();
      return { success: true, items };
    } catch (err: any) {
      console.error("fetchMediaGalleryServerFn Error:", err);
      return { success: false, error: err?.message || "Failed to fetch gallery items from MySQL." };
    }
  });

export const saveMediaItemServerFn = createServerFn({ method: "POST" })
  .validator((data: any) => data as MediaItem)
  .handler(async ({ data }) => {
    try {
      await saveMediaItemToMySQL(data);
      return { success: true, item: data };
    } catch (err: any) {
      console.error("saveMediaItemServerFn Error:", err);
      return { success: false, error: err?.message || "Failed to save gallery item to MySQL." };
    }
  });

export const deleteMediaItemServerFn = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    try {
      await deleteMediaItemFromMySQL(data.id);
      return { success: true };
    } catch (err: any) {
      console.error("deleteMediaItemServerFn Error:", err);
      return { success: false, error: err?.message || "Failed to delete gallery item from MySQL." };
    }
  });

/* =========================================================================
   BLOGS SERVER FUNCTIONS
   ========================================================================= */

export const fetchBlogsServerFn = createServerFn({ method: "GET" })
  .validator((data: { includeDrafts?: boolean } | undefined) => data)
  .handler(async ({ data }) => {
    try {
      const blogs = await fetchBlogsFromMySQL(data?.includeDrafts || false);
      return { success: true, blogs };
    } catch (err: any) {
      console.error("fetchBlogsServerFn Error:", err);
      return { success: false, error: err?.message || "Failed to fetch blogs from MySQL." };
    }
  });

export const fetchBlogBySlugServerFn = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    try {
      const blog = await fetchBlogBySlugFromMySQL(data.slug);
      return { success: true, blog };
    } catch (err: any) {
      console.error("fetchBlogBySlugServerFn Error:", err);
      return { success: false, error: err?.message || "Failed to fetch blog by slug from MySQL." };
    }
  });

export const saveBlogServerFn = createServerFn({ method: "POST" })
  .validator((data: any) => data as BlogPost)
  .handler(async ({ data }) => {
    try {
      await saveBlogToMySQL(data);
      return { success: true, blog: data };
    } catch (err: any) {
      console.error("saveBlogServerFn Error:", err);
      return { success: false, error: err?.message || "Failed to save blog post to MySQL." };
    }
  });

export const deleteBlogServerFn = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    try {
      await deleteBlogFromMySQL(data.id);
      return { success: true };
    } catch (err: any) {
      console.error("deleteBlogServerFn Error:", err);
      return { success: false, error: err?.message || "Failed to delete blog post from MySQL." };
    }
  });
