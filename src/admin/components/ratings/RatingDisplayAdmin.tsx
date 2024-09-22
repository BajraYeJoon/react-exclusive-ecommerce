import { Button } from "../../../common/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../common/ui/avatar";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../../common/api/productApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { useState } from "react";

const RatingDisplayAdmin = () => {
  const { data: productRatingsData } = useQuery({
    queryKey: ["productRatings"],
    queryFn: fetchAllProducts,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Product Ratings Overview</h1>
      {productRatingsData?.map(
        (product: any) =>
          product.ratings?.length > 0 && (
            <ProductRatings key={product.id} product={product} />
          ),
      )}
    </div>
  );
};

export default RatingDisplayAdmin;

function ProductRatings({ product }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{product.title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {(expanded ? product.ratings : product.ratings.slice(0, 1)).map(
          (rating: any) => (
            <RatingItem key={rating.id} rating={rating} />
          ),
        )}
        {!expanded && product.ratings.length > 1 && (
          <Button variant="link" onClick={() => setExpanded(true)}>
            Show {product.ratings.length - 1} more ratings
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function RatingItem({ rating }: any) {
  return (
    <div className="mb-4 flex items-start space-x-4">
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={`/placeholder.svg?height=40&width=40`}
          alt={rating.user}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{rating.user}</h3>
          <span className="text-sm text-gray-500">
            {new Date(rating.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="mt-1 flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-700">{rating.comment}</p>
      </div>
    </div>
  );
}
