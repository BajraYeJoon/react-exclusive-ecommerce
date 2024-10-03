export const debounce = <T extends (...args: any[]) => any>(
	fn: T,
	delay: number = 2000,
): ((...args: Parameters<T>) => void) => {
	let timerId: ReturnType<typeof setTimeout> | null = null;
	return (...args: Parameters<T>): void => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(() => fn(...args), delay);
	};
};
