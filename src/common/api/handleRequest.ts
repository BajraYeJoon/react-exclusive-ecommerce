export const handleRequest = async <T>(
	callback: () => Promise<T>,
	errorMessage: string,
) => {
	try {
		return await callback();
	} catch (error) {
		console.error(`${errorMessage}:`, error);
		throw error;
	}
};
