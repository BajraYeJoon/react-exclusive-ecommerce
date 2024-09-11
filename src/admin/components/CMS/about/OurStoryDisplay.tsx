import { OurStoryContent } from "./aboutMain";

interface OurStoryDisplayProps {
  content: OurStoryContent;
}

export function OurStoryDisplay({ content }: OurStoryDisplayProps) {
  return (
    <div className="flex flex-col flex-wrap items-center justify-between gap-8 md:flex-row">
      <div className="flex-1">
        <h1 className="mb-4 text-3xl capitalize max-2xl:text-base">
          {content.title}
        </h1>
        <p className="mb-4 text-base max-2xl:text-sm">{content.body}</p>
      </div>
      <img
        alt="girls"
        decoding="async"
        src={content.image}
        className="w-96 object-contain md:w-[300px] lg:w-[400px]"
      />
    </div>
  );
}
