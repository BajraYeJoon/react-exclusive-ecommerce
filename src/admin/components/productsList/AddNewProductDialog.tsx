"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { Axios } from "../../../common/lib/axiosInstance";
import { fetchCategories } from "../../../common/api/categoryApi";
import { Button } from "../../../common/ui/button";
import { Input } from "../../../common/ui/input";
import { Checkbox } from "../../../common/ui/checkbox";
import { Label } from "../../../common/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { FileDropzone } from "./imageupload";

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
  sizes: z.string().nullable().optional(),
  returnpolicy: z.string().min(1, "Return policy is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  availability: z.boolean(),
  categories: z.string().optional(),
});

type ProductFormData = z.infer<typeof createProductSchema>;

interface ProductFormProps {
  mode: "create" | "update";
  initialData?: Partial<ProductFormData> & { id?: string };
}

export default function ProductForm({
  mode = "create",
  initialData,
}: ProductFormProps) {
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: initialData,
  });

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

  console.log();

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId],
    );
  };

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();

    console.log("Form data", formData);

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    console.log("api call start");

    try {
      const response = await (mode === "create"
        ? Axios.post("/product/create", formData)
        : Axios.patch(`/product/update/${initialData?.id}`, formData));

      reset();
      console.log(response);
      toast.success(
        `Product ${mode === "create" ? "created" : "updated"} successfully`,
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        `Failed to ${mode === "create" ? "create" : "update"} product`,
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Add New Product" : "Edit Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="JBL earphone"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="10.15"
                />
                {errors.price && (
                  <p className="text-sm text-destructive">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Product Image</Label>
                <FileDropzone register={register} />
                <div className="grid grid-cols-3 gap-2">
                  {imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Product Image ${index + 1}`}
                      className="rounded-md"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  {...register("rating", { valueAsNumber: true })}
                  placeholder="3"
                />
                {errors.rating && (
                  <p className="text-sm text-destructive">
                    {errors.rating.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountprice">Discount Price</Label>
                <Input
                  id="discountprice"
                  type="number"
                  {...register("discountprice", { valueAsNumber: true })}
                />
                {errors.discountprice && (
                  <p className="text-sm text-destructive">
                    {errors.discountprice.message}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <Checkbox id="discounttag" {...register("discounttag")} />
                <Label htmlFor="discounttag">Discount Tag</Label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sizes">Sizes</Label>
                <Input
                  id="sizes"
                  {...register("sizes")}
                  placeholder="L, XL, XXL"
                />
                {errors.sizes && (
                  <p className="text-sm text-destructive">
                    {errors.sizes.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnpolicy">Return Policy</Label>
                <Input
                  id="returnpolicy"
                  {...register("returnpolicy")}
                  placeholder="45 days return policy"
                />
                {errors.returnpolicy && (
                  <p className="text-sm text-destructive">
                    {errors.returnpolicy.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="A timeless bluetooth earphone that never goes out of style."
                  className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" {...register("brand")} placeholder="JBL" />
                {errors.brand && (
                  <p className="text-sm text-destructive">
                    {errors.brand.message}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="availability" {...register("availability")} />
                <Label htmlFor="availability">Availability</Label>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category: any) => (
                    <Button
                      key={category.id}
                      type="button"
                      variant={
                        selectedCategories.includes(category.id)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                <input
                  type="hidden"
                  {...register("categories")}
                  value={selectedCategories.join(",")}
                />
              </div>
            </div>
          )}
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button type="button" onClick={prevStep} variant="outline">
                Previous
              </Button>
            )}
            {step < 2 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" onSubmit={handleSubmit(onSubmit)}>
                {mode === "create" ? "Create Product" : "Update Product"}
              </Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
