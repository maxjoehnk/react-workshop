import { useCallback, useState } from 'react';

export function useDebounce<TArgs, TReturn>(callback: (args: TArgs, signal: AbortSignal) => Promise<TReturn>, debounce: number = 500): (args: TArgs) => Promise<TReturn> {
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
	const [signal, setSignal] = useState<AbortController | null>(null);

	return useCallback(async (args: TArgs) => {
		signal?.abort();
		if (timer != null) {
			clearTimeout(timer);
		}
		const abortController = new AbortController();
		setSignal(abortController);

		await new Promise<void>((resolve) => {
			const timer = setTimeout(() => resolve(), debounce);
			setTimer(timer);
		});
		return await callback(args, abortController.signal);
	}, [callback, signal, timer, debounce]);
}
