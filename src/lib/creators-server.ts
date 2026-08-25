import { createServerFn } from "@tanstack/react-start";
import { saveCreatorToMySQL, fetchCreatorsFromMySQL, updateCreatorStatusInMySQL, initMySQLDatabase } from "@/lib/mysql-db";
import { type CreatorData } from "@/lib/creator-store";

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
