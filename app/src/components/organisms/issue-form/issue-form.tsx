import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { zIssueCreateInput } from '../../../api/zod.gen.ts';
import { Button, TextField } from '@mui/material';
import './issue-form.css';
import { PrioritySelect } from '../../molecules/priority-select/priority-select.tsx';
import { UserAutocomplete } from '../../molecules/user-autocomplete/user-autocomplete.tsx';
import type { IssueCreateInput } from '../../../api';

export interface IssueFormProps {
	onSave: (issue: IssueCreateInput) => Promise<unknown>;
	onCancel: () => void;
}

export const IssueForm: FC<IssueFormProps> = ({ onSave, onCancel }) => {
	const { register, handleSubmit, formState: { errors } } = useForm<IssueCreateInput>({
		resolver: zodResolver(zIssueCreateInput)
	})

	return <form className="issue-form" onSubmit={handleSubmit(onSave)}>
		<TextField label="Title" {...register('title')} error={errors.title != null} helperText={errors.title?.message}/>
		<TextField label="Description" {...register('description')} multiline minRows={3} error={errors.description != null} helperText={errors.description?.message}/>
		<PrioritySelect label="Priority" {...register('priority')} error={errors.priority != null} helperText={errors.priority?.message}/>
		<UserAutocomplete label="Assignee" {...register('assignee')} error={errors.assignee != null} />
		<div>
			<Button onClick={() => onCancel()} type="button">Cancel</Button>
			<Button type="submit">Create</Button>
		</div>
	</form>
}
