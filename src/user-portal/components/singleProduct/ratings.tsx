import { Star, StarIcon } from "lucide-react";
import uuidv4 from "../../../common/lib/utils/uuid";

export default function Reviews({ values }: any) {
  console.log(values, "ratings values");

  const totalReviews = values?.totalRating;
  const averageRating = values?.averageRating;

  return (
    <div className="rounded-lg bg-background p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
      <div className="mb-4 flex items-center">
        <div className="mr-2 text-4xl font-bold">{averageRating}</div>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={`review-star-${uuidv4()}`}
              className={`h-6 w-6 ${
                star <= Math.floor(averageRating)
                  ? "fill-yellow-400 text-gray-500"
                  : "fill-muted stroke-muted-foreground"
              }`}
            />
          ))}
        </div>
        <div className="ml-4 text-muted-foreground">{totalReviews} reviews</div>
      </div>

      <div className="mt-6 border-t border-muted pt-6">
        {values?.allRatings[0]?.ratings.map((review: any) => (
          <div key={review.id} className="mb-6">
            <div className="mb-2 flex items-center">
              <div className="font-medium">Anonymous</div>
              <div className="ml-auto flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={`review-star-${uuidv4()}`}
                    className={`h-5 w-5 ${
                      star <= review.rating
                        ? "border-none fill-yellow-400 text-gray-500"
                        : "fill-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mb-2 text-sm text-muted-foreground">
              {review.comment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
