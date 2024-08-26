import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import Axios from "axios";

interface FormValues {
  categoryName: string;
}

const AddCategoryForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const mutation = useMutation(
    (newCategory: { name: string }) => Axios.post("/category/add", newCategory),
    {
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        console.error("Failed to add category", error);
      },
    },
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate({ name: data.categoryName });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="categoryName">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          {...register("categoryName", { required: true })}
        />
      </div>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
