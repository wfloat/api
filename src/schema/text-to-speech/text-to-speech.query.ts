import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  TextToSpeech: t.prismaField({
    type: "TextToSpeech",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.textToSpeech.load(args.id),
  }),
  TextToSpeechs: t.prismaConnection(
    {
      type: "TextToSpeech",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "TextToSpeechsConnection" },
    { name: "TextToSpeechsEdge" }
  ),
}));
