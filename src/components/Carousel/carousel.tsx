import { useState, useEffect } from "react";

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex-1 pl-14 pt-14 w-full">
      <div className="relative rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out h-fit w-full overflow-hidden ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            <img
              src={image}
              className="h-96 object-cover w-full"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
              {images.map((_, btnIndex) => (
                <button
                  key={btnIndex}
                  type="button"
                  className={`w-3 h-3 rounded-full ${
                    btnIndex === currentIndex ? "bg-white" : "bg-gray-400"
                  }`}
                  aria-label={`Slide ${btnIndex + 1}`}
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
