import type { FC, ReactNode } from 'react';
import { FieldError, Input, Label, TextField } from '@heroui/react';
import type { Lens } from '@hookform/lenses';
import { useController } from 'react-hook-form';

export interface TextInputProps {
	lens: Lens<string>
	label: ReactNode;
}

export const TextInput: FC<TextInputProps> = ({ lens, label }) => {
	const {fieldState, field} = useController(lens.interop());

	// const { ref, onChange, ...register } = lens.interop((ctrl, name) => ctrl.register(name));
	// const fieldState = lens.interop((ctrl, name) => ctrl.getFieldState(name));

	console.log(fieldState)

	return (
		<TextField isInvalid={fieldState.invalid}>
			<Label>{label}</Label>
			<Input {...field} />
			<FieldError>{fieldState.error?.message}</FieldError>
		</TextField>
	);
};
