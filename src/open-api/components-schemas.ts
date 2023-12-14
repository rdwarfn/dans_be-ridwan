export const componentSchemas = {
  "schemas": {
    "AuthCreateToken": {
      "required": [
        "user_id",
        "token"
      ],
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string",
          "example": "496a37f4-6d30-4eb0-8642-441907987bdb"
        },
        "token": {
          "type": "string",
          "example": "496a37f4-6d30-4eb0-8642-441907987bdb"
        }
      }
    },
    "AuthCreateTokenResponse": {
      "required": [
        "status",
        "data"
      ],
      "type": "object",
      "properties": {
        "status": {
          "type": "integer",
          "example": 200
        },
        "data": {
          "type": "string",
          "example": "496a37f4-6d30-4eb0-8642-441907987bdb"
        },
        "message": {
          "type": "string",
          "example": "success"
        }
      }
    },
    "AuthSignInUp": {
      "required": [
        "username",
        "password"
      ],
      "type": "object",
      "properties": {
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      }
    },
    "JobCreatePosts": {
      "required": [
        "type",
        "url",
        "company",
        "created_at",
        "updated_at",
        "company_url",
        "location",
        "title",
        "description",
        "how_to_apply",
        "company_logo",
      ],
      "type": "object",
      "properties": {
        "type": {
          type: "string"
        },
        "url": {
          type: "string",
          format: "uri"
        },
        "company": {
          type: "string"
        },
        "created_at": {
          type: "string",
          format: "date-time"
        },
        "updated_at": {
          type: "string",
          format: "date-time"
        },
        "company_url": {
          type: "string"
        },
        "location": {
          type: "string"
        },
        "title": {
          type: "string"
        },
        "description": {
          type: "string",
          maxLength: 1000
        },
        "how_to_apply": {
          type: "string",
          maxLength: 500
        },
        "company_logo": {
          type: "string",
          format: "uri"
        },
      }
    },
    "JobSearch": {
      "type": "object",
      "properties": {
        "description": {
          type: "string"
        },
        "location": {
          type: "string"
        },
        "type": {
          type: "string"
        },
      }
    },
    "ApiResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32",
          "example": 200
        },
        "data": {
          "type": "object"
        },
        "message": {
          "type": "string",
          "example": "OK"
        }
      }
    }
  },
  parameters: {
    skipParam: {
      name: "skip",
      in: "query",
      description: "max records to skip",
      required: true,
      schema: {
        type: "integer",
        format: "int32"
      }
    },
    limitParam: {
      name: "limit",
      in: "query",
      description: "max records to return",
      required: true,
      schema: {
        type: "integer",
        format: "int32"
      }
    },
    pageParam: {
      name: "page",
      in: "query",
      description: "",
      required: true,
      schema: {
        type: "integer",
        format: "int32"
      }
    },
  },
  "securitySchemes": {
    "api_key": {
      "type": "apiKey",
      "name": "api_key",
      "in": "header"
    }
  }
}