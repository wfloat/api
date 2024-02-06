import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { TextToSpeech } from "@prisma/client";

type CreateTextToSpeechInputType = Omit<TextToSpeech, "id">;
const CreateTextToSpeechInput =
  builder.inputRef<CreateTextToSpeechInputType>("CreateTextToSpeechInput");
CreateTextToSpeechInput.implement({
  fields: (t) => ({
    inputText: t.string({ required: true }),
    outputUrl: t.string({ required: true }),
    voiceModelId: t.id({ required: true }),
  }),
});
type CreateTextToSpeechInputShape = typeof CreateTextToSpeechInput.$inferInput;

builder.mutationField("createTextToSpeech", (t) =>
  t.prismaField({
    type: "TextToSpeech",
    nullable: false,
    args: {
      input: t.arg({ type: CreateTextToSpeechInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const result = await db
        .insertInto("TextToSpeech")
        .values(args.input)
        .returning(["id"])
        .executeTakeFirstOrThrow();

      const row = await context.loaders.textToSpeech.load(result.id);
      return row as NonNullable<typeof row>;
    },
  })
);

type UpdateTextToSpeechInputType = Required<Pick<TextToSpeech, "id">> &
  Partial<Omit<TextToSpeech, "id">>; // TODO: Make this cleaner
const UpdateTextToSpeechInput =
  builder.inputRef<UpdateTextToSpeechInputType>("UpdateTextToSpeechInput");
UpdateTextToSpeechInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    inputText: t.string(),
    outputUrl: t.string(),
    voiceModelId: t.id(),
  }),
});
type UpdateTextToSpeechInputShape = typeof UpdateTextToSpeechInput.$inferInput;

const TextToSpeechNullability: { [K in keyof TextToSpeech]: boolean } = {
  id: false,
  inputText: false,
  outputUrl: false,
  voiceModelId: false,
};

builder.mutationField("updateTextToSpeech", (t) =>
  t.prismaField({
    type: "TextToSpeech",
    nullable: false,
    args: {
      input: t.arg({ type: UpdateTextToSpeechInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<TextToSpeech>(
        { ...args.input },
        TextToSpeechNullability
      );
      input.id = undefined;

      const result = await db
        .updateTable("TextToSpeech")
        .set(input)
        .where("id", "=", args.input.id)
        .executeTakeFirstOrThrow();

      const row = await context.loaders.textToSpeech.load(args.input.id);
      return row as NonNullable<typeof row>;
    },
  })
);
