import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  AIHubVoiceModel: t.prismaField({
    type: "AIHubVoiceModel",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.aiHubVoiceModel.load(args.id),
  }),
  AIHubVoiceModels: t.prismaConnection(
    {
      type: "AIHubVoiceModel",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "AIHubVoiceModelsConnection" },
    { name: "AIHubVoiceModelsEdge" }
  ),
}));
