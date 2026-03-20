import type { FC } from 'react';
import type { Issue } from '../../../api';
import { List, ListItem, Typography } from '@mui/material';
import './issue-list.css';

export interface IssueListProps {
	loading: boolean
	issues?: Issue[]
}

export const IssueList: FC<IssueListProps> = ({
																								issues, loading
																							}) => {
	if (loading) {
		return <></>
	}

	issues ??= [];

	return <div className="issue-list">
		<Typography variant="h4">Backlog</Typography>
		<List>
			{issues.map(issue => <ListItem key={issue.id}>{issue.title}</ListItem>)}
		</List>
	</div>
}
