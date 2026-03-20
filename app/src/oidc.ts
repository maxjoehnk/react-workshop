import { oidcSpa } from 'oidc-spa/react-spa';

export const { bootstrapOidc, getOidc, OidcInitializationGate } = oidcSpa
	.withAutoLogin()
	.createUtils()

bootstrapOidc({
	implementation: 'real',
	issuerUri: "http://localhost:3001",
	clientId: "workshop-spa",

	debugLogs: true,
})
