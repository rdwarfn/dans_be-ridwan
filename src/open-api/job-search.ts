export const jobSearch = {
  post: {
    tags: ["job"],
    summary: "Searching a jobs",
    description: "Searching a jobs",
    operationId: "jobSearch",
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
    requestBody: {
      description: "Searching a jobs in the apps",
      content: {
        "application/json": {
          schema: {
            "$ref": "#/components/schemas/JobSearch"
          }
        },
        "application/x-www-form-urlencoded": {
          schema: {
            "$ref": "#/components/schemas/JobSearch"
          }
        }
      },
      required: true
    },
    responses: {
      "200": {
        description: "Successful",
        content: {
          "application/json": {
            schemas: {
              "$ref": "#/components/schemas/ApiResponse"
            }
          },
          "application/x-www-form-urlencoded": {
            "$ref": "#/components/schemas/ApiResponse"
          }
        }
      }
    },
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