import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";

import { MdCancel, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
import { queryClient } from "../../../common/lib/reactQueryClient";
import { Input } from "../../../common/ui/input";
import { Button } from "../../../user-portal/components";
interface FormValues {
  categoryName: string;
}

const updateCategoryNameSchema = z.object({
  categoryName: z.string().min(1, "Category name is required"),
});

const AddCategoryForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const { data: categories } = useQuery({
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
      toast.error("Failed to update category");
    },
  });

  const handleCategoryDelete = (id: number) => {
    categoryDeleteMutation.mutate(id);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutation.mutate({ name: data.categoryName });
  };

  const updateNameonSubmit = (data: any) => {
    console.log(data);
    if (editCategoryId !== null) {
      handleCategoryEdit.mutate({
        id: editCategoryId,
        name: data.categoryName,
      });
      queryClient.invalidateQueries({ queryKey: ["add"] });
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-fit flex-col items-start space-y-3"
      >
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <Input
            type="text"
            id="categoryName"
            {...register("categoryName", { required: true })}
          />
        </div>
        <Button type="submit" className="w-full">
          Add Category
        </Button>
      </form>

      <div className="">
        <h3 className="mb-2 text-xl font-medium">Your Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category: any) => (
            <Button
              key={category.id}
              variant={"outline"}
              className="group relative"
            >
              {category.name}
              <div className="absolute right-0 top-0 hidden flex-col text-lg group-hover:flex">
                <MdCancel
                  className="group-hover:text-red-600"
                  onClick={() => handleCategoryDelete(category.id)}
                />
                <Dialog>
                  <DialogTrigger onClick={() => setEditCategoryId(category.id)}>
                    <MdEdit className="group-hover:text-red-600" />
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
                                <Input placeholder={category.name} {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name.
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
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
