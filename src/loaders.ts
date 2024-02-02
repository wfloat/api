import DataLoader from "dataloader";
import { db } from "./database.js";
import {
  AIHubVoiceModel,
  TextToSpeech,
  VoiceModel,
  VoiceModelBackupUrl,
  VoiceModelConfig,
  VoiceModelProfile,
} from "@prisma/client";

export const PAGE_LIMIT = 100;

export function createLoaders() {
  return {
    // TODO: Make these use the same query functions instead of having their own
    aiHubVoiceModel: new DataLoader<string, AIHubVoiceModel | null>(
      (ids) =>
        new Promise(async (resolve) => {
          try {
            const rows = await db
              .selectFrom("AIHubVoiceModel")
              .selectAll()
              .where("id", "in", ids)
              .execute();

            resolve(ids.map((id) => rows.find((row) => row.id === id) || null));
          } catch (error) {
            console.error("Error loading AIHubVoiceModel:", error);
            resolve(ids.map(() => null)); // Resolve with nulls in case of error
          }
        })
    ),
    aiHubVoiceModelUsingChecksumMD5ForWeights: new DataLoader<string, AIHubVoiceModel | null>(
      (keys) =>
        new Promise(async (resolve) => {
          try {
            const rows = await db
              .selectFrom("AIHubVoiceModel")
              .selectAll()
              .where("checksumMD5ForWeights", "in", keys)
              .execute();

            resolve(
              keys.map((key) => rows.find((row) => row.checksumMD5ForWeights === key) || null)
            );
          } catch (error) {
            console.error("Error loading AIHubVoiceModel:", error);
            resolve(keys.map(() => null)); // Resolve with nulls in case of error
          }
        })
    ),
    voiceModelBackupUrl: new DataLoader<string, VoiceModelBackupUrl | null>(
      (ids) =>
        new Promise(async (resolve) => {
          try {
            const rows = await db
              .selectFrom("VoiceModelBackupUrl")
              .selectAll()
              .where("id", "in", ids)
              .execute();

            resolve(ids.map((id) => rows.find((row) => row.id === id) || null));
          } catch (error) {
            console.error("Error loading voiceModelBackupUrl:", error);
            resolve(ids.map(() => null)); // Resolve with nulls in case of error
          }
        })
    ),
    voiceModel: new DataLoader<string, VoiceModel | null>(
      (ids) =>
        new Promise(async (resolve) => {
          try {
            const rows = await db
              .selectFrom("VoiceModel")
              .selectAll()
              .where("id", "in", ids)
              .execute();

            resolve(ids.map((id) => rows.find((row) => row.id === id) || null));
          } catch (error) {
            console.error("Error loading voiceModel:", error);
            resolve(ids.map(() => null)); // Resolve with nulls in case of error
          }
        })
    ),
    voiceModelConfig: new DataLoader<string, VoiceModelConfig | null>(
      (ids) =>
        new Promise(async (resolve) => {
          try {
            const rows = await db
              .selectFrom("VoiceModelConfig")
              .selectAll()
              .where("id", "in", ids)
              .execute();

            resolve(ids.map((id) => rows.find((row) => row.id === id) || null));
          } catch (error) {
            console.error("Error loading voiceModelConfig:", error);
            resolve(ids.map(() => null)); // Resolve with nulls in case of error
          }
        })
    ),
    textToSpeech: new DataLoader<string, TextToSpeech | null>(
      (ids) =>
        new Promise(async (resolve) => {
          try {
            const rows = await db
              .selectFrom("TextToSpeech")
              .selectAll()
              .where("id", "in", ids)
              .execute();

            resolve(ids.map((id) => rows.find((row) => row.id === id) || null));
          } catch (error) {
            console.error("Error loading TextToSpeech:", error);
            resolve(ids.map(() => null)); // Resolve with nulls in case of error
          }
        })
    ),
    voiceModelProfile: new DataLoader<string, VoiceModelProfile | null>(
      (ids) =>
        new Promise(async (resolve) => {
          try {
            const rows = await db
              .selectFrom("VoiceModelProfile")
              .selectAll()
              .where("id", "in", ids)
              .execute();

            resolve(ids.map((id) => rows.find((row) => row.id === id) || null));
          } catch (error) {
            console.error("Error loading VoiceModelProfile:", error);
            resolve(ids.map(() => null)); // Resolve with nulls in case of error
          }
        })
    ),

    // 1 to 1 relation loaders
    modelConfigFromVoiceModel: new DataLoader<string, VoiceModelConfig | null>(
      (ids) =>
        new Promise(async (resolve) => {
          try {
            const rows = await db
              .selectFrom("VoiceModelConfig")
              .selectAll()
              .where("voiceModelId", "in", ids)
              .execute();

            resolve(ids.map((id) => rows.find((row) => row.voiceModelId === id) || null));
          } catch (error) {
            console.error("Error loading VoiceModelConfig:", error);
            resolve(ids.map(() => null)); // Resolve with nulls in case of error
          }
        })
    ),
    sourceModelFromVoiceModel: new DataLoader<string, AIHubVoiceModel | null>(
      (ids) =>
        new Promise(async (resolve) => {
          try {
            const rows = await db
              .selectFrom("AIHubVoiceModel")
              .selectAll()
              .where("derivedModelId", "in", ids)
              .execute();

            resolve(ids.map((id) => rows.find((row) => row.derivedModelId === id) || null));
          } catch (error) {
            console.error("Error loading AIHubVoiceModel:", error);
            resolve(ids.map(() => null)); // Resolve with nulls in case of error
          }
        })
    ),
    profileFromAIHubVoiceModel: new DataLoader<string, VoiceModelProfile | null>(
      (ids) =>
        new Promise(async (resolve) => {
          try {
            const rows = await db
              .selectFrom("VoiceModelProfile")
              .selectAll()
              .where("voiceModelId", "in", ids)
              .execute();

            resolve(ids.map((id) => rows.find((row) => row.voiceModelId === id) || null));
          } catch (error) {
            console.error("Error loading VoiceModelProfile:", error);
            resolve(ids.map(() => null)); // Resolve with nulls in case of error
          }
        })
    ),
  };
}
