import { createFileRoute } from '@tanstack/react-router'
import { IssueList } from '../components/pages/issue-list/issue-list.tsx';
import { useListIssuesQuery } from '../api/@tanstack/react-query.gen.ts';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
	const { isLoading, data, error } = useListIssuesQuery()


	if (error != null) {
		return <div>Error: {error?.error}</div>
	}

	return <IssueList loading={isLoading} issues={data ?? []} />
}
