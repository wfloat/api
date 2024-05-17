import { VoiceModelBackupUrl } from "@prisma/client";
import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { PAGE_LIMIT } from "../../loaders.js";

builder.queryFields((t) => ({
  VoiceModelBackupUrl: t.prismaField({
    type: "VoiceModelBackupUrl",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const result = await context.loaders.VoiceModelBackupUrl.load(args.id);
      return result as NonNullable<typeof result>;
    },
  }),
  VoiceModelBackupUrls: t.prismaConnection(
    {
      type: "VoiceModelBackupUrl",
      cursor: "id",
      resolve: async (query, parent, args, context, info) => {
        let requestedLimit = args.first ?? args.last ?? 0;
        let limit = Math.min(requestedLimit, PAGE_LIMIT);
        limit = limit + 1; // Retrieve an extra record used for pageInfo hasNextPage/hasPreviousPage

        let cursor = query.cursor?.id;

        let result = await db
          .selectFrom("VoiceModelBackupUrl")
          .select(["id", "url", "voiceModelId"])
          .$if(args.first ? true : false, (qb) => qb.orderBy(["url asc", "id asc"]))
          .$if(args.last ? true : false, (qb) => qb.orderBy(["url desc", "id desc"]))
          .$if(args.after && cursor ? true : false, (qb) => qb.where("id", ">", cursor!))
          .$if(args.before && cursor ? true : false, (qb) => qb.where("id", "<", cursor!))
          .limit(limit)
          .execute();

        let ids = result.map((row) => row.id);

        let rows = await Promise.all(ids.map((id) => context.loaders.VoiceModelBackupUrl.load(id)));
        if (rows.some((item) => item === null)) {
          throw new Error(
            "One or more records returned by the loader are either null or instanceof Error."
          );
        } else {
          return rows as VoiceModelBackupUrl[];
        }
      },
    },
    { name: "VoiceModelBackupUrlsConnection" },
    { name: "VoiceModelBackupUrlsEdge" }
  ),
}));

// let requestedLimit = args.first ?? args.last ?? 0;
//           let limit = Math.min(requestedLimit, PAGE_LIMIT);
//           // limit = limit + 1; // Retrieve an extra record used for pageInfo hasNextPage/hasPreviousPage

//           let cursor = query.cursor?.id;

//           let result = await db
//             .selectFrom("VoiceModelBackupUrl")
//             .select(["id", "url", "voiceModelId"])
//             .$if(args.first ? true : false, (qb) => qb.orderBy(["url asc", "id asc"]))
//             .$if(args.last ? true : false, (qb) => qb.orderBy(["url desc", "id desc"]))
//             .where("voiceModelId", "=", parent.id)
//             .$if(args.after && cursor ? true : false, (qb) => qb.where("id", ">", cursor!))
//             .$if(args.before && cursor ? true : false, (qb) => qb.where("id", "<", cursor!))
//             .limit(limit)
//             .execute();

//           let ids = result.map((row) => row.id);

//           let rows = await Promise.all(
//             ids.map((id) => context.loaders.voiceModelBackupUrl.load(id))
//           );
//           if (rows.some((item) => item === null)) {
//             throw new Error(
//               "One or more records returned by the loader are either null or instanceof Error."
//             );
//           } else {
//             // type blah = NonNullable<(typeof rows)[number]>[];
//             return [rows as VoiceModelBackupUrl[]];
//           }
