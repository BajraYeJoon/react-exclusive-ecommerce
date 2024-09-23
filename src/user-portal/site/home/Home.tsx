import { DiscountCard } from "../../../common/components";
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
    <div className="-z-50 mx-72 flex flex-col gap-28 overflow-x-hidden max-2xl:mx-6 max-2xl:gap-24">
      <Hero />
      <DiscountCard />
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
