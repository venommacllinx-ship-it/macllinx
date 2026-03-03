import { createDatabase } from "@kilocode/app-builder-db";
import * as schema from "./schema";

// Lazy initialization - database is only created when first accessed
let dbInstance: ReturnType<typeof createDatabase<typeof schema>> | null = null;

export function getDb() {
  if (!dbInstance) {
    dbInstance = createDatabase(schema);
  }
  return dbInstance;
}

// Export db for backwards compatibility (lazy access)
export const db = new Proxy({} as ReturnType<typeof createDatabase<typeof schema>>, {
  get(target, prop) {
    const db = getDb();
    return db[prop as keyof typeof db];
  }
});

export * from "./schema";
