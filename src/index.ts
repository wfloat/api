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
  context: async ({ req, res }): Promise<Context> => {
    // TODO: Uncomment auth logic
    // const authorizationHeader = req.headers["authorization"] || "";
    // if (!authorizationHeader) {
    //   throw Error("Authorization header not provided.");
    // }

    const myLoaders = createLoaders();
    // const me = await myLoaders.userUsingAccessKey.load(authorizationHeader);

    // if (!me) {
    //   throw Error("Not authorized.");
    // }

    const me = null;

    return {
      me: me,
      loaders: myLoaders,
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
