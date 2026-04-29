import type { CodegenConfig } from "@graphql-codegen/cli";

const schema =
  process.env.STRAPI_GRAPHQL_URL ?? "https://api.pharm.zt.ua:9443/graphql";

const config: CodegenConfig = {
  overwrite: true,
  schema,
  documents: ["src/shared/api/graphql/**/*.graphql"],
  generates: {
    "src/shared/api/graphql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        avoidOptionals: true,
        maybeValue: "T | null",
        immutableTypes: true,
        useTypeImports: true,
        scalars: {
          Date: "string",
          DateTime: "string",
          JSON: "unknown",
          Upload: "unknown",
        },
      },
    },
  },
};

export default config;
