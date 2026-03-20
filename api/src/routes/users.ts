import { Router } from "express";
import { searchAccounts } from "../oidc/account.js";

const router = Router();

router.get("/search", (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : "";
  const results = searchAccounts(query).map(({ id, name, email }) => ({
    id,
    name,
    email,
  }));
  res.json(results);
});

export default router;
