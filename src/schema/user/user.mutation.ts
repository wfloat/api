import { builder } from "../../builder.js";
import { create, db, update } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { User } from "@prisma/client";

type CreateUserInputType = Omit<User, "id">;
const CreateUserInput = builder.inputRef<CreateUserInputType>("CreateUserInput");
CreateUserInput.implement({
  fields: (t) => ({
    id: t.string({ required: true }),
    accessKey: t.string({ required: true }),
    name: t.string({ required: true }),
  }),
});
type CreateUserInputShape = typeof CreateUserInput.$inferInput;

builder.mutationField("createUser", (t) =>
  t.prismaField({
    type: "User",
    nullable: false,
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      return await create("User", context, args.input);
    },
  })
);

type UpdateUserInputType = Required<Pick<User, "id">> & Partial<Omit<User, "id">>; // TODO: Make this cleaner
const UpdateUserInput = builder.inputRef<UpdateUserInputType>("UpdateUserInput");
UpdateUserInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    filesizeForWeights: t.int(),
    filesizeForAdded: t.int(),
    checksumMD5ForAdded: t.string(),
    checksumMD5ForWeights: t.string(),
    checksumSHA256ForAdded: t.string(),
    checksumSHA256ForWeights: t.string(),
    hidden: t.boolean(),
    name: t.string(),
    processed: t.boolean(),
  }),
});
type UpdateUserInputShape = typeof UpdateUserInput.$inferInput;

const UserNullability: { [K in keyof Omit<
  User,
  "createdById" | "updatedById" | "createdDate" | "updatedDate" | "isDeleted"
>]: boolean } = {
  id: false,
  accessKey: false,
  name: false,
};

builder.mutationField("updateUser", (t) =>
  t.prismaField({
    type: "User",
    nullable: false,
    args: {
      input: t.arg({ type: UpdateUserInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<User>(
        { ...args.input },
        UserNullability
      );
      return await update("User", context, input);
    },
  })
);
