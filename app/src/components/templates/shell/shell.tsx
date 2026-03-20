import { type ReactNode, useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import './shell.css';
import { CreateIssueDialog } from '../../pages/create-issue-dialog/create-issue-dialog.tsx';

export interface ShellProps {
	children: ReactNode;
}

export const Shell = ({ children }: ShellProps) => {
	const [createIssueDialogOpen, setCreateIssueDialogOpen] = useState(false);

	return <div className="shell">
		<AppBar position="relative">
			<Toolbar className="shell__toolbar">
				<Typography variant="h6" component="h1">
					Issue Tracker
				</Typography>
				<Button variant="outlined" color="inherit" onClick={() => setCreateIssueDialogOpen(true)}>
					Create
				</Button>
			</Toolbar>
		</AppBar>
		{children}
		<CreateIssueDialog open={createIssueDialogOpen} onClose={() => setCreateIssueDialogOpen(false)} />
	</div>;
};
