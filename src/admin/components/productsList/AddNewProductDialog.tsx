import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Axios } from "../../../common/lib/axiosInstance";

import { FileDropzone } from "./file";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../common/api/categoryApi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { Label } from "../../../common/ui/label";
import { Input } from "../../../common/ui/input";
import { Checkbox } from "../../../common/ui/checkbox";
import { Button } from "../../../common/ui/button";

// Define the schema
const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be a positive number"),
  image: z.array(z.any()).optional(),
  discounttag: z.boolean().optional(),
  stock: z.number(),
  discountprice: z
    .number()
    .positive("Discount price must be a positive number")
    .optional(),
  sizes: z.string().nullable().optional(),
  returnpolicy: z.string().min(1, "Return policy is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  availability: z.boolean().optional(),
  categories: z.string().optional(),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

export default function AddNewProductDialog() {
  const methods = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      image: [],
    },
  });

  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [productImages, setProductImages] = useState<Array<string | File>>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  console.log(errors);

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    select: (categories) => categories.slice(0, 4),
  });

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId],
    );
  };

  const onSubmit = async (data: CreateProductFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        productImages.forEach((image) => {
          if (image instanceof File) {
            formData.append("image", image);
          }
        });
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      await Axios.post("/product/create", formData);
      reset();
      setProductImages([]);
      // Handle success (e.g., redirect or show a success message)
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    // Convert selected categories to a comma-separated string for the form
    setValue("categories", selectedCategories.join(","));
  }, [selectedCategories, setValue]);

  const handleImageDrop = (acceptedFiles: File[]) => {
    setProductImages((prev) => [...prev, ...acceptedFiles]);
    setValue("image", acceptedFiles);
  };

  const handleImageRemove = (url: string) => {
    setProductImages((prev) => prev.filter((img) => img !== url));
    setValue(
      "image",
      productImages.filter((img) => img !== url),
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
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

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...register("stock", { valueAsNumber: true })}
                    placeholder="3"
                  />
                  {errors.stock && (
                    <p className="text-sm text-destructive">
                      {errors.stock.message}
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
                  <Checkbox
                    id="discounttag"
                    {...register("discounttag", {
                      setValueAs: (value) => value === "on",
                    })}
                  />
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
                  <Label>Product Images</Label>
                  <FileDropzone
                    onDrop={handleImageDrop}
                    files={productImages}
                    onRemove={handleImageRemove}
                  />
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
                  <Checkbox
                    id="availability"
                    {...register("availability", {
                      setValueAs: (value) => value === "on",
                    })}
                  />
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
                <Button type="submit">Create Product</Button>
              )}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}