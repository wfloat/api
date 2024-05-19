import { builder } from "../../builder.js";
import { db, create, update } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { VoiceModelBackupUrl } from "@prisma/client";

type CreateVoiceModelBackupUrlInputType = Omit<VoiceModelBackupUrl, "id">;
const CreateVoiceModelBackupUrlInput = builder.inputRef<CreateVoiceModelBackupUrlInputType>(
  "CreateVoiceModelBackupUrlInput"
);
CreateVoiceModelBackupUrlInput.implement({
  fields: (t) => ({
    url: t.string({ required: true }),
    voiceModelId: t.id({ required: true }),
  }),
});
type CreateVoiceModelBackupUrlInputShape = typeof CreateVoiceModelBackupUrlInput.$inferInput;

builder.mutationField("createVoiceModelBackupUrl", (t) =>
  t.prismaField({
    type: "VoiceModelBackupUrl",
    nullable: false,
    args: {
      input: t.arg({ type: CreateVoiceModelBackupUrlInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      return await create("VoiceModelBackupUrl", context, args.input);
    },
  })
);

type UpdateVoiceModelBackupUrlInputType = Required<Pick<VoiceModelBackupUrl, "id">> &
  Partial<Omit<VoiceModelBackupUrl, "id">>; // TODO: Make this cleaner
const UpdateVoiceModelBackupUrlInput = builder.inputRef<UpdateVoiceModelBackupUrlInputType>(
  "UpdateVoiceModelBackupUrlInput"
);
UpdateVoiceModelBackupUrlInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    url: t.string(),
    voiceModelId: t.id(),
  }),
});
type UpdateVoiceModelBackupUrlInputShape = typeof UpdateVoiceModelBackupUrlInput.$inferInput;

const VoiceModelBackupUrlNullability: { [K in keyof Omit<
  VoiceModelBackupUrl,
  "createdById" | "updatedById" | "createdDate" | "updatedDate" | "isDeleted"
>]: boolean } = {
  id: false,
  url: false,
  voiceModelId: false,
};

builder.mutationField("updateVoiceModelBackupUrl", (t) =>
  t.prismaField({
    type: "VoiceModelBackupUrl",
    nullable: false,
    args: {
      input: t.arg({ type: UpdateVoiceModelBackupUrlInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<VoiceModelBackupUrl>(
        { ...args.input },
        VoiceModelBackupUrlNullability
      );
      return await update("VoiceModelBackupUrl", context, input);
    },
  })
);
