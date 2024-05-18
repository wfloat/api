import { builder } from "../../builder.js";
import "./text-to-speech.query.js";
import "./text-to-speech.mutation.js";

builder.prismaObject("TextToSpeech", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    inputText: t.exposeString("inputText"),
    outputUrl: t.exposeString("outputUrl"),
    voiceModelId: t.exposeID("voiceModelId"),
    createdDate: t.field({
      type: "Date",
      nullable: true,
      resolve: (parent) => parent.createdDate,
    }),
    updatedDate: t.field({
      type: "Date",
      nullable: true,
      resolve: (parent) => parent.updatedDate,
    }),

    // Relations
    voiceModel: t.relation("voiceModel", {
      resolve: async (query, root, args, context, info) => {
        const result = await context.loaders.VoiceModel.load(root.voiceModelId);
        return result as NonNullable<typeof result>;
      },
    }),

    // Connections
  }),
});
