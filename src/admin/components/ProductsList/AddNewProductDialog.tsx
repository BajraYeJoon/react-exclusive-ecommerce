import { useState } from "react";
import { useForm } from "react-hook-form";
import { Axios } from "../../../lib/axiosInstance";
import { Button } from "../../../components";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../api/categoryApi";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be a positive number"),
  image: z.any(),
  discounttag: z.boolean().optional(),
  rating: z.number().positive("Rating must be a positive number"),
  discountprice: z
    .number()
    .positive("Discount price must be a positive number")
    .optional(),
  sizes: z.enum(["s", "m", "l", "xl", "xxl"]).optional(),
  returnpolicy: z.string().min(1, "Return policy is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  availability: z.boolean(),
  categories: z.string().optional(),
});

const AddNewProductDialog = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
  });
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery("categories", fetchCategories, {
    select: (categories) => categories.slice(0, 4),
  });

  // console.log(categories);
  const handleCategorySelect = (categoryId: any) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
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

    Axios.post("/product/create", formData)
      .then((response) => {
        console.log("Success:", response.data);
        reset();
        toast.success("Product created successfully");
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Error response:", error.response.data);
          toast.error("Failed to create product");
        } else if (error.request) {
          // Request was made but no response received
          console.error("Error request:", error.request);
          toast.error("Failed to create product");
        } else {
          // Something else caused the error
          console.error("Error message:", error.message);
          toast.error("Failed to create product");
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
        Add New Product
      </h1>

      {step === 1 && (
        <div className="grid gap-3 md:grid-cols-2">
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
            {errors.image && (
              <p className="text-sm font-medium text-destructive">
                {errors.image.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label>Discount Tag</label>
            <input
              type="checkbox"
              {...register("discounttag")}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
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
          <div>
            <label>Availability</label>
            <input
              type="checkbox"
              {...register("availability")}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
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

      <div className="mt-5 flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
        )}
        {step < 2 && (
          <Button variant="secondary" onClick={nextStep}>
            Next
          </Button>
        )}
        {step === 2 && (
          <Button variant="default" type="submit">
            Create
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddNewProductDialog;
