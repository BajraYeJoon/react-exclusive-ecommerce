import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProductByCategory } from "../../api/categoryApi";
import ProductCard from "../ProductCard/ProductCard";
import { Loading } from "../../site";
const FetchSingleCategory = () => {
  const { categoryId } = useParams();

  const {
    data: category,
    isLoading,
    error,
  } = useQuery("category", () =>
    fetchProductByCategory(parseInt(categoryId ?? "20")),
  );

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  console.log(category.data.products);
  const productsByCategory = category?.data?.products;

  return (
    <section className="mx-72 mb-28 gap-40 max-2xl:mx-6 max-2xl:gap-28">
      <div className="product-card-container grid w-full grid-cols-2 items-center justify-between gap-4 overflow-hidden md:grid-cols-3 lg:grid-cols-4">
        {productsByCategory.map((category: any) => (
          <ProductCard
            key={category.id}
            {...category}
            images={category.image[0]}
          />
        ))}
      </div>
    </section>
  );
};

export default FetchSingleCategory;
