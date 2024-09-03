import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { X } from "lucide-react";
import { Button } from "../../../common/ui/button";
import { Badge } from "../../../common/ui/badge";

// Sample product type
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// Sample initial products data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 79.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Laptop",
    price: 899.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Smartphone",
    price: 649.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Tablet",
    price: 349.99,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function FlashSaleAdmin() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const removeFromSale = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Flash Sale Items</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="relative">
            <Badge
              className="absolute right-2 top-2 bg-red-500"
              variant="secondary"
            >
              Sale
            </Badge>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.image}
                alt={product.name}
                className="mb-2 h-32 w-full object-cover"
              />
              <p className="font-semibold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => removeFromSale(product.id)}
              >
                <X className="mr-2 h-4 w-4" /> Remove from Sale
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
