import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  // schema: "schema.json",
  generates: {
    "src/codegen/generated/schema.gql": {
      plugins: ["schema-ast"],
    },
    "src/codegen/generated/schema.json": {
      plugins: ["introspection"],
      config: {
        minify: true,
      },
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"]
    // }
  },
};

export default config;
