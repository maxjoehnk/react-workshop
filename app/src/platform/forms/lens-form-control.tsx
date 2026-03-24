import { type FieldError, type RefCallBack } from 'react-hook-form';
import type { Lens } from '@hookform/lenses';

export type UseOptionalLensProps<T> = WithLens<T> | WithoutLens<T>;

export interface WithLens<T> {
	lens: Lens<T>;
}

export interface WithoutLens<T> {
	ref?: RefCallBack;
	name?: string;
	value?: T;
	onChange?: (...event: unknown[]) => void;
	onBlur?: () => void;
	disabled?: boolean;
	error?: FieldError;
}

export function isLens<T>(props: UseOptionalLensProps<T>): props is WithLens<T> {
	return 'lens' in props
}
