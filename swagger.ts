import { componentSchemas } from "./src/open-api/components-schemas";
import { createToken } from "./src/open-api/create-token";
import { jobGets } from "./src/open-api/job-gets";
import { jobPosts } from "./src/open-api/job-posts";
import { jobSearch } from "./src/open-api/job-search";
import { signIn } from "./src/open-api/sign-in";
import { signUp } from "./src/open-api/sign-up";
export const swaggerDocument = {
  "openapi": "3.0.3",
  "info": {
    "title": "Swagger Dans BE - OpenAPI 3.0",
    "description": "REST API Dans BE",
    "contact": {
      "email": "r.arifin123@gmail.com"
    },
    "version": "0.0.1"
  },
  "externalDocs": {
    "description": "Find out more about Swagger",
    "url": "http://swagger.io"
  },
  "servers": [
    {
      "url": "http://0.0.0.0:8000/api/v1"
    }
  ],
  "tags": [
    {
      "name": "auth",
      "description": "Auth service apps"
    },
    {
      "name": "user",
      "description": "User service apps"
    },
    {
      "name": "job",
      "description": "Job service apps"
    }
  ],
  "paths": {
    "/auth/create-token": createToken,
    "/auth/sign-up": signUp,
    "/auth/sign-in": signIn,
    "/jobs": jobGets,
    "/jobs/posts": jobPosts,
    "/jobs/search": jobSearch,
  },
  "components": componentSchemas
}