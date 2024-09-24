import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../common/ui/dialog";
import { Button } from "../../../common/ui/button";
import { Label } from "../../../common/ui/label";
import { Input } from "../../../common/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../../common/lib/axiosInstance";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const CategoryDialog = () => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();
  const queryClient = useQueryClient();
  const categoryName = watch("categoryName", "");

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
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutation.mutate({ name: data.categoryName });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new product category for your store
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  setValueAs: (value) => value.trim(),
                })}
                className="transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
              />
              {errors.categoryName?.message && (
                <p className="text-sm text-red-500">
                  {String(errors.categoryName.message)}
                </p>
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                {categoryName.length}/50 characters
              </p>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="transition-all duration-200 ease-in-out hover:bg-gray-100"
            >
              <DialogClose>
                Clear
                </DialogClose>
            </Button>
            <Button
              type="submit"
              className="transition-all duration-200 ease-in-out"
            >
              Add Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
