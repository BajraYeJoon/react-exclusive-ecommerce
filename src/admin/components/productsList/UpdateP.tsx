import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../../common/lib/axiosInstance";
import { fetchCategories } from "../../../common/api/categoryApi";
import { FileDropzone } from "./file";
import { z } from "zod";
import { Input } from "../../../common/ui/input";
import { Label } from "../../../common/ui/label";
import { Button } from "../../../common/ui/button";
import { toast } from "sonner";
import CategorySelector from "./CategorySelector";
import { CheckCircle2 } from "lucide-react";
import { Textarea } from "../../../common/ui/textarea";
import { Loading } from "../../../user-portal/site";

const updateProductSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less")
    .optional(),
  brand: z
    .string()
    .min(1, "Brand is required")
    .max(50, "Brand must be 50 characters or less")
    .optional(),
  price: z
    .number()
    .positive("Price must be a positive number")
    .max(1000000, "Price must be less than or equal to 1,000,000")
    .optional(),
  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock must be a non-negative number")
    .optional(),
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
        const validSizes = ["xs", "s", "sm", "m", "l", "xl"];
        return (
          value === null ||
          (typeof value === "string" && validSizes.includes(value))
        );
      },
      {
        message: "Size must be one of the following: xs, s, sm, m, l, xl",
      },
    ),
  returnpolicy: z
    .string()
    .min(10, "Return policy must be at least 10 characters long")
    .max(1000, "Return policy must be 1000 characters or less")
    .optional(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long")
    .max(2000, "Description must be 2000 characters or less"),
  categories: z
    .array(z.string())
    .min(1, "At least one category is required")
    .transform((categories) => categories.join(",")),
  image: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(4, "Maximum 4 images allowed")
    .optional(),
});

type UpdateProductFormData = z.infer<typeof updateProductSchema>;

interface Category {
  id: number;
  name: string;
}

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

export default function UpdateProductForm({ initialData, setDialogOpen }: any) {
  const queryClient = useQueryClient();
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    initialData.categories?.map((cat: any) => cat.id) || [],
  );
  const [images, setImages] = useState<Array<string | File>>(
    initialData.image || [],
  );

  console.log(initialData, "edit product");

  const [currentStep, setCurrentStep] = useState(0);
  const [imageChanged, setImageChanged] = useState(false);
  console.log(imageChanged);

  const [error, setError] = useState("");

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<
    Category[],
    Error
  >({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      title: "",
      price: "",
      stock: "",
      discountprice: "",
      sizes: "",
      returnpolicy: "",
      description: "",
      brand: "",
      categories: [] as string[],
      image: [] as File[],
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    setImages(initialData.images || []);
    setSelectedCategories(
      initialData.categories?.map((cat: any) => cat.id) || [],
    );
    reset({
      title: initialData.title || "",
      brand: initialData.brand || "",
      price: initialData.price || "",
      discountprice: initialData.discountPrice || "",
      stock: initialData.stock || "",
      sizes: initialData.sizes || "",
      returnpolicy: initialData.returnpolicy || "",
      description: initialData.description || "",
      categories:
        initialData.categories?.map((cat: any) => String(cat.id)) || [], // Convert numbers to strings
      image: initialData.image || [],
    });
  }, [initialData, reset]);

  const updateProductMutation = useMutation({
    mutationFn: (data: Partial<UpdateProductFormData>) =>
      Axios.patch(`/product/${initialData.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
    },
  });

  const addImageMutation = useMutation({
    mutationFn: (formData: FormData) =>
      Axios.patch(`/product/addimage/${initialData.id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Image has been uploaded successfully");
    },
    onError: () => {
      toast.error("Failed to upload image. Please check format and try again");
    }
  });

  const deleteImageMutation = useMutation({
    mutationFn: (index: number) =>
      Axios.delete(`/product/deleteimage/${initialData.id}`, {
        data: { index: index },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      console.error("Failed to delete image", error);
    },
  });

  useEffect(() => {
    setImages(initialData.image || []);
  }, [initialData.image]);

  if (categoriesLoading) {
    return <Loading />;
  }

  const handleImageDrop = async (acceptedFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    setImageChanged(true);
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("image", file);
      await addImageMutation.mutate(formData);
    }
  };

  const handleImageDelete = async (index: number) => {
    try {
      await deleteImageMutation.mutateAsync(index);
      queryClient.invalidateQueries({ queryKey: ["products", initialData.id] });
      toast.success("Image has been deleted");
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setImageChanged(true);
    } catch (error) {
      console.error("Failed to delete image", error);
    }
  };

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      const updatedCategories = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId];
      setValue("categories", updatedCategories.map(String)); // Convert numbers to strings
      return updatedCategories;
    });
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    await updateProductMutation.mutate(data);
    setImageChanged(false);
    setDialogOpen(false);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    setError("");
  };
  const nextStep = async () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    setError("");
  };

  const isFormChanged = () => {
    const initialValues = {
      title: initialData.title || "",
      brand: initialData.brand || "",
      price: initialData.price || "",
      discountprice: initialData.discountPrice || "",
      stock: initialData.stock || "",
      sizes: initialData.sizes || "",
      returnpolicy: initialData.returnpolicy || "",
      description: initialData.description || "",
      categories:
        initialData.categories?.map((cat: any) => String(cat.id)) || [], // Convert numbers to strings
      image: initialData.image || [],
    };

    return JSON.stringify(watchedValues) !== JSON.stringify(initialValues);
  };

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
                  {...register("stock")}
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
                  files={images}
                  onRemove={handleImageDelete}
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
                onCategorySelect={handleCategoryToggle}
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
          <Button onClick={handleSubmit(onSubmit)} disabled={!isFormChanged()}>
            Submit
          </Button>
        ) : (
          <Button onClick={nextStep}>Next</Button>
        )}
      </div>
    </div>
  );
}