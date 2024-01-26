import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema/index.js";
import { createLoaders } from "./loaders.js";
import { Context } from "./context.js";

const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }): Promise<Context> => ({
    loaders: createLoaders(),
  }),
});

console.log(`🚀  Server ready at: ${url}`);
