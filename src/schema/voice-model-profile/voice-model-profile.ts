import { builder } from "../../builder.js";
import "./voice-model-profile.query.js";
import "./voice-model-profile.mutation.js";

builder.prismaObject("VoiceModelProfile", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    confidence: t.exposeFloat("confidence"),
    fictional: t.exposeBoolean("fictional"),
    name: t.exposeString("name"),
    gender: t.exposeString("gender"),
    relevantTags: t.exposeStringList("relevantTags"),
    accent: t.exposeString("accent"),
    nativeLanguage: t.exposeString("nativeLanguage"),
    modelTrainedOnEnglishProbability: t.exposeFloat("modelTrainedOnEnglishProbability"),
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
        const result = await context.loaders.AIHubVoiceModel.load(root.voiceModelId);
        return result as NonNullable<typeof result>;
      },
    }),

    // Connections
  }),
});
