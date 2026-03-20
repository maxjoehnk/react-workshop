import { type FC, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { IssueForm } from '../../organisms/issue-form/issue-form.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIssueMutation } from '../../../api/@tanstack/react-query.gen.ts';
import type { IssueCreateInput } from '../../../api';

export interface CreateIssueDialogProps {
	open: boolean;
	onClose: () => void;
}

export const CreateIssueDialog: FC<CreateIssueDialogProps> = ({ open, onClose }) => {
	const queryClient = useQueryClient();
	const { mutateAsync } = useMutation({
		...createIssueMutation(), onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['issues'] });
		}
	})

	const createIssue = useCallback(async (issue: IssueCreateInput) => {
		await mutateAsync({ body: issue });
		onClose();
	}, [mutateAsync, onClose]);

	return <Dialog open={open} onClose={onClose}>
		<DialogTitle>Create Issue</DialogTitle>
		<DialogContent>
			<IssueForm onCancel={onClose} onSave={createIssue}/>
		</DialogContent>
	</Dialog>
}
