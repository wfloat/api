import { builder } from "../../builder.js";
import "./text-to-speech.query.js";
import "./text-to-speech.mutation.js";

builder.prismaObject("TextToSpeech", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    inputText: t.exposeString("inputText"),
    ouputUrl: t.exposeString("ouputUrl"),
    voiceModelId: t.exposeID("voiceModelId"),

    // Relations
    voiceModel: t.relation("voiceModel", {
      resolve: async (query, root, args, context, info) =>
        await context.loaders.voiceModel.load(root.voiceModelId),
    }),

    // Connections
  }),
});
