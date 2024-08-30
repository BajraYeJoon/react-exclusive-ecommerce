"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { Badge } from "../../../common/ui/badge";
import { Button } from "../../../common/ui/button";
import { Calendar } from "../../../common/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../common/ui/popover";
import { X, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  saleStart: Date | undefined;
  saleEnd: Date | undefined;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 79.99,
    image: "/placeholder.svg?height=100&width=100",
    saleStart: undefined,
    saleEnd: undefined,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=100&width=100",
    saleStart: undefined,
    saleEnd: undefined,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "/placeholder.svg?height=100&width=100",
    saleStart: undefined,
    saleEnd: undefined,
  },
  {
    id: 4,
    name: "Laptop",
    price: 899.99,
    image: "/placeholder.svg?height=100&width=100",
    saleStart: undefined,
    saleEnd: undefined,
  },
  {
    id: 5,
    name: "Smartphone",
    price: 649.99,
    image: "/placeholder.svg?height=100&width=100",
    saleStart: undefined,
    saleEnd: undefined,
  },
  {
    id: 6,
    name: "Tablet",
    price: 349.99,
    image: "/placeholder.svg?height=100&width=100",
    saleStart: undefined,
    saleEnd: undefined,
  },
];

export default function FlashSaleAdmin() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const removeFromSale = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const updateSaleDate = (
    id: number,
    field: "saleStart" | "saleEnd",
    date: Date | undefined,
  ) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: date } : product,
      ),
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Flash Sale Items</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <p className="mb-2 font-semibold">${product.price.toFixed(2)}</p>
              <div className="space-y-2">
                <DatePickerWithRange
                  label="Sale Period"
                  startDate={product.saleStart}
                  endDate={product.saleEnd}
                  onStartDateChange={(date) =>
                    updateSaleDate(product.id, "saleStart", date)
                  }
                  onEndDateChange={(date) =>
                    updateSaleDate(product.id, "saleEnd", date)
                  }
                />
              </div>
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

type DatePickerWithRangeProps = {
  label: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
};

function DatePickerWithRange({
  label,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DatePickerWithRangeProps) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={`w-full justify-start text-left font-normal ${
              !startDate && !endDate && "text-muted-foreground"
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate && endDate ? (
              format(startDate, "LLL dd, y") +
              " - " +
              format(endDate, "LLL dd, y")
            ) : (
              <span>{label}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={startDate}
            selected={{ from: startDate, to: endDate }}
            onSelect={(range) => {
              onStartDateChange(range?.from);
              onEndDateChange(range?.to);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
