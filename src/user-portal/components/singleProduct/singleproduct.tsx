import CustomBreakcrumb from "../customBreakcrumb/CustomBreakcrumb";
import { ShoppingBasket, StarIcon } from "lucide-react";
import { Button } from "../../../common/ui/button";
import { CgGlobeAlt } from "react-icons/cg";
import { FcCancel } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "../../../common/lib/utils";
import { BiStar } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { fetchProductDetails } from "../../../common/api/productApi";
import { useIncreaseQuantity } from "../../utils/cartutils";
import Reviews from "./ratings";
import { useAuthContext } from "../../context/useAuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdAddCircleOutline, MdStarOutline } from "react-icons/md";
import { Loading } from "../../site";
import { Axios } from "../../../common/lib/axiosInstance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../common/ui/dialog";
import { toast } from "sonner";
import { marked } from "marked";
import "./styles.css";
import DOMPurify from "dompurify";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Singleproduct = () => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { mutate: addToCart } = useIncreaseQuantity();
  const { isAdmin, isLoggedIn } = useAuthContext();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: details, isLoading } = useQuery({
    queryKey: ["productdetails"],
    queryFn: () => fetchProductDetails(productId ?? ""),
  });

  console.log(details?.id, "details");

  const htmlContent = details?.description ? marked(details.description) : "";
  const sanitizedContent = DOMPurify.sanitize(String(htmlContent));

  const { data: ratingsData } = useQuery({
    queryKey: ["ratings"],
    queryFn: () => Axios.get(`/rating/${details.id}`),
  });

  const ratings = ratingsData?.data;

  useEffect(() => {
    if (details?.image?.length > 0) {
      setSelectedImage(details?.image[0]);
    }
  }, [details]);

  if (isLoading) {
    return (
      <div className="flex h-[90vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  const handleRatingSubmit = async () => {
    try {
      await Axios.post(`rating/create/${details?.id}`, { rating, comment });
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
      setRating(0);
      setComment("");
      toast.success("Rating submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit rating. Please try again.");
    }
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <CustomBreakcrumb
          breadcrumbTitle={`${details?.brand && details?.brand}`}
        />

        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="col-auto lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="w-full lg:order-2 lg:ml-5">
                <div className="h-56 w-full overflow-hidden rounded-lg md:h-[400px] lg:h-[500px]">
                  <img
                    className="h-full w-full object-contain"
                    src={selectedImage}
                    alt={`Product Details Image for ${details?.title}`}
                  />
                </div>
              </div>

              {details?.image?.length > 1 && (
                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                  <div className="flex flex-row items-start lg:flex-col">
                    {details?.image?.map((image: string) => (
                      <button
                        key={`iamge-${uuidv4()}`}
                        type="button"
                        className={`flex-0 mb-3 aspect-square h-20 overflow-hidden rounded-lg border-2 ${
                          selectedImage === image
                            ? "border-gray-900"
                            : "border-transparent"
                        } text-center`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          className="h-full w-full object-cover"
                          src={image}
                          alt={`${details?.title} image ${uuidv4()}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-3xl font-light">
              {details.title}
              <span
                className={cn(
                  `ml-3 inline-flex w-fit flex-wrap justify-center rounded-full bg-foreground/10 px-2 py-1 text-xs font-medium text-foreground/70`,
                  details.availability === true ? "bg-green-400" : "bg-red-400",
                )}
              >
                {details.availability === true ? " in stock" : " out of stock"}
              </span>
            </h1>
            <p className="text-base text-gray-400">
              {details?.brand && details?.brand}
            </p>
            <div className="flex items-center text-yellow-300 underline">
              {Array.from({ length: Math.ceil(ratings?.totalRating) }).map(
                () => (
                  <BiStar
                    key={`star-${uuidv4()}`}
                    size={20}
                    className="text-yellow-500"
                  />
                ),
              )}

              <p className="ml-2 text-sm font-medium text-yellow-600">
                {ratings ? ratings.allRatings[0].ratings.length : 0} Reviews
              </p>
            </div>
            <h1 className="text-lg">
              Price:{" "}
              <span className="text-2xl text-red-700">${details.price}</span>
            </h1>
            {!isAdmin && details.availability === true && (
              <Button
                className="mt-6"
                onClick={() => addToCart({ id: details?.id, type: "add" })}
              >
                <ShoppingBasket className="mr-4" />
                Add to cart
              </Button>
            )}
            <div className="mt-6 max-w-fit overflow-ellipsis break-normal">
              <h3 className="mb-4 text-base font-medium lg:text-lg">
                Description:
              </h3>
              <div
                className="prose prose-sm markdown-content max-w-none overflow-hidden text-gray-700"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </div>

            <hr className="w-full bg-foreground/35" />
            {details.sizes && (
              <>
                <h2 className="text-forerground mt-8 text-base">
                  Available Sizes
                </h2>
                <Button variant={"outline"} className="uppercase">
                  {" "}
                  {details.sizes}
                </Button>
              </>
            )}

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

            {ratings?.totalRating === 0 ? (
              <div className="flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-4">
                <MdAddCircleOutline size={24} className="mr-2 text-gray-500" />
                <h3 className="text-gray-700">No ratings for this product</h3>
                {isLoggedIn && !isAdmin && (
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="outline" className="ml-4">
                        Add Rating
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Your Rating</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className="rounded text-2xl focus:outline-none"
                            >
                              {star <= rating ? (
                                <StarIcon className="text-yellow-500" />
                              ) : (
                                <MdStarOutline className="text-gray-400" />
                              )}
                            </button>
                          ))}
                        </div>
                        <textarea
                          placeholder="Add your comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={4}
                          className="w-full rounded border border-gray-300 p-2 focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <DialogTrigger asChild>
                          <Button variant="secondary">Cancel</Button>
                        </DialogTrigger>
                        <Button
                          onClick={handleRatingSubmit}
                          disabled={rating === 0}
                        >
                          Submit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            ) : (
              <>
                {/* {details.ratings?.map((rating: any) => { */}
                <Reviews values={ratings} key={`${uuidv4()}`} />;{/* })} */}
              </>
            )}
          </div>
        </div>
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