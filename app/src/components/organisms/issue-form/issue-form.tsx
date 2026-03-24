import type { FC } from 'react';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { zIssueCreateInput } from '../../../api/zod.gen.ts';
import { Button, Form } from '@heroui/react';
import './issue-form.css';
import type { IssueCreateInput } from '../../../api';
import { SubtaskList } from '../../molecules/subtask-list/subtask-list.tsx';
import { useLens } from '@hookform/lenses';
import { DevTool } from '@hookform/devtools';
import { TextInput } from '../../atoms/text-input/text-input.tsx';
import { PrioritySelect } from '../../molecules/priority-select/priority-select.tsx';
import { z } from 'zod';
import { IssueVersions } from '../../molecules/issue-versions/issue-versions.tsx';

export interface IssueFormProps {
	onSave: (issue: IssueCreateInput) => Promise<unknown>;
	onCancel: () => void;
}

export const IssueForm: FC<IssueFormProps> = ({ onSave, onCancel }) => {
	const { control, handleSubmit } = useForm({
		resolver: zodResolver(zIssueCreateInput.extend({
			title: z.string().min(5),
		})),
		defaultValues: {
			subtasks: [],
			versions: {}
		}
	})
	const lens = useLens({ control })
	const titleControl = useController({ control, name: 'title' })
	const descriptionControl = useController({ control, name: 'description' })
	const priorityControl = useController({ control, name: 'priority' })

	return <Form className="issue-form" onSubmit={handleSubmit(onSave)}>
		<TextInput label="Title" {...titleControl.field} error={titleControl.fieldState.error}/>
		<TextInput label="Description" {...descriptionControl.field} error={descriptionControl.fieldState.error}/>
		<PrioritySelect label="Priority" {...priorityControl.field} error={priorityControl.fieldState.error}/>
		<IssueVersions lens={lens.focus('versions')}/>
		<SubtaskList lens={lens.focus('subtasks')}/>

		<div className="issue-form__actions">
			<Button variant="secondary" onClick={() => onCancel()} type="button">Cancel</Button>
			<Button type="submit">Create</Button>
		</div>

		<DevTool control={control}/>
	</Form>
}
