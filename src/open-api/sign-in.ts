export const signIn = {
  "post": {
    "tags": [
      "auth"
    ],
    "summary": "Signing a new user",
    "description": "Signing a new user",
    "operationId": "signInUser",
    "requestBody": {
      "description": "Signing a new user in the apps",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/AuthSignInUp"
          }
        },
        "application/x-www-form-urlencoded": {
          "schema": {
            "$ref": "#/components/schemas/AuthSignInUp"
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successful operation",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ApiResponse"
            }
          },
          "application/x-www-form-urlencoded": {
            "schema": {
              "$ref": "#/components/schemas/ApiResponse"
            }
          }
        }
      },
      "500": {
        "description": "Internal Server Error"
      }
    }
  }
}