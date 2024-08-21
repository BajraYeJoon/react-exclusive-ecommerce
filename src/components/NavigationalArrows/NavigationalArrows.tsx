import { cn } from "../../lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "../../pages/SalesCard/styles.css";

interface NavigationArrowsProps {
  direction?: "prev" | "next";
}

const NavigationArrows = ({ direction }: NavigationArrowsProps) => {
  return (
    <div
      className={cn(
        "group flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-card hover:bg-primary md:h-10 md:w-10",
      )}
    >
      {direction === "prev" ? (
        <ArrowLeft
          className={cn("arrow-left h-4 group-hover:text-white md:h-6", {})}
        />
      ) : (
        <ArrowRight
          className={cn("arrow-right h-4 group-hover:text-white md:h-6", {})}
        />
      )}
    </div>
  );
};

export default NavigationArrows;
