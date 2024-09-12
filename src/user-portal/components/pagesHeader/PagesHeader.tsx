import NavigationArrows from "../navigationalArrows/NavigationalArrows";
import { Link } from "react-router-dom";
import CountdownTimer from "../flashSaleTimer/counttimer";
import { Button } from "../../../common/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchSalesProduct } from "../../../common/api/productApi";

interface PagesHeaderProps {
  flashTimer?: boolean;
  subHeading: string;
  Heading: string;
  cta?: string;
}

const PagesHeader = ({
  flashTimer,
  subHeading,
  Heading,
  cta,
}: PagesHeaderProps) => {
  const { data: salesData } = useQuery({
    queryKey: ["sale"],
    queryFn: fetchSalesProduct,
  });

  const dateConversion = new Date(salesData && salesData[0]?.saleEnd);

  const CUSTOM_DAYS_IN_MS = dateConversion.getTime();

  const dateTimeAfterThreeDays = new Date(CUSTOM_DAYS_IN_MS);
  return (
    <div className="page-header-container flex flex-col gap-3">
      <div className="flex items-center gap-3 text-primary">
        <div className="h-10 w-5 rounded-sm bg-primary max-2xl:h-8 max-2xl:w-4"></div>
        <h1 className="text-xs font-medium capitalize md:text-base">
          {subHeading}
        </h1>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-20">
          <h2 className="text-lg font-medium capitalize tracking-wide text-foreground lg:text-4xl">
            {Heading}
          </h2>
          {flashTimer && <CountdownTimer targetDate={dateTimeAfterThreeDays} />}
        </div>
        {!cta ? (
          <div className="page-navigations flex items-center gap-2">
            <NavigationArrows direction="prev" />
            <NavigationArrows />
          </div>
        ) : (
          <Link to={`${cta}`} className="max-w-20 text-xs md:text-sm">
            <Button className="px-4 md:p-4">View All</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PagesHeader;
