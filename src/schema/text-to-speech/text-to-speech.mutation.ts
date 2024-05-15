import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { TextToSpeech } from "@prisma/client";
import { generateSpeechSignedUrl, uploadSpeechToS3 } from "../../util/aws.js";

type CreateTextToSpeechInputType = Omit<TextToSpeech, "id" | "outputUrl" | "userId">;
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
      throw Error("Commented out");
    },
    // {
    //   const voiceModel = await context.loaders.voiceModel.load(args.input.voiceModelId);
    //   const voiceModelConfig = await context.loaders.modelConfigFromVoiceModel.load(
    //     args.input.voiceModelId
    //   );
    //   const aiHubVoiceModel = await context.loaders.sourceModelFromVoiceModel.load(
    //     args.input.voiceModelId
    //   );
    //   const voiceModelProfile = await context.loaders.profileFromAIHubVoiceModel.load(
    //     aiHubVoiceModel!.id
    //   );

    //   const voiceName = voiceModelProfile?.gender === "male" ? "Andrew" : "Ava";

    //   let inputText = args.input.inputText;
    //   if (inputText.length > 1250) {
    //     inputText = inputText.substring(0, 1250);
    //   }

    //   try {
    //     const ttsData = {
    //       voice: voiceName,
    //       inputText: inputText,
    //     };
    //     const ttsResponse = await fetch("http://localhost:5379/text_to_speech", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(ttsData),
    //     });

    //     if (!ttsResponse.ok) {
    //       throw new Error(`Text_to_speech service responded with status ${ttsResponse.status}`);
    //     }

    //     const voiceConvertArgs = {
    //       inference_params: {
    //         transpose_pitch: voiceModelConfig!.transposePitch,
    //         pitch_extraction_method: voiceModelConfig!.pitchExtractionMethod,
    //         search_feature_ratio: voiceModelConfig!.searchFeatureRatio,
    //         filter_radius: voiceModelConfig!.filterRadius,
    //         audio_resampling: voiceModelConfig!.audioResampling,
    //         volume_envelope_scaling: voiceModelConfig!.volumeEnvelopeScaling,
    //         artifact_protection: voiceModelConfig!.artifactProtection,
    //       },
    //       weights_sha256: voiceModel!.checksumSHA256ForWeights,
    //       f0_curve: voiceModelConfig!.f0Curve,
    //     };

    //     const audioBlob = await ttsResponse.blob();
    //     const formData = new FormData();
    //     formData.append("audio", audioBlob);
    //     formData.append("args", JSON.stringify(voiceConvertArgs));

    //     const convertResponse = await fetch("http://localhost:5950/voice_convert", {
    //       method: "POST",
    //       body: formData,
    //     });
    //     if (!convertResponse.ok) {
    //       throw new Error(
    //         `voice conversion service responded with status ${convertResponse.status}`
    //       );
    //     } else {
    //       const blob = await convertResponse.blob();

    //       const input: Omit<TextToSpeech, "id"> = {
    //         ...args.input,
    //         userId: context.me.id,
    //         outputUrl: "",
    //       };

    //       const result = await db
    //         .insertInto("TextToSpeech")
    //         .values(input)
    //         .returning(["id"])
    //         .executeTakeFirstOrThrow();

    //       const fileKey = await uploadSpeechToS3(blob, `${result.id}.wav`);
    //       const signedUrl = await generateSpeechSignedUrl(fileKey);

    //       await db
    //         .updateTable("TextToSpeech")
    //         .set({
    //           id: result.id,
    //           outputUrl: signedUrl,
    //         })
    //         .where("id", "=", result.id)
    //         .executeTakeFirstOrThrow();

    //       const row = await context.loaders.textToSpeech.load(result.id);
    //       return row as NonNullable<typeof row>;
    //     }
    //   } catch (error) {
    //     throw Error(`Failed to create text to speech ${error}`);
    //   }

    //   // text-to-speech request using args.input.inputText
    //   // Write response audio to shared volume
    //   // Make Gradio client request against the audio response file (don't forget to clear the tmp folder at the end of this)
    //   // Write the voice converted audio to S3
    //   // Delete the input and output audio
    //   // Get temporary signed URL
    //   // Set outputUrl to temporary signed URL
    // },
  })
);

// type UpdateTextToSpeechInputType = Required<Pick<TextToSpeech, "id">> &
//   Partial<Omit<TextToSpeech, "id">>; // TODO: Make this cleaner
// const UpdateTextToSpeechInput =
//   builder.inputRef<UpdateTextToSpeechInputType>("UpdateTextToSpeechInput");
// UpdateTextToSpeechInput.implement({
//   fields: (t) => ({
//     id: t.id({ required: true }),
//     inputText: t.string(),
//     outputUrl: t.string(),
//     voiceModelId: t.id(),
//   }),
// });
// type UpdateTextToSpeechInputShape = typeof UpdateTextToSpeechInput.$inferInput;

// const TextToSpeechNullability: { [K in keyof TextToSpeech]: boolean } = {
//   id: false,
//   inputText: false,
//   outputUrl: false,
//   voiceModelId: false,
//   userId: false,
// };

// builder.mutationField("updateTextToSpeech", (t) =>
//   t.prismaField({
//     type: "TextToSpeech",
//     nullable: false,
//     args: {
//       input: t.arg({ type: UpdateTextToSpeechInput, required: true }),
//     },
//     resolve: async (query, parent, args, context, info) => {
//       const input = removeNullFieldsThatAreNonNullable<TextToSpeech>(
//         { ...args.input },
//         TextToSpeechNullability
//       );
//       input.id = undefined;

//       const result = await db
//         .updateTable("TextToSpeech")
//         .set(input)
//         .where("id", "=", args.input.id)
//         .executeTakeFirstOrThrow();

//       const row = await context.loaders.textToSpeech.load(args.input.id);
//       return row as NonNullable<typeof row>;
//     },
//   })
// );
