import { builder } from "../../builder.js";
import "./ai-hub-voice-model.query.js";
import "./ai-hub-voice-model.mutation.js";
import { db } from "../../database.js";
import { DEFAULT_LIMIT as PAGE_LIMIT } from "../../loaders.js";
import { parsePrismaCursor } from "@pothos/plugin-prisma";

builder.prismaObject("AIHubVoiceModel", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    downloadCount: t.exposeInt("downloadCount"),
    name: t.exposeString("name", { nullable: true }),
    filename: t.exposeString("filename"),
    creatorText: t.exposeString("creatorText", { nullable: true }),
    version: t.exposeString("version"),
    derivedModelId: t.exposeID("derivedModelId", { nullable: true }),

    // Relations
    derivedModel: t.relation("derivedModel", {
      nullable: true,
      resolve: async (query, root, args, context, info) =>
        root.derivedModelId ? await context.loaders.voiceModel.load(root.derivedModelId) : null,
    }),

    // Connections
    backupUrls: t.relatedConnection(
      "backupUrls",
      {
        cursor: "id",
        resolve: async (query, parent, args, context, info) => {
          let requestedLimit = args.first ?? args.last ?? 0;
          let limit = Math.min(requestedLimit, PAGE_LIMIT);
          // limit = limit + 1; // Retrieve an extra record used for pageInfo hasNextPage/hasPreviousPage

          let cursor = query.cursor?.id;

          let result = await db
            .selectFrom("VoiceModelBackupUrl")
            .select(["id", "url", "voiceModelId"])
            .$if(args.first ? true : false, (qb) => qb.orderBy(["url asc", "id asc"]))
            .$if(args.last ? true : false, (qb) => qb.orderBy(["url desc", "id desc"]))
            .where("voiceModelId", "=", parent.id)
            .$if(args.after && cursor ? true : false, (qb) => qb.where("id", ">", cursor!))
            .$if(args.before && cursor ? true : false, (qb) => qb.where("id", "<", cursor!))
            .limit(limit)
            .execute();

          let ids = result.map((row) => row.id);

          return await context.loaders.voiceModelBackupUrl.loadMany(ids);
        },
      },
      { name: "AIHubVoiceModelBackupUrlsConnection" },
      { name: "AIHubVoiceModelBackupUrlsEdge" }
    ),
  }),
});
