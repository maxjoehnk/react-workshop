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
				tags: true,
			},
			queryOptions: {
				exported: false,
			},
			useQuery: true,
			useMutation: true,
		},
	],
});
