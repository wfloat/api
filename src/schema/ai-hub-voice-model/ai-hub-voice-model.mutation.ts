import { builder } from "../../builder.js";
import { db } from "../../database.js";
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
      const result = await db
        .insertInto("AIHubVoiceModel")
        .values(args.input)
        .returning(["id"])
        .executeTakeFirstOrThrow();

      const row = await context.loaders.aiHubVoiceModel.load(result.id);
      return row as NonNullable<typeof row>;
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
      input.id = undefined;

      const result = await db
        .updateTable("AIHubVoiceModel")
        .set(input)
        .where("id", "=", args.input.id)
        .executeTakeFirstOrThrow();

      const row = await context.loaders.aiHubVoiceModel.load(args.input.id);
      return row as NonNullable<typeof row>;
    },
  })
);
