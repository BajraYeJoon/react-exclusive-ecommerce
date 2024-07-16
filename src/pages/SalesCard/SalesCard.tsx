import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import React from "react";

const SalesCard = () => {
  return (
    <section className="flex flex-col gap-7 border-b border-color-divider pb-14 max-2xl:pb-10">
      <div className="flex items-center gap-3 text-red-400">
        <div className="h-10 w-5 bg-red-400 rounded-sm max-2xl:h-8 max-2xl:w-4"></div>
        <h1 className="text-lg capitalize max-2xl:text-base ">Today's Sale</h1>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-20">
          <h2 className="text-[40px] text-color-text-3 capitalize max-2xl:text-3xl ">
            Flash Sale
          </h2>
          <div className="flex items-center gap-3 text-color-text-3 mb-3"></div>
        </div>
        <div className="flex items-center gap-2">
          <ArrowLeftCircleIcon size={24} />
          <ArrowRightCircleIcon size={24} />
        </div>
      </div>
      <div></div>
      <div></div>
    </section>
  );
};

export default SalesCard;
