import { builder } from "../../builder.js";
import { db, create, update } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { VoiceModelConfig } from "@prisma/client";

type CreateVoiceModelConfigInputType = Omit<VoiceModelConfig, "id">;
const CreateVoiceModelConfigInput = builder.inputRef<CreateVoiceModelConfigInputType>(
  "CreateVoiceModelConfigInput"
);
CreateVoiceModelConfigInput.implement({
  fields: (t) => ({
    qualityScore: t.float({ required: true }),
    f0Curve: t.string({ required: true }),
    transposePitch: t.int({ required: true }),
    pitchExtractionMethod: t.string({ required: true }),
    searchFeatureRatio: t.float({ required: true }),
    filterRadius: t.int({ required: true }),
    audioResampling: t.int({ required: true }),
    volumeEnvelopeScaling: t.float({ required: true }),
    artifactProtection: t.float({ required: true }),
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
      return await create("VoiceModelConfig", context, args.input);
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
    qualityScore: t.float(),
    f0Curve: t.string(),
    transposePitch: t.int(),
    pitchExtractionMethod: t.string(),
    searchFeatureRatio: t.float(),
    filterRadius: t.int(),
    audioResampling: t.int(),
    volumeEnvelopeScaling: t.float(),
    artifactProtection: t.float(),
    voiceModelId: t.id(),
  }),
});
type UpdateVoiceModelConfigInputShape = typeof UpdateVoiceModelConfigInput.$inferInput;

const VoiceModelConfigNullability: { [K in keyof Omit<
  VoiceModelConfig,
  "createdById" | "updatedById" | "createdDate" | "updatedDate" | "isDeleted"
>]: boolean } = {
  id: false,
  qualityScore: false,
  f0Curve: false,
  transposePitch: false,
  pitchExtractionMethod: false,
  searchFeatureRatio: false,
  filterRadius: false,
  audioResampling: false,
  volumeEnvelopeScaling: false,
  artifactProtection: false,
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
      return await update("VoiceModelConfig", context, input);
    },
  })
);
