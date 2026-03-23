import type { FC } from 'react';
import { zIssuePriority } from '../../../api/zod.gen.ts';
import type { Lens } from '@hookform/lenses';
import type { IssuePriority } from '../../../api';
import { FieldError, Label, ListBox, Select } from '@heroui/react';
import { useController } from 'react-hook-form';

export interface PrioritySelectProps {
	label: string;
	lens: Lens<IssuePriority | undefined>
}

export const PrioritySelect: FC<PrioritySelectProps> = ({ label, lens }) => {
	const {fieldState, field} = useController(lens.interop());

	return <Select {...field} isDisabled={field.disabled} isInvalid={fieldState.error != null}>
		<Label>{label}</Label>
		<Select.Trigger>
			<Select.Value/>
			<Select.Indicator/>
		</Select.Trigger>
		<Select.Popover>
			<ListBox>
				{zIssuePriority.options.map(option => <ListBox.Item key={option} id={option} textValue={option}>{option}
					<ListBox.ItemIndicator/></ListBox.Item>)}
			</ListBox>
		</Select.Popover>
		<FieldError>{fieldState.error?.message}</FieldError>
	</Select>
}
