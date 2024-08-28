import { ImageIcon } from "lucide-react";
import uuidv4 from "../../lib/utils/uuid";
import useWindow from "../../lib/useWindow";

const ProductCardSkeleton = () => {
  const { dimension } = useWindow();

  let skeletonCount;
  if (dimension.width > 1024) {
    skeletonCount = 4;
  } else if (dimension.width > 768) {
    skeletonCount = 3;
  } else {
    skeletonCount = 2;
  }

  return (
    <div className="flex justify-around gap-4">
      {Array.from({ length: skeletonCount }).map(() => (
        <div
          className="max-w-xl animate-pulse rounded border border-gray-200 p-4 shadow md:p-6"
          key={`skeleton-${uuidv4()}`}
        >
          <div className="mb-4 flex h-48 items-center justify-center rounded bg-gray-300">
            <ImageIcon className="h-10 w-10 text-gray-200" />
          </div>
          <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200"></div>
          <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
          <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
          <div className="h-2 rounded-full bg-gray-200"></div>

          <div>
            <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-200"></div>
            <div className="h-2 w-48 rounded-full bg-gray-200"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
