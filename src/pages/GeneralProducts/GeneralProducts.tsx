import { PagesHeader, Button, ProductCard } from "../../components";
import { generalProducts } from "../../constants/data";

const GeneralProducts = () => {
  return (
    <section className="general-products-container flex flex-col gap-10 lg:gap-20">
      <PagesHeader subHeading="Our Products" Heading="Explore Our Products" />

      <div className="general-product-card-container flex w-full items-center justify-between gap-4 overflow-x-auto">
        {generalProducts.map((gproduct, index) => (
          <ProductCard
            key={index}
            {...gproduct}
            rating={{ count: gproduct.rating }}
          />
        ))}
      </div>

      <Button className="mx-auto w-full md:w-fit">View All Products</Button>
    </section>
  );
};

export default GeneralProducts;
