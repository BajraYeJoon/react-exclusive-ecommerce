
export const MaxWidthWrapper = ({
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div className="mx-auto h-screen max-w-screen-2xl px-4">{children}</div>
	);
};
