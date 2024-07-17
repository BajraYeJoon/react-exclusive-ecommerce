import { PagesHeader, ProductCard, Button } from "../../components";
import { productCardsContent } from "../../constants/data";

const SalesCard = () => {
  return (
    <section className="sales-card-container flex flex-col gap-7 border-b border-foreground/30 pb-14 max-2xl:pb-10">
      <PagesHeader
        subHeading="Today's Sales"
        Heading="Flash Sales"
        flashTimer
      />
      <div className="product-card-container flex w-full items-center justify-between overflow-x-auto gap-4">
        {productCardsContent.map((productCard, index) => (
          <ProductCard key={index} {...productCard} discountTag />
        ))}
      </div>

      <Button className="mx-auto">View All Products</Button>
    </section>
  );
};

export default SalesCard;
