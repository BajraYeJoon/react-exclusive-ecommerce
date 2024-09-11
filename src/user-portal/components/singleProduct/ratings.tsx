import { StarIcon } from "lucide-react";
import uuidv4 from "../../../common/lib/utils/uuid";

export default function Reviews({ values }: any) {

  console.log(values, "ratings values");

  // const reviews = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     rating: 4,
  //     review:
  //       "I really love this product! It's been a game-changer in my kitchen. The design is sleek and modern, and it's so easy to use. Highly recommend.",
  //     date: "2023-05-15",
  //   },
  //   {
  //     id: 2,
  //     name: "Alex Smith",
  //     rating: 5,
  //     review:
  //       "This is the best product I've ever purchased. It's durable, efficient, and makes my life so much easier. I can't imagine going back to my old way of doing things.",
  //     date: "2023-04-20",
  //   },
  //   {
  //     id: 3,
  //     name: "Emily Parker",
  //     rating: 3,
  //     review:
  //       "The product is okay, but I've had some issues with it. It doesn't seem to be as durable as I was hoping, and the customer service could be better. I'm on the fence about whether I'd recommend it.",
  //     date: "2023-03-12",
  //   },
  //   {
  //     id: 4,
  //     name: "Michael Chen",
  //     rating: 4,
  //     review:
  //       "I'm really impressed with this product. It's well-made, easy to use, and has exceeded my expectations. The only downside is that it's a bit pricey, but I think it's worth the investment.",
  //     date: "2023-02-28",
  //   },
  //   {
  //     id: 5,
  //     name: "Olivia Hernandez",
  //     rating: 5,
  //     review:
  //       "This is the best product I've ever owned. It's changed the way I do [task] and has made my life so much easier. I can't recommend it enough!",
  //     date: "2023-01-05",
  //   },
  // ];
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
                  ? "fill-primary"
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
              <div className="font-semibold">Sarah</div>
              <div className="ml-auto flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={`review-star-${uuidv4()}`}
                    className={`h-5 w-5 ${
                      star <= review.rating
                        ? "border-none fill-primary"
                        : "fill-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mb-2 text-sm text-muted-foreground">
              {review.comment}
            </div>
            {/* <div className="text-xs text-muted-foreground">
              {new Date(review.date).toLocaleDateString()}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
