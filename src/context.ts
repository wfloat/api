import { createLoaders } from "./loaders.js";

export type Context = {
  loaders: ReturnType<typeof createLoaders>;
};
