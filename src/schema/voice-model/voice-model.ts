import { builder } from "../../builder.js";
import "./voice-model.query.js";
import "./voice-model.mutation.js";

builder.prismaObject("VoiceModel", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    filesize: t.exposeInt("filesize"),
    checksumMD5ForAdded: t.exposeString("checksumMD5ForAdded"),
    checksumMD5ForWeights: t.exposeString("checksumMD5ForWeights"),
    checksumSHA256ForAdded: t.exposeString("checksumSHA256ForAdded"),
    checksumSHA256ForWeights: t.exposeString("checksumSHA256ForWeights"),
    // Relations
    sourceModel: t.relation("sourceModel", {
      nullable: true,
      resolve: async (query, root, args, context, info) =>
        await context.loaders.sourceModelFromVoiceModel.load(root.id),
    }),
    // Connections
  }),
});