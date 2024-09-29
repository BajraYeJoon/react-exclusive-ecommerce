import { CustomBreakcrumb } from "../../../user-portal/components";

const HomeCollections = () => {
  return (
    <section className="mx-72 my-6 flex flex-col gap-4 max-2xl:mx-6">
      <CustomBreakcrumb breadcrumbTitle="Collections" />

      <div className="home-collections-container flex flex-col items-center justify-center gap-2">
        {/* Top Banner */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-[url('/spotlight/spotlight-banner.jpg')] bg-cover bg-top bg-no-repeat">
          {/* <img
            src="/spotlight/spotlight-banner.jpg"
            alt="Spotlight Banner"
            className="aspect-square h-full w-full object-cover object-left-top"
          /> */}
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-gray-700 to-transparent opacity-55"></div>

          <h1 className="absolute bottom-4 left-0 right-0 text-left text-3xl font-bold leading-10 tracking-wider text-white sm:text-4xl md:text-center md:text-7xl lg:text-6xl">
            Get Access to the Best
            <br className="hidden sm:block" /> Exclusive Collections
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HomeCollections;
