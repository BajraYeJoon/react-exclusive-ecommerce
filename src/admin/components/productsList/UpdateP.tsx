import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../../common/lib/axiosInstance";
import { fetchCategories } from "../../../common/api/categoryApi";
import { FileDropzone } from "./file";
import { z } from "zod";
import { Input } from "../../../common/ui/input"; // Assuming Input, Label are defined
import { Label } from "../../../common/ui/label";
import { Button } from "../../../common/ui/button";
import { toast } from "sonner";

const updateProductSchema = z.object({
  title: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().min(0).optional(),
  discountprice: z.number().positive().optional().nullable(),
  sizes: z.string().nullable().optional(),
  returnpolicy: z.string().optional(),
  description: z.string().optional(),
  brand: z.string().optional(),
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
  console.log(imageChanged);

  const form = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: initialData,
  });

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
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Product title"
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="99.99"
              {...form.register("price", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <Label htmlFor="discountprice">Discount Price</Label>
            <Input
              id="discountprice"
              type="number"
              step="0.01"
              placeholder="79.99"
              {...form.register("discountprice", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              placeholder="1"
              {...form.register("stock", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <Label htmlFor="sizes">Sizes</Label>
            <Input
              id="sizes"
              {...form.register("sizes")}
              placeholder="S, M, L, XL"
            />
          </div>

          <div>
            <Label htmlFor="returnpolicy">Return Policy</Label>
            <Input
              id="returnpolicy"
              {...form.register("returnpolicy")}
              placeholder="30-day return policy"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              {...form.register("description")}
              placeholder="Detailed product description"
              className="h-32 w-full rounded border p-2"
            />
          </div>

          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              {...form.register("brand")}
              placeholder="Brand name"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="image">Product Image</Label>
            <FileDropzone
              onDrop={handleImageDrop}
              files={images}
              onRemove={handleImageDelete}
            />
          </div>

          <div className="sm:col-span-2">
            <Label>Categories</Label>
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
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full">
            Update Product
          </Button>
        </div>
      </form>
    </div>
  );
}
