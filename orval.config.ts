import { OpenAPIObject, PathItemObject, PathsObject } from "openapi3-ts/oas30"
import { defineConfig } from "orval"

const camel = (str: string) =>
  str
    .split(/_/)
    .map(
      (word, index) =>
        (index === 0 ? word : word.charAt(0).toUpperCase()) + word.slice(1)
    )
    .join("")

export default defineConfig({
  shareEngine: {
    output: {
      target: "src/api/api.ts",
      schemas: "src/api/model",
      client: "react-query",
      mock: false,
      override: {
        mutator: {
          path: "src/api/instance.ts",
          name: "apiInstance",
        },
      },
    },

    input: {
      target: "./submodules/share-engine/backend/out/openapi.json",
      override: {
        transformer: (api: OpenAPIObject) => ({
          ...api,
          paths: Object.entries(api.paths).reduce<PathsObject>(
            (paths, [path, item]) => ({
              ...paths,
              [path]: Object.entries(item).reduce<PathItemObject>(
                (pathItem, [method, operation]) => ({
                  ...pathItem,
                  [method]: {
                    ...operation,
                    operationId: operation.operationId.replace(
                      /_api_v1_.*$/,
                      ""
                    ),
                  },
                }),
                {}
              ),
            }),
            {}
          ),
        }),
      },
    },
  },
})
