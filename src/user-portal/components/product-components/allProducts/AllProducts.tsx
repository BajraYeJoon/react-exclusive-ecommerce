import { useState } from "react";
import { ProductCardSkeleton } from "../../../../common/components";
import { fetchAllProducts } from "../../../../common/api/productApi";
import ProductCard from "../productCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownAZ, ArrowUpAZ, ChevronDown } from "lucide-react";

interface ProductType {
  id: number;
  title: string;
  price: number;
  rating: number;
  image: string;
}

const AllProducts = () => {
  const [sortOption, setSortOption] = useState<string>("default");

  const {
    data: allproducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allproducts"],
    queryFn: fetchAllProducts,
    staleTime: 60000,
  });

  if (isLoading) return <ProductCardSkeleton />;
  if (error) return <div>An error occurred: {error.message}</div>;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const sortedProducts = [...(allproducts || [])].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;

    return 0;
  });

  return (
    <section className="mx-72 mb-28 gap-40 max-2xl:mx-6 max-2xl:gap-28">
      <div className="flex w-full">
        <p>Sort By:</p>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="rounded-md border outline-none"
        >
          <option value="default">
            <ChevronDown className="mr-2 h-4 w-4" />
            Default
          </option>
          <option value="price-asc">
            <ArrowUpAZ className="mr-2 h-4 w-4" />
            Price: Low to High
          </option>
          <option value="price-desc">
            <ArrowDownAZ className="mr-2 h-4 w-4" />
            Price: High to Low
          </option>
        </select>
      </div>
      <div className="product-card-container grid w-full grid-cols-2 gap-4 overflow-hidden md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product: ProductType) => (
          <ProductCard key={product.id} {...product} image={product.image} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
