import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Axios } from "../../../lib/axiosInstance";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components";
import { toast } from "sonner";
import { fetchCategories } from "../../../api/categoryApi";
interface FormValues {
  categoryName: string;
}

const AddCategoryForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { data: categories } = useQuery("categories", fetchCategories);

  const mutation = useMutation(
    (newCategory: { name: string }) => Axios.post("/category/add", newCategory),
    {
      onSuccess: (data) => {
        reset();
        toast.success(`Category with name added successfully`);
      },
      onError: (error) => {
        console.error("Failed to add category", error);
        toast.error("Failed to add category");
      },
    },
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate({ name: data.categoryName });
  };

  return (
    <div className="flex flex-col space-y-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <Input
            type="text"
            id="categoryName"
            {...register("categoryName", { required: true })}
          />
        </div>
        <Button type="submit">Add Category</Button>
      </form>

      <div>
        <h3>Your Categories</h3>
        {categories?.map((category: any) => (
          <Button key={category.id}>{category.name}</Button>
        ))}
      </div>
    </div>
  );
};

export default AddCategoryForm;