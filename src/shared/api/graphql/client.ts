import { print } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

import {
  DEFAULT_REVALIDATE_SECONDS,
  STRAPI_GRAPHQL_URL,
} from "@/shared/lib/site-config";

type GraphQLErrorPayload = {
  message: string;
};

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLErrorPayload[];
};

type QueryOptions = {
  revalidate?: number | false;
  tags?: string[];
};

export async function executeGraphQL<TData, TVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
  options: QueryOptions = {},
) {
  const response = await fetch(STRAPI_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: print(document),
      variables,
    }),
    next: {
      revalidate:
        options.revalidate === undefined
          ? DEFAULT_REVALIDATE_SECONDS
          : options.revalidate,
      tags: options.tags,
    },
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("GraphQL response did not include data");
  }

  return payload.data;
}
