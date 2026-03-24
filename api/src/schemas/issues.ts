import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const IssuePrioritySchema = z
  .enum(["low", "medium", "high"])
  .openapi("IssuePriority");

export const IssueStatusSchema = z
  .enum(["open", "in_progress", "closed"])
  .openapi("IssueStatus");

export const SubtaskSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    done: z.boolean(),
  })
  .openapi("Subtask");

export const SubtaskCreateInputSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
  })
  .openapi("SubtaskCreateInput");

export const AttachmentMetaSchema = z
  .object({
    id: z.string().uuid(),
    filename: z.string(),
    mimetype: z.string(),
    size: z.number().int(),
    createdAt: z.string().datetime(),
  })
  .openapi("AttachmentMeta");

export const IssueVersionsSchema = z
  .object({
    affectedVersion: z.string(),
    fixVersion: z.string(),
  })
  .openapi("IssueVersions");

export const IssueVersionsInputSchema = z
  .object({
    affectedVersion: z.string().optional(),
    fixVersion: z.string().optional(),
  })
  .openapi("IssueVersionsInput");

export const IssueSchema = z
  .object({
    id: z.string().uuid(),
    key: z.string().openapi({ example: "ISSUE-1" }),
    title: z.string(),
    description: z.string(),
    status: IssueStatusSchema,
    priority: IssuePrioritySchema,
    assignee: z.string().nullable(),
    createdBy: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    attachments: z.array(AttachmentMetaSchema),
    subtasks: z.array(SubtaskSchema),
    versions: IssueVersionsSchema,
  })
  .openapi("Issue");

export const IssueCreateInputSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    priority: IssuePrioritySchema.optional(),
    assignee: z.string().optional(),
    subtasks: z.array(SubtaskCreateInputSchema),
    versions: IssueVersionsInputSchema,
  })
  .openapi("IssueCreateInput");

export const IssueUpdateInputSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: IssueStatusSchema.optional(),
    priority: IssuePrioritySchema.optional(),
    assignee: z.string().optional(),
    versions: IssueVersionsInputSchema.optional(),
  })
  .openapi("IssueUpdateInput");

export const ErrorSchema = z
  .object({
    error: z.string(),
  })
  .openapi("Error");

export const ValidationErrorSchema = z
  .object({
    error: z.string(),
    details: z.array(
      z.object({
        field: z.string(),
        message: z.string(),
      }),
    ).optional(),
  })
  .openapi("ValidationError");

export const UnauthorizedErrorSchema = z
  .object({
    error: z.string(),
  })
  .openapi("UnauthorizedError");

export const NotFoundErrorSchema = z
  .object({
    error: z.string(),
  })
  .openapi("NotFoundError");
