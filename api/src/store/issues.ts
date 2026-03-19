import { v4 as uuidv4 } from "uuid";

export type IssuePriority = "low" | "medium" | "high";
export type IssueStatus = "open" | "in_progress" | "closed";

export interface Attachment {
  id: string;
  filename: string;
  mimetype: string;
  size: number;
  data: Buffer;
  createdAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
}

export type IssueCreateInput = Pick<Issue, "title" | "description"> &
  Partial<Pick<Issue, "priority" | "assignee">>;

export type IssueUpdateInput = Partial<
  Pick<Issue, "title" | "description" | "status" | "priority" | "assignee">
>;

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
