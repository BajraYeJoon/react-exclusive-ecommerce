import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { MdCancel, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../common/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../common/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { fetchCategories } from "../../../common/api/categoryApi";
import { Axios } from "../../../common/lib/axiosInstance";
import { Input } from "../../../common/ui/input";
import { Button } from "../../../common/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { Label } from "../../../common/ui/label";
import { Skeleton } from "../../../common/ui/skeleton";
import uuidv4 from "../../../common/lib/utils/uuid";

interface FormValues {
  categoryName: string;
}

const updateCategoryNameSchema = z.object({
  categoryName: z.string().min(1, "Category name is required"),
});

const AddCategoryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["add"],
    queryFn: fetchCategories,
  });
  const form = useForm({
    resolver: zodResolver(updateCategoryNameSchema),
  });

  const mutation = useMutation({
    mutationFn: (newCategory: { name: string }) =>
      Axios.post("/category/add", newCategory),

    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["add"] });
      toast.success(`Category with name added successfully`);
    },
    onError: (error) => {
      console.error("Failed to add category", error);
      toast.error("Failed to add category");
    },
  });

  const categoryDeleteMutation = useMutation({
    mutationFn: (id: number) => Axios.delete(`/category/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["add"] });
      toast.success(`Category deleted successfully`);
    },
    onError: (error) => {
      toast.error("Failed to delete category, Please try again later");
      console.error("Failed to delete category", error);
    },
  });

  const handleCategoryEdit = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      Axios.patch(`/category/update/${id}`, { name }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["add"] });
      toast.success(`Category updated successfully`);
    },
    onError: (error) => {
      console.error("Failed to update category", error);
      toast.error("Failed to update category, Please try again later");
    },
  });

  const handleCategoryDelete = (id: number) => {
    categoryDeleteMutation.mutate(id);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutation.mutate({ name: data.categoryName });
  };

  const updateNameonSubmit = (data: any) => {
    if (editCategoryId !== null) {
      handleCategoryEdit.mutate({
        id: editCategoryId,
        name: data.categoryName,
      });
      queryClient.invalidateQueries({ queryKey: ["add"] });
    }
  };

  const categoryName = watch("categoryName", "");

  return (
    <div className="mx-6 flex flex-col space-y-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
          <CardDescription>
            Create a new product category for your store
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  type="text"
                  id="categoryName"
                  placeholder="Enter category name"
                  {...register("categoryName", {
                    required: "Category name is required",
                    maxLength: {
                      value: 50,
                      message: "Category name must be 50 characters or less",
                    },
                  })}
                  className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
                />
                {errors.categoryName && (
                  <p className="text-sm text-red-500">
                    {errors.categoryName.message}
                  </p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  {categoryName.length}/50 characters
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="transition-all duration-200 ease-in-out hover:bg-gray-100"
            >
              Clear
            </Button>
            <Button
              type="submit"
              className="transition-all duration-200 ease-in-out"
            >
              Add Category
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="">
        <h3 className="mb-2 text-xl font-medium">Your Categories</h3>
        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            <>
              {Array.from({ length: 12 }).map(() => (
                <Skeleton className="h-12 w-40" key={uuidv4()} />
              ))}
            </>
          ) : (
            <>
              {categories?.map((category: any) => (
                <Button
                  key={category.id}
                  variant={"outline"}
                  className="group relative"
                >
                  {category.name}
                  <div className="absolute right-0 top-0 hidden flex-col text-lg group-hover:flex">
                    <Dialog>
                      <DialogTrigger>
                        <MdCancel className="group-hover:text-primary" />
                      </DialogTrigger>
                      <DialogContent className="flex flex-col items-center justify-center gap-4">
                        <DialogHeader>
                          Are you sure you want to remove this Category?
                        </DialogHeader>
                        <DialogTitle className="text-sm font-medium">
                          It will remove all the products as well.{" "}
                          <span className="text-primary">*</span>
                        </DialogTitle>
                        <DialogDescription className="space-x-2">
                          <Button
                            variant={"destructive"}
                            onClick={() => handleCategoryDelete(category.id)}
                          >
                            Yes
                          </Button>
                          <Button variant={"secondary"}>
                            <DialogClose>No</DialogClose>
                          </Button>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger
                        onClick={() => setEditCategoryId(category.id)}
                      >
                        <MdEdit className="group-hover:text-primary" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>Edit Category</DialogHeader>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(updateNameonSubmit)}
                            className="space-y-8"
                          >
                            <FormField
                              control={form.control}
                              name="categoryName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={category.name}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    This will be the new category name
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">Submit</Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
