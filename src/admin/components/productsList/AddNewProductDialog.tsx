import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../common/api/categoryApi";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../common/ui/form";
import { Input } from "../../../common/ui/input";
import { FileDropzone } from "./file";
import { Checkbox } from "../../../common/ui/checkbox";
import { Switch } from "../../../common/ui/switch";
import { Button } from "../../../common/ui/button";
import { Axios } from "../../../common/lib/axiosInstance";

const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  image: z.array(z.any()).optional(),
  discounttag: z.boolean().optional(),
  stock: z.coerce.number().int().positive("Stock must be a positive integer"),
  discountprice: z.number().nullable().optional(),
  sizes: z.string().nullable().optional(),
  returnpolicy: z.string().min(1, "Return policy is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  availability: z.boolean().optional(),
  categories: z.string(),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

export default function AddNewProductDialog() {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    select: (categories) => categories.slice(0, 4),
  });

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      price: 0,
      discounttag: false,
      stock: 0,
      discountprice: null,
      sizes: null,
      returnpolicy: "",
      description: "",
      brand: "",
      availability: true,
    },
  });
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      const updatedCategories = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId];
      form.setValue("categories", updatedCategories.join(","));
      return updatedCategories;
    });
  };

  const handleImageDrop = (acceptedFiles: File[]) => {
    setProductImages((prev) => [...prev, ...acceptedFiles]);
    form.setValue("image", acceptedFiles);
  };

  const handleImageRemove = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    form.setValue(
      "image",
      productImages.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data: CreateProductFormData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        productImages.forEach((image) => {
          formData.append("image", image);
        });
      } else if (value !== null) {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await Axios.post("/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Product created successfully:", response.data);
      form.reset();
      setProductImages([]);
      setSelectedCategories([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
      }
    }
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <div className="h-fll">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-[200px] space-y-8 overflow-y-scroll"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <FileDropzone
                    onDrop={handleImageDrop}
                    files={productImages}
                    onRemove={handleImageRemove}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discounttag"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Discount Tag</FormLabel>
                  <FormDescription>
                    Check if this product has a discount
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter stock quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discountprice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter discount price (optional)"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter sizes (comma-separated)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="returnpolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Return Policy</FormLabel>
                <FormControl>
                  <textarea placeholder="Enter return policy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Enter product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Availability</FormLabel>
                  <FormDescription>
                    Set the product availability status
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Categories</FormLabel>
                <FormControl>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Create Product</Button>
        </form>
      </Form>
    </div>
  );
}
