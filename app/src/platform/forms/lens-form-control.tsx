import { type RefCallBack, type FieldError, useController } from 'react-hook-form';
import type { FC } from 'react';
import type { Lens } from '@hookform/lenses';

export interface LensFormControlProps<T> {
	ref?: RefCallBack;
	name?: string;
	value: T;
	onChange?: (...event: unknown[]) => void;
	onBlur?: () => void;
	disabled?: boolean;
	error?: FieldError;
}

export interface LensAdapterProps<T> {
	lens: Lens<T>
}

type PropsWithoutControlled<TValue, TProps extends LensFormControlProps<TValue>> = Omit<TProps, keyof LensFormControlProps<TValue>>;

type ExtractValue<TProps> = TProps extends LensFormControlProps<infer TValue> ? TValue : never;

export function withLens<TProps extends LensFormControlProps<any>>(Component: FC<TProps>): FC<PropsWithoutControlled<ExtractValue<TProps>, TProps> & LensAdapterProps<ExtractValue<TProps>>> {
	return ({ lens, ...props}) => {
		type TValue = ExtractValue<TProps>;

		// HACK: can this never be removed here?
		const { field, fieldState } = useController(lens.interop() as never);

		const lensFormControlProps = { ...field, error: fieldState.error } as LensFormControlProps<TValue>;
		// HACK: how do i remove this unknown?
		const passThroughProps = props as unknown as PropsWithoutControlled<TValue, TProps>;

		const componentProps = { ...passThroughProps, ...lensFormControlProps } as TProps;

    return <Component {...componentProps} />
  }
}
