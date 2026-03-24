import type { FC, ReactNode } from 'react';
import { FieldError, Input, Label, TextField } from '@heroui/react';
import {
	isLens,
	type UseOptionalLensProps,
	type WithLens, type WithoutLens
} from '../../../platform/forms/lens-form-control.tsx';
import { useController } from 'react-hook-form';

export interface TextInputProps {
	label: ReactNode;
}

export const TextInput: FC<TextInputProps & UseOptionalLensProps<string>> = ({ label, ...props }) => {
	if (isLens(props)) {
		return <LensTextInput lens={props.lens} label={label}/>
	}

	return <InternalTextInput label={label} {...props} />
};

const LensTextInput: FC<TextInputProps & WithLens<string>> = ({ lens, label }) => {
	const { field, fieldState } = useController(lens.interop());

	return <InternalTextInput label={label} {...field} error={fieldState.error} />
}

const InternalTextInput: FC<TextInputProps & WithoutLens<string>> = ({ label, error, ...props }) => {
	return (
		<TextField isInvalid={!!error}>
			<Label>{label}</Label>
			<Input {...props} />
			<FieldError>{error?.message}</FieldError>
		</TextField>
	);
}
