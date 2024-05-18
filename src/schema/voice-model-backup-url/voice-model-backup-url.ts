import { builder } from "../../builder.js";
import "./voice-model-backup-url.query.js";
import "./voice-model-backup-url.mutation.js";

builder.prismaObject("VoiceModelBackupUrl", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    url: t.exposeString("url"),
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
