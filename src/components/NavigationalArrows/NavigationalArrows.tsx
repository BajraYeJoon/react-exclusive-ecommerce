import { cn } from "../../lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "../../pages/SalesCard/styles.css";

interface NavigationArrowsProps {
  direction: "prev" | "next";
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
}

const NavigationArrows = ({
  direction,
  onClick,
  disabled,
}: NavigationArrowsProps) => {
  return (
    <div
      className={cn(
        "group flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-card hover:bg-primary md:h-10 md:w-10",
        {
          "cursor-not-allowed opacity-50": disabled,
        },
      )}
      onClick={onClick}
    >
      {direction === "prev" ? (
        <ArrowLeft
          className={cn("arrow-left h-4 group-hover:text-white md:h-6", {
            "text-gray-400": disabled,
          })}
        />
      ) : (
        <ArrowRight
          className={cn("arrow-right h-4 group-hover:text-white md:h-6", {
            "text-gray-400": disabled,
          })}
        />
      )}
    </div>
  );
};

export default NavigationArrows;
