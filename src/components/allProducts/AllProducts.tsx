import { useQuery } from "react-query";
import { fetchAllProducts } from "../../api/fetch";
import ProductCard from "../ProductCard/ProductCard";

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

  console.log(allproducts.products);

  const products = allproducts.products;
  const images = allproducts.images;
  console.log(images, "asdfasdfsafa");

  return (
    <section className="mx-72 mb-28 gap-40 max-2xl:mx-6 max-2xl:gap-28">
      <div className="product-card-container flex w-full flex-wrap items-center justify-between gap-4 overflow-hidden">
        {products.map((allproducts) => (
          <ProductCard
            key={allproducts.id}
            {...allproducts}
            images={allproducts.images[0]}
          />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
