import { useEffect, useState } from "react";
import { fetchNewArrivals } from "../../api/fetch";
import { Button, PagesHeader } from "../../components";
import { NewArrivalsProductProps } from "./ArrivalsPage";

type GridItemProps = {
  product: NewArrivalsProductProps;
  index: number;
  additionalClasses: string;
};

const ArrivalProductsGrid = () => {
  const [products, setProducts] = useState<NewArrivalsProductProps[]>([]);

  const additionalClasses = [
    "col-span-2 md:row-span-2 lg:bg-auto",
    "col-span-2 bg-right shadow-[inset_-100px_0_100px_10px_rgba(255,255,255,0.2)] lg:bg-contain",
    "relative bg-center p-10 lg:bg-auto",
    "relative bg-center p-14 md:p-10 lg:bg-auto ",
  ];

  useEffect(() => {
    (async () => {
      const data = await fetchNewArrivals();
      setProducts(data.slice(0, 4));
    })();
  }, []);

  return (
    <section className="arrival-products-container flex flex-col gap-10 lg:gap-20">
      <PagesHeader
        subHeading="Featured"
        Heading="New Arrivals"
        cta="/new-arrivals"
      />

      <div className="grid h-[500px] grid-cols-2 grid-rows-2 gap-4 md:h-[400px] md:grid-cols-4 lg:h-[600px]">
        {products.map((product, index) => (
          <GridItem
            key={product.id}
            product={product}
            index={index}
            additionalClasses={additionalClasses[index] || ""}
          />
        ))}
      </div>
    </section>
  );
};

const GridItem = ({ product, additionalClasses }: GridItemProps) => (
  <div
    key={product.id}
    className={`flex items-end rounded-sm bg-foreground bg-[url(${product.image[0]})] bg-contain bg-bottom bg-no-repeat p-4 md:p-6 lg:p-10 ${additionalClasses}`}
  >
    <div className="space-y-2 md:space-y-4">
      <div className="space-y-2 text-background">
        <h3 className="text-sm md:text-base lg:text-xl">{product.title}</h3>
        <p className="text-[10px] tracking-wide text-background/60 md:text-[12px] lg:text-sm">
          {product.description}
        </p>
        <ShopNowButton />
      </div>
    </div>
  </div>
);
const ShopNowButton = () => (
  <Button variant={"ghost"} size={"ghostsize"}>
    Shop Now
  </Button>
);

export default ArrivalProductsGrid;
