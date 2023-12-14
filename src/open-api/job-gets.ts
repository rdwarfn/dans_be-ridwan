export const jobGets = {
  get: {
    tags: ["job"],
    summary: "",
    description: "",
    operationId: "jobGets",
    responses: {
      "202": {
        description: "Successful",
        content: {
          "application/json": {
            schemas: {
              "$ref": "#/components/schemas/ApiResponse"
            }
          },
          "application/x-www-form-urlencoded": {
            schemas: {
              "$ref": "#/components/schemas/ApiResponse"
            }
          }
        }
      }
    },
    parameters: [
      {
        name: "skip",
        in: "query",
        description: "max records to skip",
        required: true,
        schema: {
          type: "integer",
          format: "int32",
          example: 0
        }
      },
      {
        name: "limit",
        in: "query",
        description: "max records to return",
        required: true,
        schema: {
          type: "integer",
          format: "int32",
          example: 10
        }
      },
      {
        name: "page",
        in: "query",
        description: "",
        required: true,
        schema: {
          type: "integer",
          format: "int32",
          example: 1
        }
      }
    ],
    security: [
      {
        "api_key": [
          "write:auth",
          "read:auth"
        ]
      }
    ]
  }
}