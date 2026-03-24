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
  SubtaskSchema,
  SubtaskCreateInputSchema,
  ErrorSchema,
  ValidationErrorSchema,
  UnauthorizedErrorSchema,
  NotFoundErrorSchema,
} from "./schemas/issues.js";

const registry = new OpenAPIRegistry();

// Register schemas
registry.register("Issue", IssueSchema);
registry.register("IssueCreateInput", IssueCreateInputSchema);
registry.register("IssueUpdateInput", IssueUpdateInputSchema);
registry.register("AttachmentMeta", AttachmentMetaSchema);
registry.register("Subtask", SubtaskSchema);
registry.register("SubtaskCreateInput", SubtaskCreateInputSchema);
registry.register("Error", ErrorSchema);
registry.register("ValidationError", ValidationErrorSchema);
registry.register("UnauthorizedError", UnauthorizedErrorSchema);
registry.register("NotFoundError", NotFoundErrorSchema);

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
  tags: ["issues"],
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
      content: { "application/json": { schema: UnauthorizedErrorSchema } },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/issues",
  operationId: "createIssue",
  summary: "Create an issue",
  tags: ["issues"],
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
      content: { "application/json": { schema: ValidationErrorSchema } },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: UnauthorizedErrorSchema } },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/issues/{id}",
  operationId: "getIssue",
  summary: "Get an issue by ID",
  tags: ["issues"],
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
      content: { "application/json": { schema: UnauthorizedErrorSchema } },
    },
    404: {
      description: "Issue not found",
      content: { "application/json": { schema: NotFoundErrorSchema } },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/issues/{id}",
  operationId: "updateIssue",
  summary: "Update an issue",
  tags: ["issues"],
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
      content: { "application/json": { schema: UnauthorizedErrorSchema } },
    },
    404: {
      description: "Issue not found",
      content: { "application/json": { schema: NotFoundErrorSchema } },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/issues/{id}",
  operationId: "deleteIssue",
  summary: "Delete an issue",
  tags: ["issues"],
  security,
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    204: { description: "Issue deleted" },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: UnauthorizedErrorSchema } },
    },
    404: {
      description: "Issue not found",
      content: { "application/json": { schema: NotFoundErrorSchema } },
    },
  },
});

// --- Validation routes ---

const TitleValidationResponseSchema = z
  .object({
    title: z.string(),
    available: z.boolean(),
  })
  .openapi("TitleValidationResponse");

registry.register("TitleValidationResponse", TitleValidationResponseSchema);

registry.registerPath({
  method: "get",
  path: "/api/issues/validate/title",
  operationId: "validateIssueTitle",
  summary: "Check if an issue title is unique",
  description:
    "Returns whether the given title is available (not yet used by another issue). Useful for async form validation.",
  tags: ["issues"],
  security,
  request: {
    query: z.object({
      title: z.string().min(1).openapi({ description: "The issue title to check" }),
    }),
  },
  responses: {
    200: {
      description: "Title availability result",
      content: {
        "application/json": { schema: TitleValidationResponseSchema },
      },
    },
    400: {
      description: "Missing title parameter",
      content: { "application/json": { schema: ErrorSchema } },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: UnauthorizedErrorSchema } },
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
      content: { "application/json": { schema: ValidationErrorSchema } },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: UnauthorizedErrorSchema } },
    },
    404: {
      description: "Issue not found",
      content: { "application/json": { schema: NotFoundErrorSchema } },
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
      content: { "application/json": { schema: UnauthorizedErrorSchema } },
    },
    404: {
      description: "Attachment not found",
      content: { "application/json": { schema: NotFoundErrorSchema } },
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
      content: { "application/json": { schema: UnauthorizedErrorSchema } },
    },
    404: {
      description: "Attachment not found",
      content: { "application/json": { schema: NotFoundErrorSchema } },
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
      content: { "application/json": { schema: UnauthorizedErrorSchema } },
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
