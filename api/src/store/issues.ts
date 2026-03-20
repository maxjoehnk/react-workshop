import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import {
  IssueSchema,
  IssueCreateInputSchema,
  IssueUpdateInputSchema,
  AttachmentMetaSchema,
} from "../schemas/issues.js";

export type IssuePriority = z.infer<typeof IssueSchema>["priority"];
export type IssueStatus = z.infer<typeof IssueSchema>["status"];

export type AttachmentMeta = z.infer<typeof AttachmentMetaSchema>;
export interface Attachment extends AttachmentMeta {
  data: Buffer;
}

export type Issue = Omit<z.infer<typeof IssueSchema>, "attachments"> & {
  attachments: Attachment[];
};

export type IssueCreateInput = z.infer<typeof IssueCreateInputSchema>;
export type IssueUpdateInput = z.infer<typeof IssueUpdateInputSchema>;

const issues = new Map<string, Issue>();

export const issueStore = {
  findAll(): Issue[] {
    return Array.from(issues.values()).map(withoutAttachmentData);
  },

  findById(id: string): Issue | undefined {
    const issue = issues.get(id);
    return issue ? withoutAttachmentData(issue) : undefined;
  },

  create(input: IssueCreateInput, createdBy: string): Issue {
    const now = new Date().toISOString();
    const issue: Issue = {
      id: uuidv4(),
      title: input.title,
      description: input.description,
      status: "open",
      priority: input.priority ?? "medium",
      assignee: input.assignee ?? null,
      createdBy,
      createdAt: now,
      updatedAt: now,
      attachments: [],
    };
    issues.set(issue.id, issue);
    return withoutAttachmentData(issue);
  },

  update(id: string, input: IssueUpdateInput): Issue | undefined {
    const issue = issues.get(id);
    if (!issue) return undefined;
    Object.assign(issue, input, { updatedAt: new Date().toISOString() });
    return withoutAttachmentData(issue);
  },

  delete(id: string): boolean {
    return issues.delete(id);
  },

  addAttachment(
    issueId: string,
    file: { originalname: string; mimetype: string; size: number; buffer: Buffer },
  ): Attachment | undefined {
    const issue = issues.get(issueId);
    if (!issue) return undefined;
    const attachment: Attachment = {
      id: uuidv4(),
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      data: file.buffer,
      createdAt: new Date().toISOString(),
    };
    issue.attachments.push(attachment);
    issue.updatedAt = new Date().toISOString();
    return { ...attachment, data: undefined as unknown as Buffer };
  },

  getAttachment(issueId: string, attachmentId: string): Attachment | undefined {
    const issue = issues.get(issueId);
    if (!issue) return undefined;
    return issue.attachments.find((a) => a.id === attachmentId);
  },

  deleteAttachment(issueId: string, attachmentId: string): boolean {
    const issue = issues.get(issueId);
    if (!issue) return false;
    const idx = issue.attachments.findIndex((a) => a.id === attachmentId);
    if (idx === -1) return false;
    issue.attachments.splice(idx, 1);
    issue.updatedAt = new Date().toISOString();
    return true;
  },
};

function withoutAttachmentData(issue: Issue): Issue {
  return {
    ...issue,
    attachments: issue.attachments.map(({ data: _, ...rest }) => ({
      ...rest,
      data: undefined as unknown as Buffer,
    })),
  };
}
