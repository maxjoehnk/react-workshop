import type { FC, ReactNode } from 'react';
import { FieldError, Input, Label, TextField } from '@heroui/react';
import type { FormControl } from '../../../platform/forms/form-control.tsx';

export interface TextInputProps extends FormControl<string> {
	label: ReactNode;
}

export const TextInput: FC<TextInputProps> = ({ label, error, ...props }) => {
	return (
		<TextField isInvalid={!!error}>
			<Label>{label}</Label>
			<Input {...props} />
			<FieldError>{error?.message}</FieldError>
		</TextField>
	);
}
