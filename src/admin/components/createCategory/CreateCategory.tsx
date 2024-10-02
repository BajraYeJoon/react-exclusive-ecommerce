import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
import { Input } from "../../../common/ui/input";
import { Button } from "../../../common/ui/button";

import { Skeleton } from "../../../common/ui/skeleton";
import uuidv4 from "../../../common/lib/utils/uuid";
import { Link } from "react-router-dom";
import { CategoryDialog } from "./categoryDialog";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";


const updateCategoryNameSchema = z.object({
  categoryName: z.string().min(1, "Category name is required"),
});

export const AddCategoryForm = () => {
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["add"],
    queryFn: fetchCategories,
  });
  const form = useForm({
    resolver: zodResolver(updateCategoryNameSchema),
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

  const updateNameonSubmit = (data: any) => {
    if (editCategoryId !== null) {
      handleCategoryEdit.mutate({
        id: editCategoryId,
        name: data.categoryName,
      });
      queryClient.invalidateQueries({ queryKey: ["add"] });
    }
  };

  return (
    <div className="mx-6 flex flex-col space-y-8">
      <CategoryDialog />

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
              {categories?.map((category: { id: number; name: string }) => (
                <div
                  key={category.id}
                  className="group relative rounded-md border border-foreground/15 px-4 py-3"
                >
                  <Link to={`/admin/products?category=${category.name}`}>
                    {category.name}
                  </Link>
                  <div className="absolute right-0 top-0 hidden flex-col text-lg group-hover:flex">
                    <ConfirmationDialog
                      triggerComponent={
                        <>
                          <MdCancel className="group-hover:text-primary" />
                        </>
                      }
                      onConfirm={() => handleCategoryDelete(category.id)}
                      title="Are you sure you want to remove this Category?"
                      description="It will remove all the products as well."
                      confirmText="Yes"
                      cancelText="No"
                    />

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
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

