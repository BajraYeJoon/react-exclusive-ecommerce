import { Swiper, SwiperSlide } from "swiper/react";
import { CustomBreakcrumb } from "../../components";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { ServiceDetails } from "../../pages";
import { useQueries } from "@tanstack/react-query";
import { fetchAbout } from "../../../common/api/cms/about";
import { fetchStats } from "../../../common/api/cms/stats";
import { fetchEmployees } from "../../../common/api/cms/employee";
import { Link } from "react-router-dom";
import {
  EmployeeLoader,
  StatsLoader,
  StoryLoader,
} from "../../../common/components/cmsLoader";

interface EmployeeProps {
  id: number | string;
  name: string;
  position: string;
  image: string;
  twitter?: string;
  linkedin?: string;
}

const About = () => {
  const results = useQueries({
    queries: [
      { queryKey: ["story"], queryFn: fetchAbout },
      { queryKey: ["stats"], queryFn: fetchStats },
      { queryKey: ["employees"], queryFn: fetchEmployees },
    ],
  });

  const storyData = results[0].data;
  const statsData = results[1].data;
  const employeeData = results[2].data;

  const story = storyData?.data || [];
  const stats = statsData?.data || [];
  const employees = employeeData?.data || [];

  const isLoadingStory = results[0].isLoading;
  const isLoadingStats = results[1].isLoading;
  const isLoadingEmployees = results[2].isLoading;

  return (
    <section className="relative mx-8 my-6 h-fit md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <CustomBreakcrumb breadcrumbTitle="About" />

      <div className="space-y-32">
        {isLoadingStory ? (
          <StoryLoader />
        ) : (
          <div className="flex items-center justify-between gap-16">
            <div className="flex flex-col gap-8 text-ellipsis">
              <h1 className="text-6xl capitalize max-2xl:text-4xl">
                {story?.title}
              </h1>
              <p className="text-lg max-2xl:text-base">{story?.body}</p>
            </div>
            <img
              alt="girls"
              width="700"
              height="700"
              decoding="async"
              src={story?.image}
              className="max-3xl:w-[600px] w-[600px] object-contain max-2xl:w-[500px]"
            />
          </div>
        )}

        {isLoadingStats ? (
          <StatsLoader />
        ) : (
          <div className="flex justify-center gap-12">
            {stats?.map(({ description, value, id }: any) => (
              <div
                className="3 group flex flex-col items-center gap-9 rounded-md border border-foreground/25 px-9 py-5 hover:bg-primary lg:px-12"
                key={id}
              >
                <div className="space-y-3 text-center">
                  <p className="group-hover:text-color-text-1 max-3xl:text-3xl text-4xl transition-colors duration-300 ease-in-out max-2xl:text-xl">
                    {value}
                  </p>
                  <p className="group-hover:text-color-text-1 text-lg transition-colors duration-300 ease-in-out max-2xl:text-base">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {isLoadingEmployees ? (
          <EmployeeLoader />
        ) : (
          <Swiper
            className="mySwiper flex h-full items-center justify-center"
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={3}
            pagination={{
              clickable: true,
            }}
          >
            {employees.map((employee: EmployeeProps) => (
              <SwiperSlide
                key={employee.id}
                className="flex items-center justify-center"
              >
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-start gap-5">
                    <div className="bg-color-secondary">
                      <img
                        alt={employee.name}
                        loading="lazy"
                        width="200"
                        height="200"
                        decoding="async"
                        data-nimg="1"
                        className="max-3xl:h-64 max-3xl:mx-10 mx-14 mt-5 h-80 object-contain object-bottom max-2xl:mx-8 max-2xl:h-48"
                        src={employee.image}
                      />
                    </div>
                    <div className="max-3xl:gap-2 flex flex-col items-start gap-4">
                      <div className="max-3xl:gap-1 flex flex-col items-start gap-2 capitalize">
                        <p className="max-3xl:text-3xl text-4xl max-2xl:text-2xl">
                          {employee.name}
                        </p>
                        <p className="text-lg max-2xl:text-base">
                          {employee.position}
                        </p>
                      </div>
                      <div className="flex items-center gap-5">
                        <Link to={employee?.twitter ?? ""}>
                          <FaTwitter size={20} />
                        </Link>
                        <Link to={employee?.linkedin ?? ""}>
                          <FaLinkedin size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <ServiceDetails />
      </div>
    </section>
  );
};

export { About };