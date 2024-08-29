import {
  Hero,
  SalesCard,
  Category,
  BestProducts,
  ArrivalProductsGrid,
  LimitedEditionCTA,
  GeneralProducts,
  ServiceDetails,
} from "../../pages";

const Home = () => {
  return (
    <div className="mx-72 mb-28 flex flex-col gap-40 max-2xl:mx-6 max-2xl:gap-28">
      <Hero />
      <SalesCard />
      <Category />
      <BestProducts />
      <LimitedEditionCTA />
      <GeneralProducts />
      <ArrivalProductsGrid />
      <ServiceDetails />
    </div>
  );
};

export { Home };
