import { useQuery } from "@tanstack/react-query";
// import { serviceDetailsInfo } from "../../constants/data";
import { fetchServices } from "../../../common/api/cms/services";
const ServiceDetails = () => {
  const { data: serviceData, isLoading } = useQuery({
    queryKey: ["serviceDetails"],
    queryFn: fetchServices,
  });

  const serviceDetailsInfo = serviceData?.data || [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="grid grid-cols-1 place-items-center justify-evenly gap-12 sm:grid-cols-2 md:grid-cols-3 md:flex-row">
      {serviceDetailsInfo.map((serviceDetail) => {
        // const ServiceIcon = serviceDetail.icon;

        return (
          <article
            key={serviceDetail.id}
            className="service-details flex max-w-sm flex-col items-center justify-center gap-5 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-[14px] border-background/80 bg-foreground md:h-16 md:w-16 lg:h-24 lg:w-24">
              {/* <ServiceIcon className="h-10 w-10 text-background" /> */}
              <img src={serviceDetail.icon} alt="" />
            </div>
            <div className="space-y-1">
              <h4 className="uppecase text-sm font-bold uppercase tracking-wide md:text-[20px]">
                {serviceDetail.title}
              </h4>
              <p className="text-xs font-light md:text-base">
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
