import { createFileRoute } from '@tanstack/react-router'
import { IssueList } from '../components/pages/issue-list/issue-list.tsx';
import { useQuery } from '@tanstack/react-query';
import { listIssuesOptions } from '../api/@tanstack/react-query.gen.ts';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
	const { isLoading, data, error } = useQuery(listIssuesOptions())

	if (error != null) {
		return <div>Error: {error?.message}</div>
	}

	return <IssueList loading={isLoading} issues={data} />
}
