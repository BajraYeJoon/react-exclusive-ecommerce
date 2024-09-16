import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../common/api/categoryApi";
import { useForm } from "react-hook-form";
import { Input } from "../../../common/ui/input";
import { FileDropzone } from "./file";
import { Button } from "../../../common/ui/button";
import { Axios } from "../../../common/lib/axiosInstance";
import CategorySelector from "./CategorySelector";

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
  });

  const { register, handleSubmit, setValue, reset, } = useForm({
    defaultValues: {
      title: "",
      price: "",
      // discounttag: "",
      stock: "",
      discountprice: "",
      sizes: "",
      returnpolicy: "",
      description: "",
      brand: "",
      // availability: "",
      categories: "",
      image: [],
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
    setProductImages((prev) => [...prev, ...acceptedFiles]);
  };

  const handleImageRemove = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
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
      console.log("Product created successfully:", response.data);
      reset();
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
    <div className="h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-[900px] space-y-8 overflow-y-scroll"
      >
        <div>
          <label>Product Title</label>
          <Input placeholder="Enter product title" {...register("title")} />
        </div>

        <div>
          <label>Price</label>
          <Input
            type="number"
            placeholder="Enter price"
            {...register("price")}
          />
        </div>

        <div>
          <label>Product Images</label>
          <FileDropzone
            onDrop={handleImageDrop}
            files={productImages}
            onRemove={handleImageRemove}
          />
        </div>

        {/* <div>
          <label>Discount Tag</label>
          <Controller
            name="discounttag"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div> */}

        <div>
          <label>Stock</label>
          <Input
            type="number"
            placeholder="Enter stock quantity"
            {...register("stock")}
          />
        </div>

        <div>
          <label>Discount Price</label>
          <Input
            type="number"
            placeholder="Enter discount price (optional)"
            {...register("discountprice")}
          />
        </div>

        <div>
          <label>Sizes</label>
          <Input
            placeholder="Enter sizes (comma-separated)"
            {...register("sizes")}
          />
        </div>

        <div>
          <label>Return Policy</label>
          <textarea
            placeholder="Enter return policy"
            {...register("returnpolicy")}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            placeholder="Enter product description"
            {...register("description")}
          />
        </div>

        <div>
          <label>Brand</label>
          <Input placeholder="Enter brand name" {...register("brand")} />
        </div>
        {/* 
        <div>
          <label>Availability</label>
          <Controller
            name="availability"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div> */}

        {/* <div>
          <label>Categories</label>
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
        </div> */}
        <div>
          <label>Categories</label>
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        <Button type="submit">Create Product</Button>
      </form>
    </div>
  );
}
