import DataLoader from "dataloader";
import { db } from "./database.js";
import { DB } from "../prisma/generated/kysely.js";
import { Prisma } from "@prisma/client";
import PrismaRuntime from "@prisma/client/runtime/library";

/*
import {
  AIHubVoiceModel,
  TextToSpeech,
  User,
  VoiceModel,
  VoiceModelBackupUrl,
  VoiceModelConfig,
  VoiceModelProfile,
} from "@prisma/client";
*/

export type ModelName = Prisma.ModelName;
// type PrismaModelName = ModelName;
export type PrismaModelType<N extends ModelName = ModelName> = Prisma.TypeMap["model"][N];
export type PrismaModelPayload<N extends ModelName = ModelName> = PrismaModelType<N>["payload"];
export type PrismaModel<N extends ModelName = ModelName> =
  PrismaRuntime.Types.Result.DefaultSelection<PrismaModelPayload<N>>;

export const PAGE_LIMIT = 100;

export function createLoaders() {
  return {
    aiHubVoiceModel: createLoader("AIHubVoiceModel", "id"),
    aiHubVoiceModelUsingChecksumMD5ForWeights: createLoader("AIHubVoiceModel", "checksumMD5ForWeights"),
    voiceModelBackupUrl: createLoader("VoiceModelBackupUrl", "id"),
    voiceModel: createLoader("VoiceModel", "id"),
    voiceModelConfig: createLoader("VoiceModelConfig", "id"),
    textToSpeech: createLoader("TextToSpeech", "id"),
    voiceModelProfile: createLoader("VoiceModelProfile", "id"),
    userUsingAccessKey: createLoader("User", "accessKey"),
    // 1 to 1 relation loaders
    modelConfigFromVoiceModel: createLoader("VoiceModelConfig", "voiceModelId"),
    sourceModelFromVoiceModel: createLoader("AIHubVoiceModel", "derivedModelId"),
    profileFromAIHubVoiceModel: createLoader("VoiceModelProfile", "voiceModelId"),
  }
}

function createLoader<T1 extends keyof DB & string, T2 extends PrismaModel<T1>>(
  tableName: T1,
  columnName: keyof DB[T1]
) {
  return new DataLoader<string, T2 | null>(
    (keys) =>
      new Promise(async (resolve) => {
        try {
          const rows: any = await db
            .selectFrom(tableName)
            .selectAll()
            .where(columnName as any, "in", keys)
            .execute();

          resolve(keys.map((key) => rows.find((row: any) => row[columnName] === key) || null));
        } catch (error) {
          console.error(`Error loading for ${tableName}:`, error);
          resolve(keys.map(() => null)); // Resolve with nulls in case of error
        }
      })
  );
}
