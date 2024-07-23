import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProductByCategory } from "../../api/fetch";
import ProductCard from "../ProductCard/ProductCard";
const FetchSingleCategory = () => {
  const { categoryName } = useParams();

  const {
    data: category,
    isLoading,
    error,
  } = useQuery("category", () => fetchProductByCategory(categoryName ?? ""), {
    staleTime: 50000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  console.log("cateogry name", category);

  return (
    <section className="mx-72 mb-28 gap-40 max-2xl:mx-6 max-2xl:gap-28">
      <div className="product-card-container flex w-full flex-wrap items-center justify-between gap-4 overflow-hidden">
        {category.products.map((category: any) => (
          <ProductCard
            key={category.id}
            {...category}
            images={category.images[0]}
          />
        ))}
      </div>
    </section>
  );
};

export default FetchSingleCategory;
