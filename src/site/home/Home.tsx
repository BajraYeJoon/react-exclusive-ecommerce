import {
  Hero,
  SalesCard,
  Category,
  BestProducts,
  ArrivalProductsGrid,
  LimitedEditionCTA,
  GeneralProducts,
} from "../../pages";

const Home = () => {
  return (
    <div className="flex flex-col gap-40 max-3xl:gap-32 max-2xl:gap-28 mb-28 mx-72 max-3xl:mx-24 max-2xl:mx-14 ">
      <Hero />
      <SalesCard />
      <Category />
      <BestProducts />
      <LimitedEditionCTA />
      <GeneralProducts />
      <ArrivalProductsGrid />
    </div>
  );
};

export { Home };
