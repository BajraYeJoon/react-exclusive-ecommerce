import { Button } from "../../../common/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../common/ui/avatar";
import { ChevronDown, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../../common/api/productApi";

const RatingDisplayAdmin = () => {
  const { data: productRatingsData } = useQuery({
    queryKey: ["productRatings"],
    queryFn: fetchAllProducts,
  });

  console.log(
    productRatingsData &&
      productRatingsData.map((product: any) => product.ratings),
  );

  const productRatings = [
    {
      id: 1,
      productName: "Wireless Earbuds",
      rating: 4,
      user: "Alice Smith",
      comment: "Great sound quality!",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      productName: "Smart Watch",
      rating: 5,
      user: "Bob Johnson",
      comment: "Love the features!",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      productName: "Laptop Stand",
      rating: 3,
      user: "Charlie Brown",
      comment: "Decent, but could be sturdier.",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      productName: "Bluetooth Speaker",
      rating: 4,
      user: "Diana Prince",
      comment: "Impressive bass for its size.",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      productName: "Ergonomic Mouse",
      rating: 5,
      user: "Ethan Hunt",
      comment: "Comfortable for long use!",
      avatar: "/placeholder.svg",
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="rounded-lg border shadow-sm">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="font-semibold">Recent Product Ratings</h2>
          <Button variant="outline" size="sm">
            View all
          </Button>
        </div>
        <div className="divide-y">
          {productRatings.map((rating) => (
            <div key={rating.id} className="flex items-start gap-4 p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage alt={rating.user} src={rating.avatar} />
                <AvatarFallback>{rating.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{rating.productName}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Rated by {rating.user}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < rating.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-sm">{rating.comment}</p>
              </div>
              <Button size="sm" variant="ghost" className="ml-auto">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RatingDisplayAdmin;
