import { fetchNewArrivals } from "../../api/productApi";
import { ProductCard } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../site";

export interface NewArrivalsProductProps {
  id: number;
  title: string;
  description: string;
  image: string[];
  price: number;
}

const ArrivalsPage = () => {
  // const [newArrivals, setNewArrivals] = useState<NewArrivalsProductProps[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const newarrivalsData = await fetchNewArrivals();
  //     setNewArrivals(newarrivalsData);
  //   })();
  // }, []);

  const { data: newArrivals, isLoading } = useQuery(
    "newarrivals",
    fetchNewArrivals,
  );

  if (isLoading) {
    return <Loading />;
  }

  console.log(newArrivals);

  return (
    <section className="mx-72 mt-10 gap-40 max-2xl:mx-6 max-2xl:gap-28 md:mt-16">
      <div className="product-card-container flex w-full flex-wrap items-center justify-center gap-4 overflow-hidden lg:justify-evenly">
        {!newArrivals ? (
          <div>No products Found</div>
        ) : (
          <>
            {newArrivals.map((allproducts: NewArrivalsProductProps) => (
              <ProductCard
                key={allproducts.id}
                {...allproducts}
                image={allproducts.image[0]}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default ArrivalsPage;
