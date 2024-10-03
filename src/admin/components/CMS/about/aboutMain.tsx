import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../../common/ui/button";
import { OurStoryEdit } from "./OurStoryEdit";
import { OurStoryDisplay } from "./OurStoryDisplay";
import { fetchAbout } from "../../../../common/api/cms/about";
import { StoryLoader } from "../../../../common/components/cmsLoader";

export interface OurStoryContent {
	title: string;
	body: string;
	image: string;
}

export default function AboutMain() {
	const [isEditing, setIsEditing] = useState(false);

	const {
		data: contentData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["about"],
		queryFn: fetchAbout,
	});

	if (isLoading) return <StoryLoader />;
	if (error) return <div>Error loading content</div>;

	const content = contentData?.data;

	return (
		<div className="">
			<h2 className="mb-2 text-xl font-medium">Manage About</h2>
			<hr />
			{isEditing ? (
				<OurStoryEdit content={content} onCancel={() => setIsEditing(false)} />
			) : (
				<>
					<OurStoryDisplay content={content} />
					<Button onClick={() => setIsEditing(true)} className="mt-4">
						Edit Content
					</Button>
				</>
			)}
		</div>
	);
}
