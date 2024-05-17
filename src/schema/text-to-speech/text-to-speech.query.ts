import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  TextToSpeech: t.prismaField({
    type: "TextToSpeech",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const result = await context.loaders.TextToSpeech.load(args.id);
      return result as NonNullable<typeof result>;
    },
  }),
  TextToSpeeches: t.prismaConnection(
    {
      type: "TextToSpeech",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "TextToSpeechesConnection" },
    { name: "TextToSpeechesEdge" }
  ),
}));
