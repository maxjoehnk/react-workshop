import type { FC, ReactNode } from 'react';
import { FieldError, Input, Label, TextField } from '@heroui/react';
import type { LensFormControlProps } from '../../../platform/forms/lens-form-control.tsx';

export interface TextInputProps extends LensFormControlProps<string> {
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
};
