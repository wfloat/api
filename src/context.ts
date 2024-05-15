import { User } from "@prisma/client";
import { createLoaders } from "./loaders.js";

export type Context = {
  me: User | null;
  loaders: ReturnType<typeof createLoaders>;
};
