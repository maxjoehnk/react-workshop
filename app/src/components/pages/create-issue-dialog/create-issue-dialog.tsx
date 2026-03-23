import { type FC, useCallback } from 'react';
import { IssueForm } from '../../organisms/issue-form/issue-form.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateIssueMutation } from '../../../api/@tanstack/react-query.gen.ts';
import type { IssueCreateInput } from '../../../api';
import { Dialog } from '../../molecules/dialog/dialog.tsx';

export interface CreateIssueDialogProps {
	open: boolean;
	onClose: () => void;
}

export const CreateIssueDialog: FC<CreateIssueDialogProps> = ({ open, onClose }) => {
	const queryClient = useQueryClient();
	const { mutateAsync } = useCreateIssueMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [{ tags: ['issues'] }] });
			onClose();
		}
	})

	const createIssue = useCallback(async (issue: IssueCreateInput) => {
		await mutateAsync({ body: issue });
	}, [mutateAsync]);

	return <Dialog isOpen={open} setIsOpen={onClose} title="Create Issue">
		<IssueForm onCancel={onClose} onSave={createIssue}/>
	</Dialog>
}
