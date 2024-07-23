import PagesHeader from "../../components/PagesHeader/PagesHeader";
import ProductCard from "../../components/ProductCard/ProductCard";
import { bestSellingProducts } from "../../constants/data";

const BestProducts = () => {
  return (
    <section className="flex flex-col gap-20 max-2xl:gap-10">
      <PagesHeader
        subHeading="This Month"
        Heading="Best Selling Products"
        cta
      />
      <div className="product-card-container flex w-full items-center justify-between gap-4 overflow-x-auto">
        {bestSellingProducts.map((bestProductCard, index) => (
          <ProductCard key={index} {...bestProductCard} />
        ))}
      </div>
    </section>
  );
};

export default BestProducts;
