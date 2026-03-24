import { Router } from "express";
import multer from "multer";
import { issueStore } from "../store/issues.js";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// GET /api/issues/validate/title?title=...
router.get("/validate/title", async (req, res) => {
  const title = typeof req.query.title === "string" ? req.query.title.trim() : "";
  if (!title) {
    res.status(400).json({ error: "title query parameter is required" });
    return;
  }

  const exists = issueStore
    .findAll()
    .some((issue) => issue.title.toLowerCase() === title.toLowerCase());

  res.json({ title, available: !exists });
});

// GET /api/issues
router.get("/", (_req, res) => {
  res.json(issueStore.findAll());
});

// GET /api/issues/:id
router.get("/:id", (req, res) => {
  const issue = issueStore.findById(req.params.id);
  if (!issue) {
    res.status(404).json({ error: "Issue not found" });
    return;
  }
  res.json(issue);
});

// POST /api/issues
router.post("/", (req, res) => {
  const { title, description, priority, assignee, subtasks, versions } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: "title and description are required" });
    return;
  }
  const issue = issueStore.create(
    { title, description, priority, assignee, subtasks, versions },
    req.user!.sub,
  );
  res.status(201).json(issue);
});

// PUT /api/issues/:id
router.put("/:id", (req, res) => {
  const issue = issueStore.update(req.params.id, req.body);
  if (!issue) {
    res.status(404).json({ error: "Issue not found" });
    return;
  }
  res.json(issue);
});

// DELETE /api/issues/:id
router.delete("/:id", (req, res) => {
  if (!issueStore.delete(req.params.id)) {
    res.status(404).json({ error: "Issue not found" });
    return;
  }
  res.status(204).end();
});

// POST /api/issues/:id/attachments
router.post("/:id/attachments", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  const attachment = issueStore.addAttachment(req.params.id, req.file);
  if (!attachment) {
    res.status(404).json({ error: "Issue not found" });
    return;
  }
  res.status(201).json(attachment);
});

// GET /api/issues/:id/attachments/:aid
router.get("/:id/attachments/:aid", (req, res) => {
  const attachment = issueStore.getAttachment(req.params.id, req.params.aid);
  if (!attachment) {
    res.status(404).json({ error: "Attachment not found" });
    return;
  }
  res.setHeader("Content-Type", attachment.mimetype);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${attachment.filename}"`,
  );
  res.send(attachment.data);
});

// DELETE /api/issues/:id/attachments/:aid
router.delete("/:id/attachments/:aid", (req, res) => {
  if (!issueStore.deleteAttachment(req.params.id, req.params.aid)) {
    res.status(404).json({ error: "Attachment not found" });
    return;
  }
  res.status(204).end();
});

export default router;
