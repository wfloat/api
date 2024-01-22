import DataLoader from "dataloader";
import { db } from "./database.js";
import { AIHubVoiceModel, VoiceModelBackupUrl } from "@prisma/client";
// import { Post, Account } from "@prisma/client";
// import { Account } from "../prisma/generated/kysely.js";

export const DEFAULT_LIMIT = 50;

// TODO: Add to a context type
export function createLoaders() {
  return {
    // TODO: Make these use the same query functions instead of having their own
    aiHubVoiceModel: new DataLoader<string, AIHubVoiceModel | null>(async (ids) => {
      const rows = await db
        .selectFrom("AIHubVoiceModel")
        .selectAll()
        .where("id", "in", ids)
        .execute();

      return ids.map((id) => rows.find((row) => row.id === id) || null);
    }),
    voiceModelBackupUrl: new DataLoader<string, VoiceModelBackupUrl | null>(async (ids) => {
      const rows = await db
        .selectFrom("VoiceModelBackupUrl")
        .selectAll()
        .where("id", "in", ids)
        .execute();

      return ids.map((id) => rows.find((row) => row.id === id) || null);
    }),
  };
}
