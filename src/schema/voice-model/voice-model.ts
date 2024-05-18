import { builder } from "../../builder.js";
import "./voice-model.query.js";
import "./voice-model.mutation.js";

builder.prismaObject("VoiceModel", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    filesizeForWeights: t.exposeInt("filesizeForWeights"),
    filesizeForAdded: t.exposeInt("filesizeForAdded"),
    checksumMD5ForAdded: t.exposeString("checksumMD5ForAdded"),
    checksumMD5ForWeights: t.exposeString("checksumMD5ForWeights"),
    checksumSHA256ForAdded: t.exposeString("checksumSHA256ForAdded"),
    checksumSHA256ForWeights: t.exposeString("checksumSHA256ForWeights"),
    hidden: t.exposeBoolean("hidden"),
    processed: t.exposeBoolean("processed"),
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
    modelConfig: t.relation("modelConfig", {
      nullable: true,
      resolve: async (query, root, args, context, info) =>
        await context.loaders.ModelConfigFromVoiceModel.load(root.id),
    }),
    sourceModel: t.relation("sourceModel", {
      nullable: true,
      resolve: async (query, root, args, context, info) =>
        await context.loaders.SourceModelFromVoiceModel.load(root.id),
    }),

    // // Connections
    // textToSpeeches: t.prismaConnection(
    //   {
    //     type: "TextToSpeech",
    //     cursor: "id",
    //     resolve: async (query, parent, args, context, info) => undefined,
    //   },
    //   { name: "VoiceModelTextToSpeechesConnection" },
    //   { name: "VoiceModelTextToSpeechesEdge" }
    // ),
  }),
});
