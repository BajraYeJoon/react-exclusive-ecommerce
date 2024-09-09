import { OurStoryContent } from "./aboutMain";

interface OurStoryDisplayProps {
  content: OurStoryContent;
}

export function OurStoryDisplay({ content }: OurStoryDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
      <div className="flex-1">
        <h1 className="mb-4 text-6xl capitalize max-2xl:text-4xl">
          {content.title}
        </h1>
        <p className="mb-4 text-lg max-2xl:text-base">{content.paragraph1}</p>
        <p className="text-lg max-2xl:text-base">{content.paragraph2}</p>
      </div>
      <img
        alt="girls"
        width="700"
        height="700"
        decoding="async"
        src={content.imageUrl}
        className="max-3xl:w-[600px] w-[600px] object-contain max-2xl:w-[500px]"
      />
    </div>
  );
}
