import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { VoiceModel } from "@prisma/client";

type CreateVoiceModelInputType = Omit<VoiceModel, "id">;
const CreateVoiceModelInput = builder.inputRef<CreateVoiceModelInputType>("CreateVoiceModelInput");
CreateVoiceModelInput.implement({
  fields: (t) => ({
    filesize: t.int({ required: true }),
    checksumMD5ForAdded: t.string({ required: true }),
    checksumMD5ForWeights: t.string({ required: true }),
    checksumSHA256ForAdded: t.string({ required: true }),
    checksumSHA256ForWeights: t.string({ required: true }),
    hidden: t.boolean({ required: true }),
    name: t.string({ required: true }),
    processed: t.boolean({ required: true }),
  }),
});
type CreateVoiceModelInputShape = typeof CreateVoiceModelInput.$inferInput;

builder.mutationField("createVoiceModel", (t) =>
  t.prismaField({
    type: "VoiceModel",
    nullable: false,
    args: {
      input: t.arg({ type: CreateVoiceModelInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const result = await db
        .insertInto("VoiceModel")
        .values(args.input)
        .returning(["id"])
        .executeTakeFirstOrThrow();

      const row = await context.loaders.voiceModel.load(result.id);
      return row as NonNullable<typeof row>;
    },
  })
);

type UpdateVoiceModelInputType = Required<Pick<VoiceModel, "id">> & Partial<Omit<VoiceModel, "id">>; // TODO: Make this cleaner
const UpdateVoiceModelInput = builder.inputRef<UpdateVoiceModelInputType>("UpdateVoiceModelInput");
UpdateVoiceModelInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    filesize: t.int(),
    checksumMD5ForAdded: t.string(),
    checksumMD5ForWeights: t.string(),
    checksumSHA256ForAdded: t.string(),
    checksumSHA256ForWeights: t.string(),
    hidden: t.boolean(),
    name: t.string(),
    processed: t.boolean(),
  }),
});
type UpdateVoiceModelInputShape = typeof UpdateVoiceModelInput.$inferInput;

const VoiceModelNullability: { [K in keyof VoiceModel]: boolean } = {
  id: false,
  filesize: false,
  checksumMD5ForAdded: false,
  checksumMD5ForWeights: false,
  checksumSHA256ForAdded: false,
  checksumSHA256ForWeights: false,
  hidden: false,
  name: false,
  processed: false,
};

builder.mutationField("updateVoiceModel", (t) =>
  t.prismaField({
    type: "VoiceModel",
    nullable: false,
    args: {
      input: t.arg({ type: UpdateVoiceModelInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<VoiceModel>(
        { ...args.input },
        VoiceModelNullability
      );
      input.id = undefined;

      const result = await db
        .updateTable("VoiceModel")
        .set(input)
        .where("id", "=", args.input.id)
        .executeTakeFirstOrThrow();

      const row = await context.loaders.voiceModel.load(args.input.id);
      return row as NonNullable<typeof row>;
    },
  })
);
