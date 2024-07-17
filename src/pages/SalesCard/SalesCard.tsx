import { PagesHeader, ProductCard, Button } from "../../components";
import { productCardsContent } from "../../constants/data";

const SalesCard = () => {
  return (
    <section className="sales-card-container flex flex-col gap-5 md:gap-7 border-b border-foreground/30 pb-8 md:pb-14 ">
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

      <Button className="mx-auto w-full md:w-fit">View All Products</Button>
    </section>
  );
};

export default SalesCard;
