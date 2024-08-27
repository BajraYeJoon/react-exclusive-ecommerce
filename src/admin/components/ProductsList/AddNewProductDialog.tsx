import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../user-portal/components";
import { Axios } from "../../../common/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchCategories } from "../../../common/api/categoryApi";
import { FileUpIcon } from "lucide-react";
import Previews from "./imageupload";

const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be a positive number"),
  image: z.any(),
  discounttag: z.boolean().optional(),
  rating: z.number().positive("Rating must be a positive number"),
  discountprice: z
    .union([
      z.number().positive("Discount price must be a positive number"),
      z.undefined(),
    ])
    .optional(),
  sizes: z.union([z.string(), z.null()]).optional(),

  returnpolicy: z.string().min(1, "Return policy is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  availability: z.boolean(),
  categories: z.string().optional(),
});

interface InitialData {
  id: string;
  title?: string;
  price?: number;
  image?: any;
  discounttag?: boolean;
  rating?: number;
  discountprice?: number | null;
  sizes?: string | null;
  returnpolicy?: string;
  description?: string;
  brand?: string;
  availability?: boolean;
  categories?: string;
}

interface AddNewProductDialogProps {
  mode?: "create" | "update";
  initialData?: InitialData;
}

const AddNewProductDialog = ({
  mode,
  initialData,
}: AddNewProductDialogProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: initialData,
  });
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  console.log(selectedCategories);

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    select: (categories) => categories.slice(0, 4),
  });

  useEffect(() => {
    if (initialData?.categories) {
      const categoriesArray = Array.isArray(initialData.categories)
        ? initialData.categories
        : [initialData.categories];
      setSelectedCategories(categoriesArray.map((data) => data.id));
    }
    if (initialData?.image) {
      setImageUrls(initialData.image);
    }
  }, [initialData]);

  console.log("initial datasssssss", initialData);

  // const handleCategorySelect = (categoryId: any) => {
  //   setSelectedCategories((prevSelected) => {
  //     if (prevSelected.includes(categoryId)) {
  //       return prevSelected.filter((id) => id !== categoryId);
  //     } else {
  //       return [...prevSelected, categoryId];
  //     }
  //   });
  // };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId],
    );
  };

  const onSubmit = (data: any) => {
    console.log("form data", data);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key] instanceof FileList) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    console.log("form data", formData);

    const request =
      mode === "create"
        ? Axios.post("/product/create", formData)
        : Axios.patch(`/product/update/${initialData?.id}`, formData);

    request
      .then((response) => {
        console.log("Success:", response.data);
        reset();
        toast.success(
          `Product ${mode === "create" ? "created" : "updated"} successfully`,
        );
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
          toast.error(
            `Failed to ${mode === "create" ? "create" : "update"} product`,
          );
        } else if (error.request) {
          console.error("Error request:", error.request);
          toast.error(
            `Failed to ${mode === "create" ? "create" : "update"} product`,
          );
        } else {
          console.error("Error message:", error.message);
          toast.error(
            `Failed to ${mode === "create" ? "create" : "update"} product`,
          );
        }
      });
  };

  setValue("categories", selectedCategories.join(","));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-6 text-xl font-semibold lg:text-2xl">
        {mode === "create" ? "Add New Product" : "Edit Product"}
      </h1>

      {step === 1 && (
        <div className="grid items-center gap-3 md:grid-cols-2">
          <div>
            <label>Title</label>
            <input
              {...register("title")}
              placeholder="JBL earphone"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
            {errors.title && (
              <p className="text-sm font-medium text-destructive">
                {errors.title.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              placeholder="10.15"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
            {errors.price && (
              <p className="text-sm font-medium text-destructive">
                {errors.price.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label>Image</label>
            <input
              type="file"
              {...register("image")}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
            {imageUrls.length === 0 ? (
              <img
                src="https://via.placeholder.com/300"
                alt="Placeholder Image"
              />
            ) : (
              imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Product Image ${index + 1}`} />
              ))
            )}
            {errors.image && (
              <p className="text-sm font-medium text-destructive">
                {errors.image.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label>Discount Tag</label>
            <input
              type="checkbox"
              {...register("discounttag")}
              className="h-6 w-fit rounded-md bg-gray-100 px-3"
            />
            {errors.discounttag && (
              <p className="text-sm font-medium text-destructive">
                {errors.discounttag.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label>Rating</label>
            <input
              type="number"
              {...register("rating", { valueAsNumber: true })}
              placeholder="3"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
            {errors.rating && (
              <p className="text-sm font-medium text-destructive">
                {errors.rating.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label>Discount Price</label>
            <input
              type="number"
              {...register("discountprice", { valueAsNumber: true })}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
            {errors.discountprice && (
              <p className="text-sm font-medium text-destructive">
                {errors.discountprice.message?.toString()}
              </p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label>Sizes</label>
            <input
              type="text"
              {...register("sizes")}
              placeholder="l"
              defaultValue={watch("sizes") || "default-size"} // Set your default value here
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
            {errors.sizes && (
              <p className="text-sm font-medium text-destructive">
                {errors.sizes.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label>Return Policy</label>
            <input
              type="text"
              {...register("returnpolicy")}
              placeholder="45 days return policy"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
            {errors.returnpolicy && (
              <p className="text-sm font-medium text-destructive">
                {errors.returnpolicy.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              {...register("description")}
              placeholder="A timeless bluetooth earphone that never goes out of style."
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
            {errors.description && (
              <p className="text-sm font-medium text-destructive">
                {errors.description.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label>Brand</label>
            <input
              type="text"
              {...register("brand")}
              placeholder="JBL"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
            {errors.brand && (
              <p className="text-sm font-medium text-destructive">
                {errors.brand.message?.toString()}
              </p>
            )}
          </div>
          <div className="mt-3 flex items-start gap-2">
            <label>Availability</label>
            <input
              type="checkbox"
              {...register("availability")}
              className="h-6 w-full rounded-md bg-gray-100 px-3"
            />
            {errors.availability && (
              <p className="text-sm font-medium text-destructive">
                {errors.availability.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label>Categories</label>
            <div className="mt-2 h-fit w-full rounded-md bg-gray-100 px-3">
              {categories.map((category: any) => (
                <button
                  key={category.id}
                  type="button"
                  className={`m-1 rounded p-2 ${selectedCategories.includes(category.id) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <input type="hidden" {...register("categories")} />
            {errors.categories && (
              <p className="text-sm font-medium text-destructive">
                {errors.categories.message?.toString()}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <Button type="button" onClick={prevStep}>
            Previous
          </Button>
        )}
        {step < 2 ? (
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button type="submit">
            {mode === "create" ? "Create Product" : "Update Product"}
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddNewProductDialog;
