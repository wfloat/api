import { AIHubVoiceModel } from "@prisma/client";
import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { PAGE_LIMIT } from "../../loaders.js";

builder.queryFields((t) => ({
  AIHubVoiceModel: t.prismaField({
    type: "AIHubVoiceModel",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const result = await context.loaders.aiHubVoiceModel.load(args.id);
      return result as NonNullable<typeof result>;
    },
  }),
  AIHubVoiceModels: t.prismaConnection(
    {
      type: "AIHubVoiceModel",
      cursor: "id",
      args: {
        minDownloadCount: t.arg.int(),
      },
      resolve: async (query, parent, args, context, info) => {
        let requestedLimit = args.first ?? args.last ?? 0;
        let limit = Math.min(requestedLimit, PAGE_LIMIT);
        limit = limit + 1; // Retrieve an extra record used for pageInfo hasNextPage/hasPreviousPage

        let cursor = query.cursor?.id;
        let cursorRow: AIHubVoiceModel | null = null;
        if (cursor) {
          cursorRow = await context.loaders.aiHubVoiceModel.load(cursor);
          // TODO: Error handle if cursorRow not found
        }

        // Based on https://the-guild.dev/blog/graphql-cursor-pagination-with-postgresql
        let result = await db
          .selectFrom("AIHubVoiceModel")
          .select(["id", "filename"])

          .$if(args.first ? true : false, (qb) => qb.orderBy(["filename asc", "id asc"]))
          .$if(args.last ? true : false, (qb) => qb.orderBy(["filename desc", "id desc"]))

          .$if(args.minDownloadCount ? true : false, (qb) =>
            qb.where("downloadCount", ">=", args.minDownloadCount!)
          )

          .$if(args.after && cursorRow ? true : false, (qb) =>
            qb.where((eb) =>
              eb.or([
                eb("filename", "=", cursorRow?.filename!).and("id", ">", cursorRow?.id!),
                eb("filename", ">", cursorRow?.filename!),
              ])
            )
          )
          .$if(args.before && cursorRow ? true : false, (qb) =>
            qb.where((eb) =>
              eb.or([
                eb("filename", "=", cursorRow?.filename!).and("id", "<", cursorRow?.id!),
                eb("filename", "<", cursorRow?.filename!),
              ])
            )
          )

          .limit(limit)
          .execute();

        let ids = result.map((row) => row.id);
        let rows = await Promise.all(ids.map((id) => context.loaders.aiHubVoiceModel.load(id)));

        if (rows.some((item) => item === null)) {
          throw new Error(
            "One or more records returned by the loader are either null or instanceof Error."
          );
        } else {
          if (args.last) {
            rows = rows.reverse();
          }
          return rows as AIHubVoiceModel[];
        }
      },
    },
    { name: "AIHubVoiceModelsConnection" },
    { name: "AIHubVoiceModelsEdge" }
  ),
}));
