import { useQuery } from "react-query";
import { PagesHeader, ProductCard, Button } from "../../components";
import { fetchProducts } from "../../api/fetch";

interface SalesCardProps {
  title: string;
  price: number;
  rating: { count: number };
  image: string;
  discountTag?: boolean;
}

const SalesCard = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery(["products"], fetchProducts, {
    select: (products) => products.slice(0, 4),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  console.log(products, "all-products");

  return (
    <section className="sales-card-container flex flex-col gap-5 md:gap-7 border-b border-foreground/30 pb-8 md:pb-14 ">
      <PagesHeader
        subHeading="Today's Sales"
        Heading="Flash Sales"
        flashTimer
      />
      <div className="product-card-container flex w-full items-center justify-between overflow-hidden gap-4">
        {products.map((productCard: SalesCardProps, index: number) => (
          <ProductCard key={index} {...productCard} discountTag />
        ))}
      </div>
      <Button className="mx-auto w-full md:w-fit">View All Products</Button>
    </section>
  );
};

export default SalesCard;
