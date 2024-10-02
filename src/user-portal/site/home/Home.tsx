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
import { Spotlight } from "../../../common/components";

const Home = () => {
  return (
    <div className="relative mx-72 flex flex-col gap-16 overflow-x-hidden max-2xl:mx-6 max-2xl:gap-20">
      <Hero />
      <SalesCard />
      <Category />
      <Spotlight />
      <BestProducts />
      <LimitedEditionCTA />
      <GeneralProducts />
      <ArrivalProductsGrid />
      <ServiceDetails />
    </div>
  );
};

export { Home };
