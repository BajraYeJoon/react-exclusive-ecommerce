import FlashSaleTimer from "../FlashSaleTimer/FlashSaleTimer";
import NavigationArrows from "../NavigationalArrows/NavigationalArrows";

interface PagesHeaderProps {
  flashTimer?: boolean;
  subHeading: string;
  Heading: string;
}

const PagesHeader = ({ flashTimer, subHeading, Heading }: PagesHeaderProps) => {
  return (
    <div className="page-header-container flex flex-col gap-3">
      <div className="flex items-center gap-3 text-primary">
        <div className="h-10 w-5 bg-primary rounded-sm max-2xl:h-8 max-2xl:w-4"></div>
        <h1 className="text-sm capitalize md:text-base font-medium ">
          {subHeading}
        </h1>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-20">
          <h2 className="text-4xl font-medium tracking-wide text-foreground capitalize max-2xl:text-3xl ">
            {Heading}
          </h2>
          {flashTimer && <FlashSaleTimer />}
          <div className="flex items-center gap-3 text-color-text-3 mb-3"></div>
        </div>
        <div className="page-navigations flex items-center gap-2">
          <NavigationArrows direction="prev" onClick={() => {}} />
          <NavigationArrows direction="next" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default PagesHeader;
