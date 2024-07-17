import { PagesHeader, ProductCard } from "../../components";

import { generalProducts } from "../../constants/data";

const GeneralProducts = () => {
  return (
    <section className="general-products-container flex flex-col lg:gap-20 gap-10">
      <PagesHeader subHeading="Our Products" Heading="Explore Our Products" />

      <div className="general-product-card-container flex w-full items-center justify-between overflow-x-auto gap-4">
        {generalProducts.map((gproduct, index) => (
          <ProductCard key={index} {...gproduct} />
        ))}
      </div>
    </section>
  );
};

export default GeneralProducts;
