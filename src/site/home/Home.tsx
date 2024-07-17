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
    <div className="flex flex-col gap-20 lg:gap-32 md:gap-28 mb-12 lg:mb-28 lg:mx-72 mx-6">
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
