import CustomBreakcrumb from "../CustomBreakcrumb/CustomBreakcrumb";
import { ShoppingBasket, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CgGlobeAlt } from "react-icons/cg";
import { FcCancel } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductDetails } from "../../api/fetch";

interface RadioOption {
  value: string;
  label: string;
}

interface SizeProps {
  name: string;
  options: RadioOption[];
  defaultValue?: string;
}

const SizesGroup = ({ name, options, defaultValue }: SizeProps) => {
  return (
    <div className="mt-3 flex select-none flex-wrap items-center gap-1">
      {options.map((option, index) => (
        <label key={index} className="">
          <input
            type="radio"
            name={name}
            value={option.value}
            className="peer sr-only"
            defaultChecked={defaultValue === option.value}
          />
          <p className="rounded-lg border px-6 py-2 font-bold peer-checked:bg-primary peer-checked:text-background">
            {option.label}
          </p>
        </label>
      ))}
    </div>
  );
};

const Singleproduct = () => {
  const { productId } = useParams();
  const [details, setDetails] = useState<any>([]);

  console.log(productId);

  useEffect(() => {
    (async () => {
      const productDetails = await fetchProductDetails(productId!);
      setDetails(productDetails);
    })();
  }, [productId]);

  console.log(details);

  const sizeOPtions = [
    { value: "xs", label: "XS" },
    { value: " sm", label: "SM" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <CustomBreakcrumb breadcrumbTitle={`${details.brand}`} />

        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="h-72 w-full overflow-hidden rounded-lg *:bg-black">
                  <img
                    className="h-full w-full max-w-full object-cover"
                    src={details.image[0]}
                    alt=""
                  />
                </div>
              </div>
              {/* 
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 mb-3 aspect-square h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://plus.unsplash.com/premium_photo-1669703777565-05ec5f5dd7c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 mb-3 aspect-square h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://plus.unsplash.com/premium_photo-1669703777565-05ec5f5dd7c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 mb-3 aspect-square h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://plus.unsplash.com/premium_photo-1669703777565-05ec5f5dd7c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
                      alt=""
                    />
                  </button>
                </div>
              </div> */}
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-3xl font-light">{details.title}</h1>
            <div className="my-5 flex items-center">
              <StarIcon />
              <StarIcon />

              <StarIcon />

              <p className="ml-2 text-sm font-medium text-gray-500">
                1,209 Reviews
              </p>
            </div>
            <h1 className="text-3xl">$60.50</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              officiis quasi tempore est sint delectus eos voluptatum placeat
              nihil beatae!
            </p>
            <hr className="w-full bg-foreground/35" />
            <h2 className="text-forerground mt-8 text-base">Sized</h2>
            <SizesGroup name="type" options={sizeOPtions} defaultValue="xs" />

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-b border-t py-4 sm:flex-row sm:space-y-0">
              <Button>
                <ShoppingBasket className="mr-4" />
                Add to cart
              </Button>
            </div>
            <ul className="mt-8 space-y-2 border p-4">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <CgGlobeAlt size={50} className="mr-4" />
                <p className="flex flex-col gap-2">
                  <span>Free shipping worldwide</span>

                  <span>Enter you postal code for product availability</span>
                </p>
              </li>
              <hr className="w-full bg-foreground" />

              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <FcCancel size={50} className="mr-4" />
                <p className="flex flex-col gap-2">
                  <span>Cancel Anytime</span>

                  <span>Try for 30days</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Singleproduct;
