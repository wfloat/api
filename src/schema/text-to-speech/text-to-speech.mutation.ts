import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { TextToSpeech } from "@prisma/client";

type CreateTextToSpeechInputType = Omit<TextToSpeech, "id" | "outputUrl">;
const CreateTextToSpeechInput =
  builder.inputRef<CreateTextToSpeechInputType>("CreateTextToSpeechInput");
CreateTextToSpeechInput.implement({
  fields: (t) => ({
    inputText: t.string({ required: true }),
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
      const voiceModelConfig = await context.loaders.voiceModelConfig.load(args.input.voiceModelId);

      // text-to-speech request using args.input.inputText
      // Write response audio to shared volume
      // Make Gradio client request against the audio response file (don't forget to clear the tmp folder at the end of this)
      // Write the voice converted audio to S3
      // Delete the input and output audio
      // Get temporary signed URL
      // Set outputUrl to temporary signed URL

      const outputUrl = "";
      const input: Omit<TextToSpeech, "id"> = { ...args.input, outputUrl };

      const result = await db
        .insertInto("TextToSpeech")
        .values(input)
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
