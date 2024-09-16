import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../../common/lib/axiosInstance";
import { fetchCategories } from "../../../common/api/categoryApi";
import { FileDropzone } from "./file";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
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
import { Checkbox } from "../../../common/ui/checkbox";
import { Button } from "../../../common/ui/button";
import { toast } from "sonner";

const updateProductSchema = z.object({
  title: z.string().optional(),
  price: z.number().positive().optional(),
  discounttag: z.boolean().nullable().optional(),
  stock: z.number().min(0).optional(),
  discountprice: z.number().positive().optional().nullable(),
  sizes: z.string().nullable().optional(),
  returnpolicy: z.string().optional(),
  description: z.string().optional(),
  brand: z.string().optional(),
  availability: z.boolean().nullable().optional(),
  image: z.array(z.any()).optional(),
});

type UpdateProductFormData = z.infer<typeof updateProductSchema>;

interface Category {
  id: number;
  name: string;
}

interface UpdateProductFormProps {
  initialData: Partial<UpdateProductFormData> & {
    id: string;
    images: string[];
    categories: Category[];
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
  const [imageChanged, setImageChanged] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log(imageChanged);

  const form = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: initialData,
  });

  console.log(form.formState.errors, "formerrs");

  const { data: categories = [] } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const updateProductMutation = useMutation({
    mutationFn: (data: Partial<UpdateProductFormData>) =>
      Axios.patch(`/product/${initialData.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
      setIsDialogOpen(true); // Open the dialog on success
    },
  });

  const addImageMutation = useMutation({
    mutationFn: (formData: FormData) =>
      Axios.patch(`/product/addimage/${initialData.id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
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
    setImages(initialData.images || []);
  }, [initialData.images]);

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
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setImageChanged(true);
    } catch (error) {
      console.error("Failed to delete image", error);
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
    await updateProductMutation.mutate(data);
    setImageChanged(false);
  };

  return (
    <>
      <Card className="h-[calc(100vh-4rem)] w-full overflow-y-auto">
        <CardHeader>
          <CardTitle>Update Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Product title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="99.99"
                          {...field}
                          onChange={(e: any) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountprice"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Discount Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="79.99"
                          {...field}
                          onChange={(e: any) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? null : parseFloat(value),
                            );
                          }}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discounttag"
                  render={({ field }: any) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value ?? false}
                          onCheckedChange={(checked: any) =>
                            field.onChange(checked ?? null)
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Discount Tag</FormLabel>
                        <FormDescription>
                          Apply a discount tag to this product
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          {...field}
                          onChange={(e: any) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Sizes</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="S, M, L, XL"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnpolicy"
                  render={({ field }: any) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Return Policy</FormLabel>
                      <FormControl>
                        <Input placeholder="30-day return policy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }: any) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Detailed product description"
                          className="h-32 w-full rounded border p-2"
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
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input placeholder="Brand name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }: any) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value ?? false}
                          onCheckedChange={(checked: any) =>
                            field.onChange(checked ?? null)
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Available</FormLabel>
                        <FormDescription>
                          Is this product currently available?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }: any) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Product Image</FormLabel>
                      <FormControl>
                        <FileDropzone
                          onDrop={handleImageDrop}
                          files={field.value || images}
                          onRemove={handleImageDelete}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="sm:col-span-2">
                  <FormLabel>Categories</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category: Category) => (
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
                </FormItem>
              </div>

              <CardFooter className="px-0">
                <Button type="submit" className="w-full">
                  Update Product
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white p-6 shadow-lg">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Product Updated
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                The product has been updated successfully.
              </p>
            </div>
            <div className="mt-4">
              <Button type="button" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
