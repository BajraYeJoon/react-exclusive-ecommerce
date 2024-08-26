import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../api/productApi";
import ProductCard from "../ProductCard/ProductCard";

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
  } = useQuery(["allproducts"], fetchAllProducts, {
    staleTime: 60000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  const products = allproducts;
  console.log(products);
  // const images = allproducts.images;

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
