import { Button } from '@heroui/react';
import type { FC } from 'react';
import type { Lens } from '@hookform/lenses';
import { useFieldArray } from '@hookform/lenses/rhf';
import type { SubtaskCreateInput } from '../../../api';
import { mdiDelete } from '@mdi/js';
import { Icon } from '@mdi/react';
import './subtask-list.css';
import { TextInputFormControl } from '../../atoms/text-input/text-input-form-control.tsx';

export interface SubtaskListProps {
	lens: Lens<SubtaskCreateInput[]>,
}

export const SubtaskList: FC<SubtaskListProps> = ({ lens }) => {
	const { fields, append, remove } = useFieldArray(lens.interop());

	return <div className="subtask-list">
		{lens.map(fields, (field, l, i) => <div key={field.id} className="subtask-list__entry">
			<TextInputFormControl lens={l.focus('title')} label="Title"/>
			<TextInputFormControl lens={l.focus('description')} label="Description"/>
			<Button isIconOnly variant="secondary" onClick={() => remove(i)}>
				<Icon path={mdiDelete} size="24px"/>
			</Button>
		</div>)}
		<Button onClick={() => append({ title: '', description: '' })}>Add Subtask</Button>
	</div>
}
