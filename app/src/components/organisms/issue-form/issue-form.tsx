import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { zIssueCreateInput } from '../../../api/zod.gen.ts';
import { Button, Form } from '@heroui/react';
import './issue-form.css';
import type { IssueCreateInput, SubtaskCreateInput } from '../../../api';
import { SubtaskList } from '../../molecules/subtask-list/subtask-list.tsx';
import { useLens } from '@hookform/lenses';
import { DevTool } from '@hookform/devtools';
import { TextInputFormControl } from '../../atoms/text-input/text-input-form-control.tsx';
import { PrioritySelectFormControl } from '../../molecules/priority-select/priority-select-form-control.tsx';
import { UserAutocompleteFormControl } from '../../molecules/user-autocomplete/user-autocomplete-form-control.tsx';

export interface IssueFormProps {
	onSave: (issue: IssueCreateInput) => Promise<unknown>;
	onCancel: () => void;
}

export const IssueForm: FC<IssueFormProps> = ({ onSave, onCancel }) => {
	const { control, handleSubmit } = useForm<IssueCreateInput>({
		resolver: zodResolver(zIssueCreateInput),
		defaultValues: {
			subtasks: []
		}
	})
	const lens = useLens({ control })

	return <Form className="issue-form" onSubmit={handleSubmit(onSave)}>
		<TextInputFormControl lens={lens.focus('title')} label="Title" />
		<TextInputFormControl lens={lens.focus('description')} label="Description" />
		<PrioritySelectFormControl lens={lens.focus('priority')} label="Priority" />
		<UserAutocompleteFormControl label="Assignee" lens={lens.focus('assignee')} />
		<SubtaskList lens={lens.focus('subtasks').cast<SubtaskCreateInput[]>()} />

		<div className="issue-form__actions">
			<Button variant="secondary" onClick={() => onCancel()} type="button">Cancel</Button>
			<Button type="submit">Create</Button>
		</div>

		<DevTool control={control} />
	</Form>
}
