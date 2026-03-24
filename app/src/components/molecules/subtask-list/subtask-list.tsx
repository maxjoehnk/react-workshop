import { Button } from '@heroui/react';
import type { FC } from 'react';
import type { Lens } from '@hookform/lenses';
import { useFieldArray } from '@hookform/lenses/rhf';
import type { SubtaskCreateInput } from '../../../api';
import { mdiDelete } from '@mdi/js';
import { Icon } from '@mdi/react';
import './subtask-list.css';
import { TextInput } from '../../atoms/text-input/text-input.tsx';
import { useController } from 'react-hook-form';

export interface SubtaskListProps {
	lens: Lens<SubtaskCreateInput[]>,
}

export const SubtaskList: FC<SubtaskListProps> = ({ lens }) => {
	const { fields, append, remove } = useFieldArray(lens.interop());

	return <div className="subtask-list">
		{lens.map(fields, (field, l, i) => <SubtaskItem key={field.id} lens={l} onRemove={() => remove(i)}/>)}
		<Button onClick={() => append({ title: '', description: '' })}>Add Subtask</Button>
	</div>
}

interface SubtaskItemProps {
	lens: Lens<SubtaskCreateInput>,
	onRemove: () => void,
}

const SubtaskItem: FC<SubtaskItemProps> = ({ lens, onRemove }) => {
	const title = useController(lens.focus('title').interop());
	const description = useController(lens.focus('description').interop());

	return <div className="subtask-list__entry">
		<TextInput label="Title" {...title.field} error={title.fieldState.error}/>
		<TextInput label="Description" {...description.field} error={description.fieldState.error}/>
		<Button isIconOnly variant="secondary" onClick={onRemove}>
			<Icon path={mdiDelete} size="24px"/>
		</Button>
	</div>;

}
