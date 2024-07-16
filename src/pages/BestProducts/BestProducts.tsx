import PagesHeader from "../../components/PagesHeader/PagesHeader";
import ProductCard from "../../components/ProductCard/ProductCard";

const bestSellingProducts = [
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

const BestProducts = () => {
  return (
    <section className="flex flex-col gap-20 max-2xl:gap-10">
      <PagesHeader
        subHeading="This Month"
        Heading="Best Selling Products"
        cta
      />
      <div className="product-card-container flex w-full items-center justify-between overflow-x-auto gap-4">
        {bestSellingProducts.map((bestProductCard, index) => (
          <ProductCard key={index} {...bestProductCard} />
        ))}
      </div>
    </section>
  );
};

export default BestProducts;
