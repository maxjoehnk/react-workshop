import express from "express";
import Provider from "oidc-provider";
import { oidcConfiguration } from "./oidc/configuration.js";
import { createAuthMiddleware } from "./middleware/auth.js";
import issueRoutes from "./routes/issues.js";
import userRoutes from "./routes/users.js";
import { openApiSpec } from "./openapi.js";

const PORT = 3001;
const authEnabled = process.argv.includes("--auth");

async function main() {
  const app = express();
  app.use(express.json());

  let provider: Provider | null = null;

  if (authEnabled) {
    provider = new Provider(`http://localhost:${PORT}`, oidcConfiguration);
    console.log("OIDC Provider enabled");
  } else {
    console.log("Running without authentication (use --auth to enable)");
  }

  // OpenAPI spec
  app.get("/api/openapi.json", (_req, res) => {
    res.json(openApiSpec);
  });

  // Issue tracker API (must be mounted before OIDC provider callback)
  app.use("/api/issues", createAuthMiddleware(provider), issueRoutes);
  app.use("/api/users", createAuthMiddleware(provider), userRoutes);

  // Mount OIDC provider routes last (it catches all unmatched routes)
  if (provider) {
    app.use(provider.callback());
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    if (authEnabled) {
      console.log(
        `OIDC Discovery: http://localhost:${PORT}/.well-known/openid-configuration`,
      );
    }
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
