import { cn } from "../../lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
        "group flex h-10 w-10 items-center justify-center rounded-full bg-card hover:bg-primary cursor-pointer",
        {
          "cursor-not-allowed opacity-50": disabled,
        }
      )}
      onClick={onClick}
    >
      {direction === "prev" ? (
        <ArrowLeft
          className={cn("group-hover:text-white", {
            "text-gray-400": disabled,
          })}
        />
      ) : (
        <ArrowRight
          className={cn("group-hover:text-white", {
            "text-gray-400": disabled,
          })}
        />
      )}
    </div>
  );
};

export default NavigationArrows;
