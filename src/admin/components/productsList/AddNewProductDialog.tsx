import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Axios } from "../../../common/lib/axiosInstance";
import { fetchCategories } from "../../../common/api/categoryApi";

import { FileDropzone } from "./file";
import CategorySelector from "./CategorySelector";
import { Button } from "../../../common/ui/button";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Label } from "../../../common/ui/label";
import { Textarea } from "../../../common/ui/textarea";
import { Input } from "../../../common/ui/input";


const schema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  brand: z.string().min(1, "Brand is required").max(50, "Brand must be 50 characters or less"),
  price: z.number().positive("Price must be a positive number").max(1000000, "Price must be less than or equal to 1,000,000"),
  stock: z.number().int("Stock must be an integer").nonnegative("Stock must be a non-negative number"),
  discountPrice: z.number().positive("Discount price must be a positive number").max(1000000, "Discount price must be less than or equal to 1,000,000").optional(),
  sizes: z.array(z.enum(["xs", "s", "m", "l", "xl", "xxl"])).min(1, "At least one size is required"),
  returnPolicy: z.string().min(10, "Return policy must be at least 10 characters long").max(1000, "Return policy must be 1000 characters or less"),
  description: z.string().min(20, "Description must be at least 20 characters long").max(2000, "Description must be 2000 characters or less"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  images: z.array(z.string()).min(1, "At least one image is required").max(4, "Maximum 4 images allowed"),
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

  const handleImageDrop = (acceptedFiles: File[]) => {
    setProductImages((prev: File[]) => [...prev, ...acceptedFiles]);
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
        formData.append(key, String(value));
      }
    });

    try {
      const response = await Axios.post("/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        console.log("Product created successfully:", response.data);
        setCurrentStep(0);
        reset();
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product created successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to create product. Please try again.");
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
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setError("");
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error loading categories</div>;

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
          <div className="mb-4 flex items-center rounded-md bg-red-100 p-4 text-red-700">
            {/* <AlertCircle className="h-5 w-5 mr-2" /> */}
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
                  <p className="mt-1 text-sm text-red-500">
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
                  <p className="mt-1 text-sm text-red-500">
                    {errors.brand.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-1 block font-medium">Price</Label>
                <Input
                  {...register("price")}
                  type="number"
                  className="w-full rounded border p-2"
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">
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
                  <p className="mt-1 text-sm text-red-500">
                    {errors.discountprice.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-1 block font-medium">Stock</Label>
                <Input
                  {...register("stock")}
                  type="number"
                  className="w-full rounded border p-2"
                  placeholder="Enter stock quantity"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-500">
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
                  {...register("sizes")}
                  className="w-full rounded border p-2"
                  placeholder="xs, s, m, l, xl, xxl"
                />
                {errors.sizes && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.sizes.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block font-medium">Return Policy</label>
                <Textarea
                  {...register("returnpolicy")}
                  className="w-full rounded border p-2"
                  placeholder="Enter return policy"
                  rows={3}
                />
                {errors.returnpolicy && (
                  <p className="mt-1 text-sm text-red-500">
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
                  <p className="mt-1 text-sm text-red-500">
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
                  <p className="mt-1 text-sm text-red-500">
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
                <p className="mt-1 text-sm text-red-500">
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
          variant={"outline"}
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
