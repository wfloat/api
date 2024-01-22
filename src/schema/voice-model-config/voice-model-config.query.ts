import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  VoiceModelConfig: t.prismaField({
    type: "VoiceModelConfig",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.voiceModelConfig.load(args.id),
  }),
  VoiceModelConfigs: t.prismaConnection(
    {
      type: "VoiceModelConfig",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "VoiceModelConfigsConnection" },
    { name: "VoiceModelConfigsEdge" }
  ),
}));
