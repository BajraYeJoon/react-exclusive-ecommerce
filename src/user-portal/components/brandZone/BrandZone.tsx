import { BadgeCheck, ThumbsUp } from "lucide-react";
import { BiMoneyWithdraw } from "react-icons/bi";

const BrandZone = () => {
  return (
    <section className="relative mx-72 flex flex-col gap-16 py-4 max-2xl:mx-6">
      {/* Banner */}

      <div className="brand-zone-container grid h-[500px] grid-cols-2 grid-rows-4 gap-4 *:w-full *:rounded-lg">
        <div className="col-span-2 flex items-center justify-between bg-black px-6">
          <div className="flex items-center justify-start gap-2 text-4xl font-extrabold text-[#FBA97D]">
            <BadgeCheck size={40} />
            <h1>Brand Zone</h1>
            <span
              className="rounded-lg px-4 py-2 text-2xl font-medium text-foreground"
              style={{
                background:
                  "linear-gradient(90deg, rgba(251,169,125,0.6) 0%, rgba(251,169,125,0.7) 100%)",
              }}
            >
              2K+ Brands
            </span>
          </div>

          <div className="text-medium flex items-center justify-center gap-2 font-light text-white">
            <span className="flex items-center justify-center gap-2 border-r border-r-white pr-2">
              <ThumbsUp size={20} /> 100% Authentic
            </span>
            <span className="flex items-center justify-center gap-2">
              <BiMoneyWithdraw size={20} /> Exclusive Price
            </span>
          </div>
        </div>
        <div className="row-span-3 flex flex-col items-start justify-center bg-[url('/brand/bbanner1.png')] bg-cover bg-center bg-no-repeat pl-6 text-background">
          <h3 className="text-4xl font-extrabold">Global Disocunts</h3>
          <h4 className="text-2xl">Get upto 50% off</h4>
        </div>
        <div className="row-span-3 flex flex-col items-start justify-center gap-3 bg-[url('/brand/bbanner2.png')] bg-cover bg-center bg-no-repeat pl-6 text-background">
          <h4 className="font-serif text-3xl">Tarte</h4>
          <h3 className="text-4xl font-extrabold">Natural Cosmetics</h3>
          <p className="text-3xl">Exclusive Offers</p>
        </div>
      </div>
    </section>
  );
};

export default BrandZone;
