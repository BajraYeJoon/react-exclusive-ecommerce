import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import CategorySelector from "./CategorySelector";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { fetchCategories } from "../../../common/api/categoryApi";
import { Axios } from "../../../common/lib/axiosInstance";
import { Loading } from "../../../user-portal/site";
import { Label } from "../../../common/ui/label";
import { Input } from "../../../common/ui/input";
import { Textarea } from "../../../common/ui/textarea";
import { FileDropzone } from "./file";
import { Button } from "../../../common/ui/button";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  brand: z
    .string()
    .min(1, "Brand is required")
    .max(50, "Brand must be 50 characters or less"),
  price: z
    .number()
    .positive("Price must be a positive number")
    .max(1000000, "Price must be less than or equal to 1,000,000"),
  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock must be a non-negative number"),
  discountprice: z
    .union([
      z
        .number()
        .positive()
        .max(1000000, "Discount price must be less than or equal to 1,000,000"),
      z.string().transform((val) => (val === "" ? null : Number(val))),
    ])
    .nullable()
    .optional(),
  sizes: z
    .string()
    .optional()
    .nullable()
    .refine(
      (value) => {
        const validSizes = ["xs", "s", "sm", "m", "lg", "xl"];
        return (
          value === null ||
          (typeof value === "string" && validSizes.includes(value))
        );
      },
      { message: "Size must be one of the following: xs, s, sm, m, lg, xl" },
    ),
  returnpolicy: z
    .string()
    .min(10, "Return policy must be at least 10 characters long")
    .max(1000, "Return policy must be 1000 characters or less"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long")
    .max(2000, "Description must be 2000 characters or less"),
  categories: z.string().min(1, "At least one category is required"),
  image: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(4, "Maximum 4 images allowed"),
});

const steps = [
  {
    id: "basic-info",
    title: "Basic Info",
    fields: ["title", "brand", "price", "discountprice", "stock"],
  },
  {
    id: "details",
    title: "Details",
    fields: ["sizes", "returnpolicy", "description"],
  },
  { id: "images", title: "Images", fields: ["image", "categories"] },
];

export default function AddNewProductDialog() {
  const [currentStep, setCurrentStep] = useState(0);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const {
    data: categories = [],
    isLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      price: "",
      stock: "",
      discountprice: "",
      sizes: "",
      returnpolicy: "",
      description: "",
      brand: "",
      categories: "",
      image: [] as File[],
    },
  });

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      const updatedCategories = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId];
      setValue("categories", updatedCategories.join(","));
      return updatedCategories;
    });
  };

  const handleImageDrop = (acceptedFiles: any) => {
    setProductImages((prev) => [...prev, ...acceptedFiles]);
    setValue("image", acceptedFiles);
  };

  const handleImageRemove = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setValue(
      "image",
      productImages.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        productImages.forEach((image) => formData.append("image", image));
      } else if (value !== undefined && value !== null) {
        // Ensure to convert numeric fields to strings explicitly if needed
        formData.append(key, String(value));
      }
    });
  
    console.log("Form Data:", Object.fromEntries(formData));
  
    try {
      const response = await Axios.post("/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("API Response:", response);
      if (response.status === 201) {
        console.log("Product created successfully:", response.data);
        setCurrentStep(0);
        reset();
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product created successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response || error);
      setError(
        error.response?.data?.message ||
        "Failed to create product. Please try again."
      );
      toast.error(
        "Failed to create product. Please check the console for more details."
      );
    }
  };
  

  const nextStep = async () => {
    const currentFields = steps[currentStep].fields;
    const isValid = await trigger(
      currentFields as (
        | "title"
        | "brand"
        | "price"
        | "stock"
        | "discountprice"
        | "sizes"
        | "returnpolicy"
        | "description"
        | "categories"
        | "image"
      )[],
    );
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      setError("");
    } else {
      setError("Please fill in all required fields before proceeding.");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    setError("");
  };

  if (isLoading) return <Loading />;
  if (categoriesError)
    return <div>Error loading categories. Please reload the page.</div>;

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold">Add New Product</h2>
        <div className="mb-8 flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                  index <= currentStep ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-sm">{step.title}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-4 flex items-center rounded-md bg-red-100 p-4 text-primary">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 0 && (
            <>
              <div>
                <Label className="mb-1 block font-medium">Product Title</Label>
                <Input
                  {...register("title")}
                  className="w-full rounded border p-2"
                  placeholder="Enter product title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-primary">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-1 block font-medium">Brand</Label>
                <Input
                  {...register("brand")}
                  className="w-full rounded border p-2"
                  placeholder="Enter brand name"
                />
                {errors.brand && (
                  <p className="mt-1 text-sm text-primary">
                    {errors.brand.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-1 block font-medium">Price</Label>
                <Input
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  className="w-full rounded border p-2"
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-primary">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-1 block font-medium">Discount Price</Label>
                <Input
                  {...register("discountprice")}
                  type="number"
                  className="w-full rounded border p-2"
                  placeholder="Enter discount price (optional)"
                />
                {errors.discountprice && (
                  <p className="mt-1 text-sm text-primary">
                    {errors.discountprice.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-1 block font-medium">Stock</Label>
                <Input
                  {...register("stock", { valueAsNumber: true })}
                  type="number"
                  className="w-full rounded border p-2"
                  placeholder="Enter stock quantity"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-primary">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              <div>
                <Label className="mb-1 block font-medium">Sizes</Label>
                <Input
                  {...register("sizes", {
                    setValueAs: (value) => (value === "" ? null : value),
                  })}
                  type="text"
                  className="w-full rounded border p-2"
                  placeholder="Enter size (optional)"
                />
                {errors.sizes && (
                  <p className="mt-1 text-sm text-primary">
                    {errors.sizes.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-1 block font-medium">Return Policy</Label>
                <Textarea
                  {...register("returnpolicy")}
                  className="w-full rounded border p-2"
                  placeholder="Enter return policy"
                  rows={3}
                />
                {errors.returnpolicy && (
                  <p className="mt-1 text-sm text-primary">
                    {errors.returnpolicy.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-1 block font-medium">Description</Label>
                <Textarea
                  {...register("description")}
                  className="w-full rounded border p-2"
                  placeholder="Enter product description"
                  rows={5}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-primary">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div>
                <Label className="mb-1 block font-medium">Product Images</Label>
                <FileDropzone
                  onDrop={handleImageDrop}
                  files={productImages}
                  onRemove={handleImageRemove}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-primary">
                    {errors.image.message}
                  </p>
                )}
              </div>

              <CategorySelector
                categories={categories}
                selectedCategories={selectedCategories}
                onCategorySelect={handleCategorySelect}
              />
              {errors.categories && (
                <p className="mt-1 text-sm text-primary">
                  {errors.categories.message}
                </p>
              )}
            </>
          )}
        </form>
      </div>
      <div className="flex justify-between px-6 py-4">
        <Button
          onClick={prevStep}
          disabled={currentStep === 0}
          variant="outline"
        >
          Previous
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        ) : (
          <Button onClick={nextStep}>Next</Button>
        )}
      </div>
    </div>
  );
}
