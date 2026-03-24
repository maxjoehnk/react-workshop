import type { Preview } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryHistory, createRootRoute, createRouter } from '@tanstack/react-router';
import { Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
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
	globalTypes: {
		locale: {
			name: 'Locale',
			description: 'locale',
			toolbar: {
				icon: 'globe',
				items: [
					{ value: 'en', title: 'English' },
					{ value: 'de', title: 'Deutsch' },
				],
			},
		},
	},
	initialGlobals: {
		locale: 'en',
	},
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<Story/>
			</QueryClientProvider>
		),
		(Story, context) => {
			const { locale } = context.globals;

			useEffect(() => {
				i18n.changeLanguage(locale);
			}, [locale]);

			return (
				<Suspense fallback={<div>loading translations...</div>}>
					<I18nextProvider i18n={i18n}>
						<Story/>
					</I18nextProvider>
				</Suspense>
			);
		},
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
