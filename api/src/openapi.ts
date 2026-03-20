import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  IssueSchema,
  IssueCreateInputSchema,
  IssueUpdateInputSchema,
  AttachmentMetaSchema,
  ErrorSchema,
} from "./schemas/issues.js";

const registry = new OpenAPIRegistry();

// Register schemas
registry.register("Issue", IssueSchema);
registry.register("IssueCreateInput", IssueCreateInputSchema);
registry.register("IssueUpdateInput", IssueUpdateInputSchema);
registry.register("AttachmentMeta", AttachmentMetaSchema);
registry.register("Error", ErrorSchema);

// Register security scheme
const bearerAuth = registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description:
    "Access token obtained via Authorization Code Flow with PKCE from the OIDC provider at /.well-known/openid-configuration",
});

const security = [{ [bearerAuth.name]: [] }];

// --- Issue routes ---

registry.registerPath({
  method: "get",
  path: "/api/issues",
  operationId: "listIssues",
  summary: "List all issues",
  tags: ["Issues"],
  security,
  responses: {
    200: {
      description: "A list of issues",
      content: {
        "application/json": { schema: z.array(IssueSchema) },
      },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/issues",
  operationId: "createIssue",
  summary: "Create an issue",
  tags: ["Issues"],
  security,
  request: {
    body: {
      content: { "application/json": { schema: IssueCreateInputSchema } },
    },
  },
  responses: {
    201: {
      description: "The created issue",
      content: { "application/json": { schema: IssueSchema } },
    },
    400: {
      description: "Validation error",
      content: { "application/json": { schema: ErrorSchema } },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/issues/{id}",
  operationId: "getIssue",
  summary: "Get an issue by ID",
  tags: ["Issues"],
  security,
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    200: {
      description: "The issue",
      content: { "application/json": { schema: IssueSchema } },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: ErrorSchema } },
    },
    404: {
      description: "Issue not found",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/issues/{id}",
  operationId: "updateIssue",
  summary: "Update an issue",
  tags: ["Issues"],
  security,
  request: {
    params: z.object({ id: z.string().uuid() }),
    body: {
      content: { "application/json": { schema: IssueUpdateInputSchema } },
    },
  },
  responses: {
    200: {
      description: "The updated issue",
      content: { "application/json": { schema: IssueSchema } },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: ErrorSchema } },
    },
    404: {
      description: "Issue not found",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/issues/{id}",
  operationId: "deleteIssue",
  summary: "Delete an issue",
  tags: ["Issues"],
  security,
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    204: { description: "Issue deleted" },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: ErrorSchema } },
    },
    404: {
      description: "Issue not found",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

// --- Attachment routes ---

registry.registerPath({
  method: "post",
  path: "/api/issues/{id}/attachments",
  operationId: "uploadAttachment",
  summary: "Upload an attachment to an issue",
  tags: ["Attachments"],
  security,
  request: {
    params: z.object({ id: z.string().uuid() }),
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            file: z.string().openapi({ type: "string", format: "binary" }),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created attachment metadata",
      content: { "application/json": { schema: AttachmentMetaSchema } },
    },
    400: {
      description: "No file uploaded",
      content: { "application/json": { schema: ErrorSchema } },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: ErrorSchema } },
    },
    404: {
      description: "Issue not found",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/issues/{id}/attachments/{aid}",
  operationId: "downloadAttachment",
  summary: "Download an attachment",
  tags: ["Attachments"],
  security,
  request: {
    params: z.object({
      id: z.string().uuid(),
      aid: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "The attachment file",
      content: {
        "application/octet-stream": {
          schema: z.string().openapi({ type: "string", format: "binary" }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: ErrorSchema } },
    },
    404: {
      description: "Attachment not found",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/issues/{id}/attachments/{aid}",
  operationId: "deleteAttachment",
  summary: "Delete an attachment",
  tags: ["Attachments"],
  security,
  request: {
    params: z.object({
      id: z.string().uuid(),
      aid: z.string().uuid(),
    }),
  },
  responses: {
    204: { description: "Attachment deleted" },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: ErrorSchema } },
    },
    404: {
      description: "Attachment not found",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

// --- User routes ---

const UserSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
  })
  .openapi("User");

registry.register("User", UserSchema);

registry.registerPath({
  method: "get",
  path: "/api/users/search",
  operationId: "searchUsers",
  summary: "Search users by name",
  description: "Returns matching users for autocomplete. Pass an empty query to list all users.",
  tags: ["Users"],
  security,
  request: {
    query: z.object({
      q: z.string().optional().openapi({ description: "Search query to match against user names" }),
    }),
  },
  responses: {
    200: {
      description: "A list of matching users",
      content: {
        "application/json": { schema: z.array(UserSchema) },
      },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

// --- Generate spec ---

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiSpec = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Issue Tracker API",
    version: "1.0.0",
    description: "A simple issue tracker API for the React workshop.",
  },
  servers: [{ url: "http://localhost:3001" }],
});