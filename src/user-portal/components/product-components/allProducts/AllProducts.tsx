import { useQuery } from "@tanstack/react-query";
import ProductCard from "../productCard/ProductCard";
import { fetchAllProducts } from "../../../../common/api/productApi";
import ProductCardSkeleton from "../../../../common/components/productCardSkeleton/ProductCardSkeleton";
interface ProductType {
  id: number;
  title: string;
  price: number;
  rating: number;
  image: string;
}

const AllProducts = () => {
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

  const products = allproducts;

  return (
    <section className="mx-72 mb-28 gap-40 max-2xl:mx-6 max-2xl:gap-28">
      <div className="product-card-container flex w-full flex-wrap items-center justify-between gap-4 overflow-hidden">
        {products.map((allproducts: ProductType) => (
          <ProductCard
            key={allproducts.id}
            {...allproducts}
            image={allproducts.image}
          />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
