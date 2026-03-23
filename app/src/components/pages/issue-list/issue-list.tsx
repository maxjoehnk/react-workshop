import type { FC } from 'react';
import type { Issue } from '../../../api';
import './issue-list.css';
import { Description, EmptyState, Label, ListBox, Skeleton } from '@heroui/react';

export interface IssueListProps {
	loading: boolean
	issues: Issue[]
}

export const IssueList: FC<IssueListProps> = ({
																								issues, loading
																							}) => {
	if (loading) {
		return <IssueListSkeleton/>
	}

	return <div className="issue-list">
		<h2>Backlog</h2>
		{issues.length == 0 && <EmptyState>No issues yet</EmptyState>}
		<ListBox>
			{issues.map(issue => <ListBox.Item key={issue.id}>
				<Label>{issue.key}</Label>
				<Description>{issue.title}</Description>
			</ListBox.Item>)}
		</ListBox>
	</div>
}

const IssueListSkeleton = () => <div className="issue-list">
	<h2>Backlog</h2>
	<div className="issue-list__placeholder">
		{new Array(5).fill(null).map(() => <Skeleton className="h-4 w-80 rounded"/>)}
	</div>
</div>
