import PagesHeader from "../../components/PagesHeader/PagesHeader";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Button } from "../../components/ui/button";

const productCardsContent = [
  {
    title: "HAVIT HV-G92 Gamepad",
    price: 160,
    discountPrice: 120,
    rating: 88,
    image: "/products-img/product-headphone.png",
  },
  {
    title: "AK-900 Wired Keyboard",
    price: 1160,
    discountPrice: 960,
    rating: 75,
    image: "/products-img/product-gaming-keyboard.png",
  },
  {
    title: "IPS LCD Gaming Monitor",
    price: 400,
    discountPrice: 370,
    rating: 99,
    image: "/products-img/product-gaming-monitor.png",
  },
  {
    title: "S-Series Comfort Chair ",
    price: 400,
    discountPrice: 375,
    rating: 98,
    image: "/products-img/product-chair.png",
  },
];

const SalesCard = () => {
  return (
    <section className="flex flex-col gap-7 border-b border-foreground/30 pb-14 max-2xl:pb-10">
      <PagesHeader />
      <div className="flex w-full items-center justify-center overflow-x-auto gap-4">
        {productCardsContent.map((productCard, index) => (
          <ProductCard key={index} {...productCard} />
        ))}
      </div>

      <Button className="mx-auto">View All Products</Button>
    </section>
  );
};

export default SalesCard;
