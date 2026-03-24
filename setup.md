# Project Setup Guide

## Setup app

```shell
npm create vite@latest -- -t react-compiler-ts
```

navigate into new directory and run `npm i`

## Setup routing

```shell
npm i -S @tanstack/react-router
npm i -D @tanstack/router-plugin
mkdir -p src/routes
touch src/routes/__root.tsx src/routes/index.tsx
```

`vite.config.ts`
```typescript
import tanstackRouter from '@tanstack/router-plugin/vite';

export default defineConfig({
 	plugins: [
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: true,
		}),
 		react(),
 		babel({ presets: [reactCompilerPreset()] })
 	],
})
```

Run tanstack code gen once
```shell
npm run build
```

`src/main.tsx`
```typescript jsx
// ...
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';

const router = createRouter({ routeTree })

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
```

```shell
rm src/App.tsx src/App.css
```

## Setup client generation

```shell
npm i -D @hey-api/openapi-ts
```

`openapi-ts.config.ts`

```typescript
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
	input: 'http://localhost:3001/api/openapi.json',
	output: 'src/api',
	plugins: [
		{
			name: '@hey-api/sdk',
			validator: {
				request: true
			},
		},
		{
			name: 'zod',
			dates: {
				local: true
			}
		},
		{
			name: '@hey-api/client-fetch',
			baseUrl: false,
		},
		{
			name: '@tanstack/react-query',
			queryKeys: {
				tags: true
			}
		},
	],
});
```

```shell
npx openapi-ts
```

## Setup react query

```shell
npm i -S @tanstack/react-query
```

`src/main.tsx`
```typescript jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}/>
		</QueryClientProvider>
	</StrictMode>,
)
```

## Setup oidc

```shell
npm i -S oidc-spa
```

`vite.config.ts`

```typescript
import { oidcSpa } from 'oidc-spa/vite-plugin'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    oidcSpa(),
  ],
})
```

`src/oidc.ts`
```typescript
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
```

`src/main.tsx`
```typescript jsx
import { OidcInitializationGate } from './oidc.ts';

client.setConfig({
	auth: () => getOidc().then(oidc => oidc.getAccessToken()),
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<OidcInitializationGate>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}/>
			</QueryClientProvider>
		</OidcInitializationGate>
	</StrictMode>,
)
```

## Setup testing

```shell
npm i -D vitest jsdom @testing-library/react @testing-library/dom @types/react @types/react-dom
```

## Setup Storybook

```shell
npm create storybook@latest
```
