import { StarIcon } from "lucide-react";
import uuidv4 from "../../../common/lib/utils/uuid";

export default function Reviews({ values }: any) {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 4,
      review:
        "I really love this product! It's been a game-changer in my kitchen. The design is sleek and modern, and it's so easy to use. Highly recommend.",
      date: "2023-05-15",
    },
    {
      id: 2,
      name: "Alex Smith",
      rating: 5,
      review:
        "This is the best product I've ever purchased. It's durable, efficient, and makes my life so much easier. I can't imagine going back to my old way of doing things.",
      date: "2023-04-20",
    },
    {
      id: 3,
      name: "Emily Parker",
      rating: 3,
      review:
        "The product is okay, but I've had some issues with it. It doesn't seem to be as durable as I was hoping, and the customer service could be better. I'm on the fence about whether I'd recommend it.",
      date: "2023-03-12",
    },
    {
      id: 4,
      name: "Michael Chen",
      rating: 4,
      review:
        "I'm really impressed with this product. It's well-made, easy to use, and has exceeded my expectations. The only downside is that it's a bit pricey, but I think it's worth the investment.",
      date: "2023-02-28",
    },
    {
      id: 5,
      name: "Olivia Hernandez",
      rating: 5,
      review:
        "This is the best product I've ever owned. It's changed the way I do [task] and has made my life so much easier. I can't recommend it enough!",
      date: "2023-01-05",
    },
  ];
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const ratingBreakdown = reviews.reduce(
    (breakdown, review) => {
      breakdown[review.rating]++;
      return breakdown;
    },
    [0, 0, 0, 0, 0],
  );
  return (
    <div className="rounded-lg bg-background p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
      <div className="mb-4 flex items-center">
        <div className="mr-2 text-4xl font-bold">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={`review-star-${uuidv4()}`}
              className={`h-6 w-6 ${
                star <= Math.floor(averageRating)
                  ? "fill-primary"
                  : "fill-muted stroke-muted-foreground"
              }`}
            />
          ))}
        </div>
        <div className="ml-4 text-muted-foreground">{totalReviews} reviews</div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[5, 4, 3, 2, 1].map((star, index) => (
          <div key={star} className="flex items-center">
            <div className="mr-4 w-16 text-right text-muted-foreground">
              {star} star{star !== 1 && "s"}
            </div>
            <div className="h-4 w-full rounded-full bg-muted">
              <div
                className="h-4 rounded-full bg-primary"
                style={{
                  width: `${(ratingBreakdown[index] / totalReviews) * 100}%`,
                }}
              />
            </div>
            <div className="ml-4 w-16 text-left text-muted-foreground">
              {ratingBreakdown[index]}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-muted pt-6">
        {reviews.map((review) => (
          <div key={review.id} className="mb-6">
            <div className="mb-2 flex items-center">
              <div className="font-semibold">{review.name}</div>
              <div className="ml-auto flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={`review-star-${uuidv4()}`}
                    className={`h-5 w-5 ${
                      star <= review.rating
                        ? "fill-primary"
                        : "fill-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mb-2 text-sm text-muted-foreground">
              {review.review}
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(review.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
