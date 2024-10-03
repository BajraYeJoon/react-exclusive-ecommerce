import { OurStoryContent } from "./aboutMain";

interface OurStoryDisplayProps {
	content: OurStoryContent;
}

export function OurStoryDisplay({ content }: Readonly<OurStoryDisplayProps>) {
	return (
		<div className="my-3 flex flex-col flex-wrap items-center justify-between gap-8 md:flex-row">
			<div className="flex-1">
				<h1 className="mb-4 text-3xl font-medium capitalize max-2xl:text-xl">
					{content.title}
				</h1>
				<p className="mb-4 text-base max-2xl:text-sm">{content.body}</p>
			</div>
			<img
				alt="girls"
				decoding="async"
				src={content.image}
				className="w-44 object-contain md:w-[300px] lg:w-[500px]"
			/>
		</div>
	);
}
