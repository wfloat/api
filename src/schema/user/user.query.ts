import { User } from "@prisma/client";
import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { PAGE_LIMIT } from "../../loaders.js";

builder.queryFields((t) => ({
  User: t.prismaField({
    type: "User",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const result = await context.loaders.User.load(args.id);
      return result as NonNullable<typeof result>;
    },
  }),
  Users: t.prismaConnection(
    {
      type: "User",
      cursor: "id",
      resolve: async (query, parent, args, context, info) => {
        let requestedLimit = args.first ?? args.last ?? 0;
        let limit = Math.min(requestedLimit, PAGE_LIMIT);
        limit = limit + 1; // Retrieve an extra record used for pageInfo hasNextPage/hasPreviousPage

        let cursor = query.cursor?.id;
        let cursorRow: User | null = null;
        if (cursor) {
          cursorRow = await context.loaders.User.load(cursor);
          // TODO: Error handle if cursorRow not found
        }

        // Based on https://the-guild.dev/blog/graphql-cursor-pagination-with-postgresql
        let result = await db
          .selectFrom("User")
          .select(["id", "name", "accessKey"])

          .$if(args.first ? true : false, (qb) => qb.orderBy(["name asc", "id asc"]))
          .$if(args.last ? true : false, (qb) => qb.orderBy(["name desc", "id desc"]))

          // .$if(args.minDownloadCount ? true : false, (qb) =>
          //   qb.where("downloadCount", ">=", args.minDownloadCount!)
          // )

          .$if(args.after && cursorRow ? true : false, (qb) =>
            qb.where((eb) =>
              eb.or([
                eb("name", "=", cursorRow?.name!).and("id", ">", cursorRow?.id!),
                eb("name", ">", cursorRow?.name!),
              ])
            )
          )
          .$if(args.before && cursorRow ? true : false, (qb) =>
            qb.where((eb) =>
              eb.or([
                eb("name", "=", cursorRow?.name!).and("id", "<", cursorRow?.id!),
                eb("name", "<", cursorRow?.name!),
              ])
            )
          )

          .limit(limit)
          .execute();

        let ids = result.map((row) => row.id);
        let rows = await Promise.all(ids.map((id) => context.loaders.User.load(id)));

        if (rows.some((item) => item === null)) {
          throw new Error(
            "One or more records returned by the loader are either null or instanceof Error."
          );
        } else {
          if (args.last) {
            rows = rows.reverse();
          }
          return rows as User[];
        }
      },
    },
    { name: "UsersConnection" },
    { name: "UsersEdge" }
  ),
}));
