const HalloweenMain = () => {
  return (
    <section className="halloween-bg">
      <div className="relative flex h-screen flex-col gap-4 py-4">
        <div className="halloween-collections-container grid h-[150px] w-full grid-cols-[2fr_0.8fr] gap-4 *:rounded-lg md:h-[300px] lg:h-[600px]">
          <div className="relative w-full overflow-hidden bg-[url('/halloween/hall.webp')] bg-cover bg-top bg-no-repeat"></div>
          <div className="relative w-full overflow-hidden bg-[url('/halloween/hall-2.webp')] bg-cover bg-top bg-no-repeat">
            <div className="absolute left-16 top-16 flex flex-col items-center justify-center gap-3">
              <p className="font-creepster text-2xl">Halloween</p>
              <span className="font-creepster text-8xl font-extrabold">
                SALE
              </span>
              <span className="font-creepster font-extrabold uppercase tracking-wider">
                Upto 60% off
              </span>
            </div>
          </div>
        </div>
        <div>2222</div>
      </div>
    </section>
  );
};

export default HalloweenMain;
