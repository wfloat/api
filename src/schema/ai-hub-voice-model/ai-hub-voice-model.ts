import { builder } from "../../builder.js";
import "./ai-hub-voice-model.query.js";
import "./ai-hub-voice-model.mutation.js";

builder.prismaObject("AIHubVoiceModel", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    downloadCount: t.exposeInt("downloadCount"),
    name: t.exposeString("name", { nullable: true }),
    filename: t.exposeString("filename"),
    creatorText: t.exposeString("creatorText", { nullable: true }),
    version: t.exposeString("version"),
    derivedModelId: t.exposeID("derivedModelId", { nullable: true }),
    // Relations
    derivedModel: t.relation("derivedModel", {
      nullable: true,
      resolve: async (query, root, args, context, info) =>
        root.derivedModelId ? await context.loaders.voiceModel.load(root.derivedModelId) : null,
    }),
    // Connections
    backupUrls: t.relatedConnection(
      "backupUrls",
      {
        cursor: "id",
        resolve: (query, parent, args, context, info) => undefined,
      },
      { name: "AIHubVoiceModelBackupUrlsConnection" },
      { name: "AIHubVoiceModelBackupUrlsEdge" }
    ),
  }),
});
