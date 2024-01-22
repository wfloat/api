import { builder } from "../../builder.js";
import "./voice-model-config.query.js";
import "./voice-model-config.mutation.js";

builder.prismaObject("VoiceModelConfig", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    voiceModelId: t.exposeID("voiceModelId"),

    // Relations
    voiceModel: t.relation("voiceModel", {
      resolve: async (query, root, args, context, info) =>
        await context.loaders.voiceModel.load(root.voiceModelId),
    }),

    // Connections
  }),
});
