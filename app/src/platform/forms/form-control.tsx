import { type FieldError, type RefCallBack } from 'react-hook-form';

export interface FormControl<T> {
	ref?: RefCallBack;
	name?: string;
	value?: T;
	onChange?: (...event: unknown[]) => void;
	onBlur?: () => void;
	disabled?: boolean;
	error?: FieldError;
}
