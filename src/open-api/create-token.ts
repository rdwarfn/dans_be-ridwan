export const createToken = {
  "post": {
    "tags": [
      "auth"
    ],
    "summary": "Creating a new token",
    "description": "Creating a new token",
    "operationId": "createToken",
    "requestBody": {
      "description": "Create a new token in the apps",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/AuthCreateToken"
          }
        },
        "application/x-www-form-urlencoded": {
          "schema": {
            "$ref": "#/components/schemas/AuthCreateToken"
          }
        }
      },
      "required": true
    },
    "responses": {
      "200": {
        "description": "Successful operation",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/AuthCreateTokenResponse"
            }
          },
          "application/x-www-form-urlencoded": {
            "schema": {
              "$ref": "#/components/schemas/AuthCreateTokenResponse"
            }
          }
        }
      },
      "405": {
        "description": "Invalid input"
      }
    },
    "security": [
      {
        "api_key": [
          "write:auth",
          "read:auth"
        ]
      }
    ]
  }
}