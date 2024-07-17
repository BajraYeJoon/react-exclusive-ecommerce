import { serviceDetailsInfo } from "../../constants/data";
const ServiceDetails = () => {
  return (
    <section className="flex items-center justify-evenly">
      {serviceDetailsInfo.map((serviceDetail) => {
        const ServiceIcon = serviceDetail.icon;

        return (
          <article
            key={serviceDetail.id}
            className="flex flex-col justify-center items-center text-color-text-3 text-center gap-5"
          >
            <div className="flex items-center justify-center bg-foreground rounded-full border-[14px] border-background/80 md:w-16 md:h-16 lg:h-24 lg:w-24">
              <ServiceIcon className="h-10 w-10 text-background" />
            </div>
            <div className="space-y-1">
              <h4 className=" uppercase text-[20px] font-bold uppecase tracking-wide">
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
