import type { Configuration } from "oidc-provider";
import { accountStore } from "./account.js";

export const oidcConfiguration: Configuration = {
  clients: [
    {
      client_id: "workshop-spa",
      client_name: "Workshop SPA",
      token_endpoint_auth_method: "none" as const,
      application_type: "web" as const,
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      redirect_uris: ["http://localhost:5173/oidc-callback"],
      post_logout_redirect_uris: ["http://localhost:5173"],
    },
  ],

  findAccount: accountStore.findAccount,

  claims: {
    openid: ["sub"],
    email: ["email"],
    profile: ["name"],
  },

  features: {
    devInteractions: { enabled: true },
  },

  pkce: {
    required: () => true,
  },

  ttl: {
    AccessToken: 3600,
    AuthorizationCode: 600,
    IdToken: 3600,
    RefreshToken: 86400,
  },
};
