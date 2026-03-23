import type { FC } from 'react';
import { zIssuePriority } from '../../../api/zod.gen.ts';
import type { IssuePriority } from '../../../api';
import { FieldError, Label, ListBox, Select } from '@heroui/react';
import type { LensFormControlProps } from '../../../platform/forms/lens-form-control.tsx';

export interface PrioritySelectProps extends LensFormControlProps<IssuePriority | undefined> {
	label: string;
}

export const PrioritySelect: FC<PrioritySelectProps> = ({ label, error, ...field }) => {
	return <Select {...field} isDisabled={field.disabled} isInvalid={error != null}>
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
		<FieldError>{error?.message}</FieldError>
	</Select>
}
