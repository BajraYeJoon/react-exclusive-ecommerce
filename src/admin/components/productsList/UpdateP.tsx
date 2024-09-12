import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../../common/lib/axiosInstance";
import { fetchCategories } from "../../../common/api/categoryApi";

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

const updateProductSchema = z.object({
  title: z.string().optional(),
  price: z.number().positive().optional(),
  discounttag: z.boolean().optional(),
  stock: z.number().optional(),
  discountprice: z.number().positive().optional(),
  sizes: z.string().nullable().optional(),
  returnpolicy: z.string().optional(),
  description: z.string().optional(),
  brand: z.string().optional(),
  availability: z.boolean().optional(),
  image: z.array(z.any()).optional(),
});

type UpdateProductFormData = z.infer<typeof updateProductSchema>;

interface UpdateProductFormProps {
  initialData: Partial<UpdateProductFormData> & {
    id: string;
    images: string[];
    categories: { id: number; name: string }[];
  };
}

export default function UpdateProductForm({
  initialData,
}: UpdateProductFormProps) {
  const queryClient = useQueryClient();
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    initialData.categories?.map((cat) => cat.id) || [],
  );
  const [images, setImages] = useState<Array<string | File>>(
    initialData.images || [],
  );

  const { control, handleSubmit, watch } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: initialData,
  });

  const formValues = watch();

  console.log(initialData, "intitalk datas");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const updateProductMutation = useMutation({
    mutationFn: (data: Partial<UpdateProductFormData>) =>
      Axios.patch(`/product/${initialData.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", initialData.id] });
    },
  });

  const addImageMutation = useMutation({
    mutationFn: (formData: FormData) =>
      Axios.patch(`/product/addimage/${initialData.id}`, formData),
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
    onError: (error: any) => {
      console.error("Failed to delete image", error);
    },
  });

  useEffect(() => {
    setImages(initialData.images || []);
  }, [initialData.images]);

  const handleImageDrop = async (acceptedFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("image", file);
      await addImageMutation.mutateAsync(formData);
    }
  };

  const handleImageDelete = async (index: number) => {
    const imageToDelete = images[index];
    if (typeof imageToDelete === "string") {
      await deleteImageMutation.mutate(imageToDelete);
    }
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  // const getChangedValues = (
  //   currentValues: UpdateProductFormData,
  // ): Partial<UpdateProductFormData> => {
  //   const changedValues: Partial<UpdateProductFormData> = {};

  //   Object.keys(currentValues).forEach((key) => {
  //     const typedKey = key as keyof UpdateProductFormData;
  //     if (currentValues[typedKey] !== initialData[typedKey]) {
  //       changedValues[typedKey] = currentValues[typedKey];
  //     }
  //   });

  //   // Check if categories have changed
  //   if (
  //     JSON.stringify(selectedCategories) !==
  //     JSON.stringify(initialData.categories?.map((cat) => cat.id))
  //   ) {
  //     changedValues.categories = selectedCategories;
  //   }

  //   return changedValues;
  // };

  const onSubmit = async (data: UpdateProductFormData) => {
    // const changedValues = getChangedValues(data);
    // if (Object.keys(changedValues).length > 0) {
    await updateProductMutation.mutateAsync(data);
    // } else {
    //   console.log("No changes detected");
    // }
  };

  return (
    <Card className="h-[calc(100vh-4rem)] w-full overflow-y-auto">
      <CardHeader>
        <CardTitle>Update Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...field} placeholder="Product title" />
                </div>
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    placeholder="99.99"
                  />
                </div>
              )}
            />

            <Controller
              name="discountprice"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="discountprice">Discount Price</Label>
                  <Input
                    id="discountprice"
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    placeholder="79.99"
                  />
                </div>
              )}
            />

            <Controller
              name="discounttag"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="discounttag">Discount Tag</Label>
                  <Checkbox
                    id="discounttag"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />

            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    placeholder="1"
                  />
                </div>
              )}
            />

            <Controller
              name="sizes"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="sizes">Sizes</Label>
                  <Input id="sizes" {...field} placeholder="S, M, L, XL" />
                </div>
              )}
            />

            <Controller
              name="returnpolicy"
              control={control}
              render={({ field }) => (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="returnpolicy">Return Policy</Label>
                  <Input
                    id="returnpolicy"
                    {...field}
                    placeholder="30-day return policy"
                  />
                </div>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    {...field}
                    placeholder="Detailed product description"
                    className="h-32 w-full rounded-md border px-3 py-2 text-sm"
                  />
                </div>
              )}
            />

            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" {...field} placeholder="Brand name" />
                </div>
              )}
            />

            <Controller
              name="availability"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="availability"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="availability">Available</Label>
                </div>
              )}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="image">Product Image</Label>
                  <FileDropzone
                    onDrop={handleImageDrop}
                    files={field.value || images}
                    onRemove={handleImageDelete}
                  />
                </div>
              )}
            />
            {/* <div className="space-y-2 sm:col-span-2">
              <Label>Product Images</Label>
              <FileDropzone
                onDrop={handleImageDrop}
                files={images}
                onRemove={handleImageDelete}
              />
            </div> */}

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
  );
}
