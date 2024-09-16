import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Axios } from "../../../common/lib/axiosInstance";
import { fetchCategories } from "../../../common/api/categoryApi";


import { FileDropzone } from "./file";
import CategorySelector from "./CategorySelector";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../common/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../common/ui/tabs";
import { Input } from "../../../common/ui/input";
import { Textarea } from "../../../common/ui/textarea";
import { Button } from "../../../common/ui/button";

const steps = [
  { id: "basic-info", title: "Basic Info" },
  { id: "pricing", title: "Pricing" },
  { id: "details", title: "Details" },
  { id: "images", title: "Images" },
  { id: "categories", title: "Categories" },
];

export default function AddNewProductDialog() {
  const [currentStep, setCurrentStep] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { register, handleSubmit, setValue, reset } = useForm({
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
      image: [],
    },
  });

  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      const updatedCategories = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId];
      setValue("categories", updatedCategories.join(","));
      return updatedCategories;
    });
  };

  const handleImageDrop = (acceptedFiles) => {
    setProductImages((prev) => [...prev, ...acceptedFiles]);
  };

  const handleImageRemove = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
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
      setCurrentStep(0);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs value={steps[currentStep].id} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {steps.map((step, index) => (
                <TabsTrigger
                  key={step.id}
                  value={step.id}
                  disabled={index !== currentStep}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="basic-info" className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Product Title</label>
                  <Input placeholder="Enter product title" {...register("title")} />
                </div>
                <div>
                  <label className="block mb-1">Brand</label>
                  <Input placeholder="Enter brand name" {...register("brand")} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="pricing" className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Price</label>
                  <Input type="number" placeholder="Enter price" {...register("price")} />
                </div>
                <div>
                  <label className="block mb-1">Discount Price</label>
                  <Input type="number" placeholder="Enter discount price (optional)" {...register("discountprice")} />
                </div>
                <div>
                  <label className="block mb-1">Stock</label>
                  <Input type="number" placeholder="Enter stock quantity" {...register("stock")} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Sizes</label>
                  <Input placeholder="Enter sizes (comma-separated)" {...register("sizes")} />
                </div>
                <div>
                  <label className="block mb-1">Return Policy</label>
                  <Textarea placeholder="Enter return policy" {...register("returnpolicy")} />
                </div>
                <div>
                  <label className="block mb-1">Description</label>
                  <Textarea placeholder="Enter product description" {...register("description")} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="images" className="mt-4">
              <div>
                <label className="block mb-1">Product Images</label>
                <FileDropzone
                  onDrop={handleImageDrop}
                  files={productImages}
                  onRemove={handleImageRemove}
                />
              </div>
            </TabsContent>
            <TabsContent value="categories" className="mt-4">
              <div>
                <label className="block mb-1">Categories</label>
                <CategorySelector
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onCategorySelect={handleCategorySelect}
                />
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 0}>
          Previous
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        ) : (
          <Button onClick={nextStep}>Next</Button>
        )}
      </CardFooter>
    </Card>
  );
}