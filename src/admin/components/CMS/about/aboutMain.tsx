import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../../common/ui/button";
import { OurStoryEdit } from "./OurStoryEdit";
import { OurStoryDisplay } from "./OurStoryDisplay";
import { fetchAbout, updateAbout } from "../../../../common/api/cms/about";

export interface OurStoryContent {
  title: string;
  body: string;
  image: string;
}

export default function AboutMain() {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: contentData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAbout,
  });

  if (isLoading) return <div>Loading...</div>;
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