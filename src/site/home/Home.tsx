import { Hero, SalesCard } from "../../pages";
import Category from "../../pages/Category/Category";
import BestProducts from "../../pages/BestProducts/BestProducts";

const Home = () => {
  return (
    <div className="flex flex-col gap-40 max-3xl:gap-32 max-2xl:gap-28 mb-28 mx-72 max-3xl:mx-24 max-2xl:mx-14 ">
      <Hero />
      <SalesCard />
      <Category />
      <BestProducts />
    </div>
  );
};

export default Home;
