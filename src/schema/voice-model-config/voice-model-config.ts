import { builder } from "../../builder.js";
// import "./voice-model-config.query.js";
// import "./voice-model-config.mutation.js";

builder.prismaObject("VoiceModelConfig", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    qualityScore: t.exposeFloat("qualityScore"),
    f0Curve: t.exposeString("f0Curve"),
    transposePitch: t.exposeInt("transposePitch"),
    pitchExtractionMethod: t.exposeString("pitchExtractionMethod"),
    searchFeatureRatio: t.exposeFloat("searchFeatureRatio"),
    filterRadius: t.exposeInt("filterRadius"),
    audioResampling: t.exposeInt("audioResampling"),
    volumeEnvelopeScaling: t.exposeFloat("volumeEnvelopeScaling"),
    artifactProtection: t.exposeFloat("artifactProtection"),
    voiceModelId: t.exposeID("voiceModelId"),

    // Relations
    voiceModel: t.relation("voiceModel", {
      resolve: async (query, root, args, context, info) => {
        const result = await context.loaders.voiceModel.load(root.voiceModelId);
        return result as NonNullable<typeof result>;
      },
    }),

    // Connections
  }),
});
