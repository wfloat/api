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
      const voiceModel = await context.loaders.voiceModel.load(args.input.voiceModelId);
      const voiceModelConfig = await context.loaders.modelConfigFromVoiceModel.load(
        args.input.voiceModelId
      );
      const aiHubVoiceModel = await context.loaders.sourceModelFromVoiceModel.load(
        args.input.voiceModelId
      );
      const voiceModelProfile = await context.loaders.profileFromAIHubVoiceModel.load(
        aiHubVoiceModel!.id
      );

      const voiceName = voiceModelProfile?.gender === "male" ? "Andrew" : "Ava";
      try {
        const ttsData = {
          voice: voiceName,
          inputText: args.input.inputText,
        };
        const ttsResponse = await fetch("http://localhost:5379/text_to_speech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ttsData),
        });

        if (!ttsResponse.ok) {
          throw new Error(`Text_to_speech service responded with status ${ttsResponse.status}`);
        }
        // const audioBlob = await ttsResponse.blob();

        // const formData = new FormData();
        // formData.append("audio", audioBlob);
        const voiceConvertArgs = {
          // inference_params: {
          //   transpose_pitch: voiceModelConfig!.transposePitch,
          //   pitch_extraction_method: voiceModelConfig!.pitchExtractionMethod,
          //   search_feature_ratio: voiceModelConfig!.searchFeatureRatio,
          //   filter_radius: voiceModelConfig!.filterRadius,
          //   audio_resampling: voiceModelConfig!.audioResampling,
          //   volume_envelope_scaling: voiceModelConfig!.volumeEnvelopeScaling,
          //   artifact_protection: voiceModelConfig!.artifactProtection,
          // },
          weights_sha256: voiceModel!.checksumSHA256ForWeights,
          f0_curve: voiceModelConfig!.f0Curve,
        };

        // formData.append("args", JSON.stringify(voiceConvertArgs));

        // const test = await fetch("http://localhost:5950/hello", {
        //   method: "GET",
        // });
        const audioBlob = await ttsResponse.blob();
        const formData = new FormData();
        formData.append("audio", audioBlob); // Append the audio file
        formData.append("args", JSON.stringify(voiceConvertArgs)); // Convert JSON data to string and append

        const convertResponse = await fetch("http://localhost:5950/voice_convert", {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: formData,
          // body: formData,
        });
        if (!convertResponse.ok) {
          throw new Error(
            `voice conversion service responded with status ${convertResponse.status}`
          );
        }
      } catch (error) {
        console.error("Failed to create text to speech", error);
      }

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
