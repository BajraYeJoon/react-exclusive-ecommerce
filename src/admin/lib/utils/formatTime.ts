export const formatDateTime = (dateString: string) => {
	const date = new Date(dateString);
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const formattedTime = date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
	return `${formattedDate} at ${formattedTime}`;
};
