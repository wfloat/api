import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  VoiceModelBackupUrl: t.prismaField({
    type: "VoiceModelBackupUrl",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.voiceModelBackupUrl.load(args.id),
  }),
  VoiceModelBackupUrls: t.prismaConnection(
    {
      type: "VoiceModelBackupUrl",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "VoiceModelBackupUrlsConnection" },
    { name: "VoiceModelBackupUrlsEdge" }
  ),
}));
