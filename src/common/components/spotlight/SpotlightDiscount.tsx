export default function SpotlightDiscount() {
  return (
    <>
      <div className="bg-blend flex flex-col items-center justify-center gap-2 bg-[url('/spotlight/discount.avif')] bg-cover bg-bottom bg-no-repeat text-white">
        <span className="font-merienda text-2xl">Discount Aisle</span>
        <div className="items-center text-center font-extrabold uppercase">
          <span className="text-base">Buy 3 get </span>
          <div className="flex items-center justify-center gap-2 text-yellow-300">
            <h4 className="text-8xl">25 </h4>
            <div className="flex flex-col items-center justify-center font-extrabold">
              <span className="text-4xl">%</span>
              <span className="text-xl">off</span>
            </div>
          </div>
          <p className="font-extrabold">
            Buy 2 <span className="text-yellow-300">get 15% off</span>
          </p>
          <p className="font-extrabold">
            Buy 1 <span className="text-yellow-300">get 10% off</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center text-xl font-medium tracking-wider text-white hover:underline">
        View All Discounts
      </div>
    </>
  );
}
