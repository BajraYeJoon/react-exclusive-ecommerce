import { Swiper, SwiperSlide } from "swiper/react";
import { CustomBreakcrumb } from "../../components";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { ServiceDetails } from "../../pages";

const employees = [
  {
    name: "tom crouise",
    position: "founder & chairman",
    imgSrc: "/employee-1.webp",
  },
  {
    name: "Janeth doe ",
    position: "Marketing",
    imgSrc: "/employee-2.webp",
  },
  {
    name: "John doe",
    position: "Sales Manager",
    imgSrc: "/employee-3.webp",
  },
  {
    name: "Emily Joe",
    position: "Social Media",
    imgSrc: "/employee-1.webp",
  },
  {
    name: "Tom crouise",
    position: "Action Actor",
    imgSrc: "/employee-2.webp",
  },
];

const stats = [
  { value: "10.5k", description: "Sallers active our site" },
  { value: "33k", description: "Mopnthly Produduct Sale" },
  { value: "45.5k", description: "Customer active in our site" },
  { value: "25k", description: "Anual gross sale in our site" },
];

const About = () => {
  return (
    <section className="relative mx-8 my-6 h-fit md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <CustomBreakcrumb breadcrumbTitle="About" />

      <div className="space-y-32">
        <section className="flex items-center justify-between gap-16">
          <div className="flex flex-col gap-8 text-ellipsis">
            <h1 className="text-6xl capitalize max-2xl:text-4xl">our story</h1>
            <p className="text-lg max-2xl:text-base">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
            </p>
            <p className="text-lg max-2xl:text-base">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
          <img
            alt="girls"
            width="700"
            height="700"
            decoding="async"
            src="/girls.webp"
            className="max-3xl:w-[600px] w-[600px] object-contain max-2xl:w-[500px]"
          />
        </section>
        <section className="flex justify-between gap-12">
          {stats.map(({ description, value }, index) => (
            <div
              className="3 group flex flex-col items-center gap-9 rounded-md border border-foreground/25 px-9 py-5 hover:bg-primary lg:px-12"
              key={index}
            >
              <div className="space-y-3 text-center">
                <p className="__className_39e0cc group-hover:text-color-text-1 max-3xl:text-3xl text-4xl transition-colors duration-300 ease-in-out max-2xl:text-xl">
                  {value}
                </p>
                <p className="group-hover:text-color-text-1 text-lg transition-colors duration-300 ease-in-out max-2xl:text-base">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </section>

        <Swiper
          className="mySwiper h-full"
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={3}
          pagination={{
            clickable: true,
          }}
        >
          {employees.map((employee, index) => (
            <SwiperSlide key={index}>
              <div className="text-color-text-3 flex items-center justify-center">
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
                      src={employee.imgSrc}
                    />
                  </div>
                  <div className="max-3xl:gap-2 flex flex-col items-start gap-4">
                    <div className="max-3xl:gap-1 flex flex-col items-start gap-2 capitalize">
                      <p className="__className_81fb23 max-3xl:text-3xl text-4xl max-2xl:text-2xl">
                        {employee.name}
                      </p>
                      <p className="text-lg max-2xl:text-base">
                        {employee.position}
                      </p>
                    </div>
                    <div className="flex items-center gap-5">
                      <FaTwitter size={20} />
                      <FaLinkedin size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <ServiceDetails />
      </div>
    </section>
  );
};

export default About;
