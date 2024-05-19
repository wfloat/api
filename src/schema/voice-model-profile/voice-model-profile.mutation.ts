import { builder } from "../../builder.js";
import { db, create, update } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { VoiceModelProfile } from "@prisma/client";

type CreateVoiceModelProfileInputType = Omit<VoiceModelProfile, "id">;
const CreateVoiceModelProfileInput = builder.inputRef<CreateVoiceModelProfileInputType>(
  "CreateVoiceModelProfileInput"
);
CreateVoiceModelProfileInput.implement({
  fields: (t) => ({
    confidence: t.float({ required: true }),
    fictional: t.boolean({ required: true }),
    name: t.string({ required: true }),
    gender: t.string({ required: true }),
    relevantTags: t.stringList({ required: true }),
    accent: t.string({ required: true }),
    nativeLanguage: t.string({ required: true }),
    modelTrainedOnEnglishProbability: t.float({ required: true }),
    voiceModelId: t.id({ required: true }),
  }),
});
type CreateVoiceModelProfileInputShape = typeof CreateVoiceModelProfileInput.$inferInput;

builder.mutationField("createVoiceModelProfile", (t) =>
  t.prismaField({
    type: "VoiceModelProfile",
    nullable: false,
    args: {
      input: t.arg({ type: CreateVoiceModelProfileInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      return await create("VoiceModelProfile", context, args.input);
    },
  })
);

type UpdateVoiceModelProfileInputType = Required<Pick<VoiceModelProfile, "id">> &
  Partial<Omit<VoiceModelProfile, "id">>; // TODO: Make this cleaner
const UpdateVoiceModelProfileInput = builder.inputRef<UpdateVoiceModelProfileInputType>(
  "UpdateVoiceModelProfileInput"
);
UpdateVoiceModelProfileInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    confidence: t.float(),
    fictional: t.boolean(),
    name: t.string(),
    gender: t.string(),
    relevantTags: t.stringList(),
    accent: t.string(),
    nativeLanguage: t.string(),
    modelTrainedOnEnglishProbability: t.float(),
    voiceModelId: t.id(),
  }),
});
type UpdateVoiceModelProfileInputShape = typeof UpdateVoiceModelProfileInput.$inferInput;

const VoiceModelProfileNullability: { [K in keyof Omit<
  VoiceModelProfile,
  "createdById" | "updatedById" | "createdDate" | "updatedDate" | "isDeleted"
>]: boolean } = {
  id: false,
  confidence: false,
  fictional: false,
  name: false,
  gender: false,
  relevantTags: false,
  accent: false,
  nativeLanguage: false,
  modelTrainedOnEnglishProbability: false,
  voiceModelId: false,
};

builder.mutationField("updateVoiceModelProfile", (t) =>
  t.prismaField({
    type: "VoiceModelProfile",
    nullable: false,
    args: {
      input: t.arg({ type: UpdateVoiceModelProfileInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<VoiceModelProfile>(
        { ...args.input },
        VoiceModelProfileNullability
      );
      return await update("VoiceModelProfile", context, input);
    },
  })
);
