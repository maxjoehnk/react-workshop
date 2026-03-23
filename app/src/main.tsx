import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';
import { getOidc, OidcInitializationGate } from './oidc.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { client } from './api/client.gen.ts';

const router = createRouter({ routeTree })

client.setConfig({
	auth: () => getOidc().then(oidc => oidc.getAccessToken()),
})

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<OidcInitializationGate>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}/>
			</QueryClientProvider>
		</OidcInitializationGate>
	</StrictMode>,
)
