import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  VoiceModel: t.prismaField({
    type: "VoiceModel",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const result = await context.loaders.voiceModel.load(args.id);
      return result as NonNullable<typeof result>;
    },
  }),
  VoiceModels: t.prismaConnection(
    {
      type: "VoiceModel",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "VoiceModelsConnection" },
    { name: "VoiceModelsEdge" }
  ),
}));
