import { useState } from "react";

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //     }, 30000);

  //     return () => clearInterval(interval);
  //   }, [images.length]);

 

  return (
    <div className="flex-1 max-w-3xl w-full">
    <div className="relative rounded-lg">
      {/* {images.map((image, index) => (
        <div
          key={index}
          className={`duration-700 ease-in-out h-fit w-full overflow-hidden ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <img
            src={image}
            className=" h-96 object-cover w-full"
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))} */}
      <img src="/public/hero.png" alt="" 
       className=" h-96 object-contain w-full"/>
    </div>
    {/* <div className="absolute z-30 flex ">
      {images.map((_, index) => (
        <button
          key={index}
          type="button"
          className={`w-3 h-3 rounded-full ${
            index === currentIndex ? "bg-white" : "bg-gray-400"
          }`}
          aria-label={`Slide ${index + 1}`}
          onClick={() => setCurrentIndex(index)}
        ></button>
      ))}
    </div> */}
  </div>
  );
};

export default Carousel;
