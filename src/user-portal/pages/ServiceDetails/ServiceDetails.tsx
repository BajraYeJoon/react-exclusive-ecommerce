import { useQuery } from "@tanstack/react-query";
// import { serviceDetailsInfo } from "../../constants/data";
import { fetchServices } from "../../../common/api/cms/services";
import { ServiceLoader } from "../../../common/components/cmsLoader";

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const ServiceDetails = () => {
  const { data: serviceData, isLoading } = useQuery({
    queryKey: ["serviceDetails"],
    queryFn: fetchServices,
  });

  const serviceDetailsInfo = serviceData?.data || [];

  if (isLoading) return <ServiceLoader />;

  return (
    <section className="grid grid-cols-1 place-items-center justify-evenly gap-12 sm:grid-cols-2 md:grid-cols-3 md:flex-row">
      {serviceDetailsInfo.map((serviceDetail: ServiceDetail) => {
        return (
          <article
            key={serviceDetail.id}
            className="service-details flex max-w-sm flex-col items-center justify-center gap-5 text-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-[14px] border-background/80 bg-foreground md:h-16 md:w-16 lg:h-24 lg:w-24">
              <img
                src={serviceDetail.icon}
                alt="Services provided by us"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="uppecase text-base font-bold uppercase tracking-wide md:text-[20px]">
                {serviceDetail.title}
              </h4>
              <p className="text-sm font-light md:text-base">
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
