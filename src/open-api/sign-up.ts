export const signUp = {
  "post": {
    "tags": [
      "auth"
    ],
    "summary": "Registering a new user",
    "description": "Registering a new user",
    "operationId": "registerUser",
    "requestBody": {
      "description": "Registering a new user in the apps",
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