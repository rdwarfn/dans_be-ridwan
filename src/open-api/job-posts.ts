export const jobPosts = {
  post: {
    tags: ["job"],
    summary: "Creating a new jobs",
    description: "Creating a new jobs",
    operationId: "jobCreate",
    requestBody: {
      description: "Creating a new jobs in the apps",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              "$ref": "#/components/schemas/JobCreatePosts"
            }
          }
        },
        "application/x-www-form-urlencoded": {
          schema: {
            type: "array",
            items: {
              "$ref": "#/components/schemas/JobCreatePosts"
            }
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