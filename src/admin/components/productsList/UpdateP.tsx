import { useState, useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Axios } from "../../../common/lib/axiosInstance";

import { FileDropzone } from "./file";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategories } from "../../../common/api/categoryApi";

const updateProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be a positive number"),
  discounttag: z.string().optional(),
  stock: z.number(),
  discountprice: z
    .number()
    .positive("Discount price must be a positive number")
    .optional(),
  sizes: z.string().nullable().optional(),
  returnpolicy: z.string().min(1, "Return policy is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  availability: z.boolean(),
  categories: z.array(z.number()).min(1, "At least one category is required"),
  images: z.array(z.any()).optional(),
});

type UpdateProductFormData = z.infer<typeof updateProductSchema>;

interface UpdateProductFormProps {
  initialData: Partial<UpdateProductFormData> & {
    id: string;
    images: string[];
  };
}

export default function UpdateProductForm({
  initialData,
}: UpdateProductFormProps) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    initialData.categories?.map((cat: any) => cat.id) || [],
  );
  const queryClient = useQueryClient();

  const methods = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      ...initialData,
      categories: initialData.categories?.map((cat: any) => cat.id) || [],
      images: initialData.images || [],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const images = watch("images");

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const updateProductMutation = useMutation({
    mutationFn: (data: UpdateProductFormData) =>
      Axios.patch(`/product/${initialData.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", initialData.id] });
    },
  });

  const addImageMutation = useMutation({
    mutationFn: (formData: FormData) =>
      Axios.post(`/product/addimage/${initialData.id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", initialData.id] });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: (imageUrl: string) =>
      Axios.post(`/product/deleteimage/${initialData.id}`, { url: imageUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", initialData.id] });
    },
  });

  const handleImageDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => append(file));
  };

  const deleteAllImagesMutation = useMutation({
    mutationFn: () => Axios.post(`/product/deleteallimages/${initialData.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", initialData.id] });
    },
  });

  useEffect(() => {
    setValue("categories", selectedCategories);
  }, [selectedCategories, setValue]);

  const handleImageDelete = async (imageUrl: string) => {
    try {
      await deleteImageMutation.mutateAsync(imageUrl);
      remove(fields.findIndex((field) => field === imageUrl));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleDeleteAllImages = async () => {
    try {
      await deleteAllImagesMutation.mutateAsync();
      setValue("images", []);
    } catch (error) {
      console.error("Error deleting all images:", error);
    }
  };

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const onSubmit = async (data: UpdateProductFormData) => {
    try {
      const { images, ...productData } = data;
      await updateProductMutation.mutateAsync(productData);

      const newImages =
        images?.filter((img): img is File => img instanceof File) || [];
      for (const newImage of newImages) {
        const formData = new FormData();
        formData.append("image", newImage);
        await addImageMutation.mutateAsync(formData);
      }

      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <FormProvider {...methods}>
      <Card className="h-[calc(100vh-4rem)] w-full overflow-y-auto">
        <CardHeader>
          <CardTitle>Update Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* ... (other form fields remain unchanged) ... */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Product title"
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
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="99.99"
                />
                {errors.price && (
                  <p className="text-sm text-destructive">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountprice">Discount Price</Label>
                <Input
                  id="discountprice"
                  type="number"
                  step="0.01"
                  {...register("discountprice", { valueAsNumber: true })}
                  placeholder="79.99"
                />
                {errors.discountprice && (
                  <p className="text-sm text-destructive">
                    {errors.discountprice.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discounttag">Discount Tag</Label>
                <Input
                  id="discounttag"
                  {...register("discounttag")}
                  placeholder="20% Off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  {...register("stock", { valueAsNumber: true })}
                  placeholder="1"
                />
                {errors.stock && (
                  <p className="text-sm text-destructive">
                    {errors.stock.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sizes">Sizes</Label>
                <Input
                  id="sizes"
                  {...register("sizes")}
                  placeholder="S, M, L, XL"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="returnpolicy">Return Policy</Label>
                <Input
                  id="returnpolicy"
                  {...register("returnpolicy")}
                  placeholder="30-day return policy"
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
                  placeholder="Detailed product description"
                  className="h-32 w-full rounded-md border px-3 py-2 text-sm"
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  {...register("brand")}
                  placeholder="Brand name"
                />
                {errors.brand && (
                  <p className="text-sm text-destructive">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="availability" {...register("availability")} />
                <Label htmlFor="availability">Available</Label>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Product Images</Label>
                <FileDropzone onDrop={handleImageDrop} />
                <Button
                  type="button"
                  onClick={handleDeleteAllImages}
                  variant="destructive"
                  className="mt-2"
                >
                  Delete All Images
                </Button>
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
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                {errors.categories && (
                  <p className="text-sm text-destructive">
                    {errors.categories.message}
                  </p>
                )}
              </div>
            </div>

            <CardFooter className="px-0">
              <Button type="submit" className="w-full">
                Update Product
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
