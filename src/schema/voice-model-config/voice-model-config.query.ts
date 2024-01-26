import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  VoiceModelConfig: t.prismaField({
    type: "VoiceModelConfig",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const result = await context.loaders.voiceModelConfig.load(args.id);
      return result as NonNullable<typeof result>;
    },
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
