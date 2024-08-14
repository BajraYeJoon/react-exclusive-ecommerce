import { useEffect, useState } from "react";
import { fetchNewArrivals } from "../../api/fetch";
import { ProductCard } from "../../components";

export interface NewArrivalsProductProps {
  id: number;
  title: string;
  description: string;
  image: string[];
  price: number;
}

const ArrivalsPage = () => {
  const [newArrivals, setNewArrivals] = useState<NewArrivalsProductProps[]>([]);

  useEffect(() => {
    (async () => {
      const newarrivalsData = await fetchNewArrivals();
      setNewArrivals(newarrivalsData);
    })();
  }, []);

  console.log(newArrivals);

  return (
    <section className="mx-72 mb-28 gap-40 max-2xl:mx-6 max-2xl:gap-28">
      <div className="product-card-container flex w-full flex-wrap items-center justify-between gap-4 overflow-hidden">
        {newArrivals.map((allproducts: NewArrivalsProductProps) => (
          <ProductCard
            key={allproducts.id}
            {...allproducts}
            image={allproducts.image[0]}
          />
        ))}
      </div>
    </section>
  );
};

export default ArrivalsPage;
