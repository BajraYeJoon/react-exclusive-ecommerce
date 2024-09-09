import { useState } from "react";
import { Button } from "../../../../common/ui/button";
import { OurStoryEdit } from "./OurStoryEdit";
import { OurStoryDisplay } from "./OurStoryDisplay";

export interface OurStoryContent {
  title: string;
  paragraph1: string;
  paragraph2: string;
  imageUrl: string;
}

const initialContent: OurStoryContent = {
  title: "our story",
  paragraph1:
    "Launced in 2015, Exclusive is South Asia's premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.",
  paragraph2:
    "Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging from consumer.",
  imageUrl: "/girls.webp",
};

export default function AboutMain() {
  const [content, setContent] = useState<OurStoryContent>(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (newContent: OurStoryContent) => {
    setContent(newContent);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isEditing ? (
        <OurStoryEdit
          content={content}
          onSave={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
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
