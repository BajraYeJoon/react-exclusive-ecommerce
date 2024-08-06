import { serviceDetailsInfo } from "../../constants/data";
const ServiceDetails = () => {
  return (
    <section className="flex flex-col gap-12 md:flex-row items-center justify-evenly">
      {serviceDetailsInfo.map((serviceDetail) => {
        const ServiceIcon = serviceDetail.icon;

        return (
          <article
            key={serviceDetail.id}
            className="service-details text-color-text-3 flex flex-col items-center justify-center gap-5 text-center"
          >
            <div className="flex items-center justify-center rounded-full border-[14px] border-background/80 bg-foreground md:h-16 md:w-16 lg:h-24 lg:w-24">
              <ServiceIcon className="h-10 w-10 text-background" />
            </div>
            <div className="space-y-1">
              <h4 className="uppecase text-[20px] font-bold uppercase tracking-wide">
                {serviceDetail.title}
              </h4>
              <p className="text-base font-medium">
                {serviceDetail.description}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ServiceDetails;
