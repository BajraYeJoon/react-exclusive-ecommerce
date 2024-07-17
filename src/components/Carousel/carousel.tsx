import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { ArrowRight } from "lucide-react";
import { SiApple } from "react-icons/si";
import { Link } from "react-router-dom";

type HeroContent = { title: string; brandName: string }[];

const Carousel = ({ heroContent }: { heroContent: HeroContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    }, 300000);

    return () => clearInterval(interval);
  }, [heroContent.length]);

  return (
    <div className="carousel-container flex-1 lg:pl-14 pt-4 lg:pt-14 w-full">
      <div className="carousel-wrapper relative ">
        {heroContent.map((content, index) => (
          <div
            key={index}
            className={cn(
              "carousel-slide duration-700 ease-in-out h-fit w-full overflow-hidden",
              index === currentIndex ? "block" : "hidden"
            )}
          >
            <div className="carousel-content grid grid-cols-1 md:grid-cols-2 align-middle bg-foreground w-full h-56 lg:h-96 p-4 md:p-0">
              <div className="carousel-text gap-0 md:gap-6 md:pl-10 lg:pl-14 text-background flex flex-col justify-center items-start">
                <span className="brand-icon inline-flex items-center gap-3 md:gap-6">
                  <SiApple className="text-md md:text-base lg:text-xl" />
                  <span className="text-xs md:text-base lg:text-lg font-light">
                    {content.brandName}
                  </span>
                </span>
                <h1 className="carousel-title text-2xl lg:text-5xl text-balance font-medium tracking-wide leading-[4.2rem]">
                  {content.title}
                </h1>
                <Link
                  to="/products"
                  className="shop-now-link inline-flex items-center gap-1 text-background text-xs md:text-base lg:text-lg border-b border-background/25"
                >
                  Shop Now <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
              <div className="carousel-image w-full flex items-center">
                <img
                  src="/iphone-hero.png"
                  alt="Description"
                  className="object-cover  opacity-50 md:opacity-100"
                />
              </div>
            </div>

            <div className="carousel-indicators absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
              {heroContent.map((_, btnIndex) => (
                <button
                  key={btnIndex}
                  type="button"
                  className={cn(
                    "indicator-dot w-3 h-3 rounded-full",
                    btnIndex === currentIndex ? "bg-white" : "bg-gray-400"
                  )}
                  aria-label={cn("Slide", btnIndex + 1)}
                  onClick={() => setCurrentIndex(btnIndex)}
                ></button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;