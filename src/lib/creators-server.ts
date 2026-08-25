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
} from "@/lib/mysql-db";
import { type CreatorData } from "@/lib/creator-store";
import { type MediaItem } from "@/lib/gallery-store";

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
