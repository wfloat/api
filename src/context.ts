import { User } from "@prisma/client";
import { createLoaders } from "./loaders.js";

export type Context = {
  me: User;
  loaders: ReturnType<typeof createLoaders>;
};
