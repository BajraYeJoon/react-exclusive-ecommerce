import { Truck } from "lucide-react";
import { Badge } from "../../ui/badge";

export default function SpotlightHalloween() {
  return (
    <>
      <div className="bg-blend relative flex flex-col items-center justify-center gap-2 bg-[url('https://res.cloudinary.com/dw55twddi/image/upload/v1727779309/exclusive/public/spotlight/halloween_ynfmgu.avif')] bg-cover bg-center bg-no-repeat text-white">
        <p className="font-creepster max-w-24 text-center text-[10px] sm:max-w-fit sm:text-sm md:text-base">
          Irresistible products & Discounts
        </p>
        <h3 className="font-creepster max-w-24 text-center text-xl text-green-500 sm:max-w-52 sm:text-3xl md:text-5xl">
          Halloween Deals
        </h3>
        <div className="absolute bottom-2">
          <Badge className="bg-gray-700 text-green-200">
            <Truck size={16} className="mr-2" />
            Quick shipping
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center justify-center gap-5 p-4 text-white">
        <div className="flex flex-col items-center justify-center font-bold tracking-wider">
          <h4 className="text-[10px] sm:text-base md:text-xl">Starting at</h4>
          <p className="text-base sm:text-xl md:text-4xl">$1.99</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-[8px] sm:text-[9px] md:text-xs">
          <p className="font-medium">Shop Now Pay later with</p>
          <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs">
            esewa
          </span>
          <span className="hidden text-center text-[8px] font-light sm:block">
            * Terms and conditions apply.
          </span>
        </div>
      </div>
    </>
  );
}
