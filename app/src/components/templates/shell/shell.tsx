import { type ReactNode, useState } from 'react';
import { CreateIssueDialog } from '../../pages/create-issue-dialog/create-issue-dialog.tsx';
import { Link } from '../../atoms/link/link.tsx';
import { Route as listIssuesRoute } from '../../../routes/index.tsx';
import './shell.css';
import { Button } from '@heroui/react';

export interface ShellProps {
	children: ReactNode;
}

export const Shell = ({ children }: ShellProps) => {
	const [createIssueDialogOpen, setCreateIssueDialogOpen] = useState(false);

	return <div className="shell">
		<nav className="shell__header">
			<div className="shell__toolbar">
				<h1 className="shell__title">Issue Tracker</h1>

				<Button onClick={() => setCreateIssueDialogOpen(true)}>
					Create
				</Button>

				<div className="shell__spacer"></div>

				<Link to={listIssuesRoute.to}>Backlog</Link>
			</div>
		</nav>
		<main className="shell__body">
			<div className="shell__inner-body">
				{children}
			</div>
		</main>
		<CreateIssueDialog open={createIssueDialogOpen} onClose={() => setCreateIssueDialogOpen(false)}/>
	</div>;
};
