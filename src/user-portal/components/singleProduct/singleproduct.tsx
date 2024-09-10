import CustomBreakcrumb from "../customBreakcrumb/CustomBreakcrumb";
import { ShoppingBasket } from "lucide-react";
import { Button } from "../../../common/ui/button";
import { CgGlobeAlt } from "react-icons/cg";
import { FcCancel } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { cn } from "../../../common/lib/utils";
import { BiStar } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { fetchProductDetails } from "../../../common/api/productApi";
import { useIncreaseQuantity } from "../../utils/cartutils";
import Reviews from "./ratings";



interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Singleproduct = () => {
  const { productId } = useParams();
  const [details, setDetails] = useState<any>([]);
  const { mutate: addToCart } = useIncreaseQuantity();

  useEffect(() => {
    (async () => {
      const productDetails = await fetchProductDetails(productId!);
      setDetails(productDetails);
    })();
  }, [productId]);

  console.log(details, "details");

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <CustomBreakcrumb breadcrumbTitle={`${details.brand}`} />

        <Suspense fallback={<div>Loading...</div>}>
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="col-auto lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="w-full lg:order-2 lg:ml-5">
                  <div className="h-56 w-full overflow-hidden rounded-lg md:h-[400px] lg:h-[500px]">
                    {details.image === "" ? (
                      <img
                        className="h-full w-full object-contain"
                        src={details.image}
                        alt=""
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-foreground/35">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

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
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="text-3xl font-light">
                {details.title}
                <span
                  className={cn(
                    `ml-3 inline-flex w-fit flex-wrap justify-center rounded-full bg-foreground/10 px-2 py-1 text-xs font-medium text-foreground/70`,
                    details.availability === true
                      ? "bg-green-400"
                      : "bg-red-400",
                  )}
                >
                  {details.availability === true
                    ? " in stock"
                    : " out of stock"}
                </span>
              </h1>
              <p className="text-base text-gray-400">{details.brand}</p>
              <div className="my-5 flex items-center">
                {Array.from({ length: Math.ceil(details.rating) }).map(() => (
                  <BiStar
                    key={`star-${uuidv4()}`}
                    size={20}
                    className="text-yellow-500"
                  />
                ))}

                <p className="ml-2 text-sm font-medium text-gray-500">
                  {details.rating} Ratings
                </p>
              </div>
              <h1 className="text-3xl">${details.price}</h1>
              <p>{details.description}</p>
              <hr className="w-full bg-foreground/35" />
              <h2 className="text-forerground mt-8 text-base">Sizes</h2>
              <Button>{details.sizes}</Button>

              <Button className="mt-6" onClick={() => addToCart(details.id)}>
                <ShoppingBasket className="mr-4" />
                Add to cart
              </Button>
              {/* 
              {details.ratings ? <h2>no ratings for this product</h2> : 
              <> */}
              {details.ratings?.map((rating: any) => {
                return <Reviews values={rating} key={rating.id} />;
              })}
              {/* </>
          } */}

              <ul className="mt-8 space-y-2 border p-4">
                <FeatureItem
                  icon={<CgGlobeAlt size={50} />}
                  title="Free shipping worldwide"
                  description="Enter your postal code for product availability"
                />
                <hr className="w-full bg-foreground" />
                <FeatureItem
                  icon={<FcCancel size={50} />}
                  title="Cancel Anytime"
                  description={details.returnpolicy}
                />
              </ul>
            </div>
          </div>
        </Suspense>
      </div>
    </section>
  );
};

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <li className="flex items-center text-left text-sm font-medium text-gray-600">
      <div className="mr-4">{icon}</div>
      <p className="flex flex-col gap-2">
        <span>{title}</span>
        <span>{description}</span>
      </p>
    </li>
  );
};

export default Singleproduct;

