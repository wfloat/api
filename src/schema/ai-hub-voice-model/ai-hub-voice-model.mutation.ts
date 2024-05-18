// import { create } from "domain";
import { builder } from "../../builder.js";
import { db, create, update } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { AIHubVoiceModel } from "@prisma/client";

type CreateAIHubVoiceModelInputType = Omit<AIHubVoiceModel, "id">;
const CreateAIHubVoiceModelInput = builder.inputRef<CreateAIHubVoiceModelInputType>(
  "CreateAIHubVoiceModelInput"
);
CreateAIHubVoiceModelInput.implement({
  fields: (t) => ({
    downloadCount: t.int({ required: true }),
    name: t.string(),
    filename: t.string({ required: true }),
    creatorText: t.string(),
    version: t.string({ required: true }),
    derivedModelId: t.id(),
    checksumMD5ForWeights: t.string({ required: true }),
  }),
});
type CreateAIHubVoiceModelInputShape = typeof CreateAIHubVoiceModelInput.$inferInput;

builder.mutationField("createAIHubVoiceModel", (t) =>
  t.prismaField({
    type: "AIHubVoiceModel",
    nullable: false,
    args: {
      input: t.arg({ type: CreateAIHubVoiceModelInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      return await create("AIHubVoiceModel", context, args.input);
    },
  })
);

type UpdateAIHubVoiceModelInputType = Required<Pick<AIHubVoiceModel, "id">> &
  Partial<Omit<AIHubVoiceModel, "id">>; // TODO: Make this cleaner
const UpdateAIHubVoiceModelInput = builder.inputRef<UpdateAIHubVoiceModelInputType>(
  "UpdateAIHubVoiceModelInput"
);
UpdateAIHubVoiceModelInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    downloadCount: t.int(),
    name: t.string(),
    filename: t.string(),
    creatorText: t.string(),
    version: t.string(),
    derivedModelId: t.id(),
    checksumMD5ForWeights: t.string(),
  }),
});
type UpdateAIHubVoiceModelInputShape = typeof UpdateAIHubVoiceModelInput.$inferInput;

const AIHubVoiceModelNullability: { [K in keyof AIHubVoiceModel]: boolean } = {
  id: false,
  downloadCount: false,
  name: true,
  filename: false,
  creatorText: true,
  version: false,
  derivedModelId: true,
  checksumMD5ForWeights: false,
  // Add more fields
  createdById: false,
  createdDate: false,
  updatedById: false,
  updatedDate: false,
  isDeleted: false,
};

builder.mutationField("updateAIHubVoiceModel", (t) =>
  t.prismaField({
    type: "AIHubVoiceModel",
    nullable: false,
    args: {
      input: t.arg({ type: UpdateAIHubVoiceModelInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<AIHubVoiceModel>(
        { ...args.input },
        AIHubVoiceModelNullability
      );
      return await update("AIHubVoiceModel", context, input);
    },
  })
);
