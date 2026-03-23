import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Shell } from '../components/templates/shell/shell.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
	component: RootComponent,
})

function RootComponent() {
	return (
		<>
			<Shell>
				<Outlet/>
			</Shell>
			<TanStackRouterDevtools/>
			<ReactQueryDevtools/>
		</>
	)
}
