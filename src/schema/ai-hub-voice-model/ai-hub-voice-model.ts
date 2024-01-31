import { builder } from "../../builder.js";
import "./ai-hub-voice-model.query.js";
import "./ai-hub-voice-model.mutation.js";
import { db } from "../../database.js";
import { PAGE_LIMIT } from "../../loaders.js";
import { VoiceModelBackupUrl } from "@prisma/client";

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
    checksumMD5ForWeights: t.exposeString("checksumMD5ForWeights"),

    // Relations
    derivedModel: t.relation("derivedModel", {
      nullable: true,
      resolve: async (query, root, args, context, info) =>
        root.derivedModelId ? await context.loaders.voiceModel.load(root.derivedModelId) : null,
    }),
    profile: t.relation("inferredProfile", {
      nullable: true,
      resolve: async (query, root, args, context, info) =>
        await context.loaders.profileFromAIHubVoiceModel.load(root.id),
    }),

    // Connections
    backupUrls: t.prismaConnection(
      {
        type: "VoiceModelBackupUrl",
        cursor: "id",
        resolve: async (query, parent, args, context, info) => {
          let requestedLimit = args.first ?? args.last ?? 0;
          let limit = Math.min(requestedLimit, PAGE_LIMIT);
          limit = limit + 1; // Retrieve an extra record used for pageInfo hasNextPage/hasPreviousPage

          let cursor = query.cursor?.id;
          let cursorRow: VoiceModelBackupUrl | null = null;
          if (cursor) {
            cursorRow = await context.loaders.voiceModelBackupUrl.load(cursor);
            // TODO: Error handle if cursorRow not found
          }

          // Based on https://the-guild.dev/blog/graphql-cursor-pagination-with-postgresql
          let result = await db
            .selectFrom("VoiceModelBackupUrl")
            .select(["id", "url"])

            .$if(args.first ? true : false, (qb) => qb.orderBy(["url asc", "id asc"]))
            .$if(args.last ? true : false, (qb) => qb.orderBy(["url desc", "id desc"]))

            // .$if(args.minDownloadCount ? true : false, (qb) =>
            //   qb.where("downloadCount", ">=", args.minDownloadCount!)
            // )

            .where("voiceModelId", "=", parent.id)

            .$if(args.after && cursorRow ? true : false, (qb) =>
              qb.where((eb) =>
                eb.or([
                  eb("url", "=", cursorRow?.url!).and("id", ">", cursorRow?.id!),
                  eb("url", ">", cursorRow?.url!),
                ])
              )
            )
            .$if(args.before && cursorRow ? true : false, (qb) =>
              qb.where((eb) =>
                eb.or([
                  eb("url", "=", cursorRow?.url!).and("id", "<", cursorRow?.id!),
                  eb("url", "<", cursorRow?.url!),
                ])
              )
            )

            .limit(limit)
            .execute();

          let ids = result.map((row) => row.id);
          let rows = await Promise.all(
            ids.map((id) => context.loaders.voiceModelBackupUrl.load(id))
          );

          if (rows.some((item) => item === null)) {
            throw new Error(
              "One or more records returned by the loader are either null or instanceof Error."
            );
          } else {
            if (args.last) {
              rows = rows.reverse();
            }
            return rows as VoiceModelBackupUrl[];
          }
        },
      },
      { name: "AIHubVoiceModelBackupUrlsConnection" },
      { name: "AIHubVoiceModelBackupUrlsEdge" }
    ),
  }),
});
