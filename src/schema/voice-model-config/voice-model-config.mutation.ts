import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { VoiceModelConfig } from "@prisma/client";

type CreateVoiceModelConfigInputType = Omit<VoiceModelConfig, "id">;
const CreateVoiceModelConfigInput = builder.inputRef<CreateVoiceModelConfigInputType>(
  "CreateVoiceModelConfigInput"
);
CreateVoiceModelConfigInput.implement({
  fields: (t) => ({
    voiceModelId: t.id({ required: true }),
  }),
});
type CreateVoiceModelConfigInputShape = typeof CreateVoiceModelConfigInput.$inferInput;

builder.mutationField("createVoiceModelConfig", (t) =>
  t.prismaField({
    type: "VoiceModelConfig",
    nullable: false,
    args: {
      input: t.arg({ type: CreateVoiceModelConfigInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const result = await db
        .insertInto("VoiceModelConfig")
        .values(args.input)
        .returning(["id"])
        .executeTakeFirstOrThrow();
      return context.loaders.voiceModelConfig.load(result.id);
    },
  })
);

type UpdateVoiceModelConfigInputType = Required<Pick<VoiceModelConfig, "id">> &
  Partial<Omit<VoiceModelConfig, "id">>; // TODO: Make this cleaner
const UpdateVoiceModelConfigInput = builder.inputRef<UpdateVoiceModelConfigInputType>(
  "UpdateVoiceModelConfigInput"
);
UpdateVoiceModelConfigInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    voiceModelId: t.id(),
  }),
});
type UpdateVoiceModelConfigInputShape = typeof UpdateVoiceModelConfigInput.$inferInput;

const VoiceModelConfigNullability: { [K in keyof VoiceModelConfig]: boolean } = {
  id: false,
  voiceModelId: false,
};

builder.mutationField("updateVoiceModelConfig", (t) =>
  t.prismaField({
    type: "VoiceModelConfig",
    nullable: false,
    args: {
      input: t.arg({ type: UpdateVoiceModelConfigInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<VoiceModelConfig>(
        { ...args.input },
        VoiceModelConfigNullability
      );
      input.id = undefined;

      const result = await db
        .updateTable("VoiceModelConfig")
        .set(input)
        .where("id", "=", args.input.id)
        .executeTakeFirstOrThrow();
      return context.loaders.voiceModelConfig.load(args.input.id);
    },
  })
);
