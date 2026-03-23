import type { Preview } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryHistory, createRootRoute, createRouter } from '@tanstack/react-router';
import '../src/styles.css';

const queryClient = new QueryClient();

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => <QueryClientProvider client={queryClient}><Story/></QueryClientProvider>,
		(Story) =>
			<RouterProvider router={createRouter({
				history: createMemoryHistory(),
				routeTree: createRootRoute({
					component: Story
				})
			})}/>
	]
};

export default preview;
