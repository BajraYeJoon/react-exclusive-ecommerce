import PagesHeader from "../../components/PagesHeader/PagesHeader";
import ProductCard from "../../components/ProductCard/ProductCard";

const generalProducts = [
  {
    title: "The North Coat",
    price: 360,
    discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-coat.png",
  },
  {
    title: "Gucci duffle bag",
    price: 360,
    discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-bag.png",
  },
  {
    title: "RGB liquid CPU Cooler",
    price: 360,
    discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-fan.png",
  },
  {
    title: "The North Coat",
    price: 360,
    discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-shelf.png",
  },
];

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
