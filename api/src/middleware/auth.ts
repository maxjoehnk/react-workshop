import type { Request, Response, NextFunction } from "express";
import type Provider from "oidc-provider";

export interface AuthUser {
  sub: string;
  email?: string;
  name?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const DEFAULT_USER: AuthUser = {
  sub: "alice",
  email: "alice@example.com",
  name: "Alice",
};

export function createAuthMiddleware(provider: Provider | null) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // No auth mode: set default user
    if (!provider) {
      req.user = DEFAULT_USER;
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ error: "Missing or invalid Authorization header" });
      return;
    }

    const token = authHeader.slice(7);
    try {
      const accessToken = await provider.AccessToken.find(token);
      if (!accessToken || accessToken.isExpired) {
        res.status(401).json({ error: "Invalid or expired token" });
        return;
      }

      req.user = {
        sub: accessToken.accountId,
      };

      // Try to enrich with account claims
      const account = await provider.Account.findAccount(
        undefined as any,
        accessToken.accountId,
        accessToken,
      );
      if (account) {
        const claims = await account.claims("userinfo", "openid email profile", {}, []);
        req.user = { ...req.user, ...claims };
      }

      next();
    } catch (err) {
      console.error("Auth middleware error:", err);
      res.status(401).json({ error: "Token validation failed" });
    }
  };
}
