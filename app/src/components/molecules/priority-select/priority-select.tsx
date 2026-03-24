import type { FC } from 'react';
import { zIssuePriority } from '../../../api/zod.gen.ts';
import type { IssuePriority } from '../../../api';
import { FieldError, Label, ListBox, Select } from '@heroui/react';
import {
	isLens,
	type UseOptionalLensProps,
	type WithLens,
	type WithoutLens
} from '../../../platform/forms/lens-form-control.tsx';
import { useController } from 'react-hook-form';

export interface PrioritySelectProps {
	label: string;
}

export const PrioritySelect: FC<PrioritySelectProps & UseOptionalLensProps<IssuePriority | undefined>> = ({ label, ...props }) => {
	if (isLens(props)) {
		return <LensPrioritySelect lens={props.lens} label={label}/>
	}

	return <InternalPrioritySelect label={label} {...props} />
}

const LensPrioritySelect: FC<PrioritySelectProps & WithLens<IssuePriority | undefined>> = ({ lens, label }) => {
	const { field, fieldState } = useController(lens.interop());

	return <InternalPrioritySelect label={label} {...field} error={fieldState.error} />
}


const InternalPrioritySelect: FC<PrioritySelectProps & WithoutLens<IssuePriority | undefined>> = ({ label, error, ...field }) => {
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
