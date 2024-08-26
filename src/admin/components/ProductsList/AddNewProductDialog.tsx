import { useState } from "react";
import { useForm } from "react-hook-form";
import { Axios } from "../../../lib/axiosInstance";
import { Button } from "../../../components";
import { useQuery } from "react-query";
import { fetchCategories } from "../../../api/categoryApi";

const AddNewProductDialog = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery("categories", fetchCategories, {
    select: (categories) => categories.slice(0, 4),
  });

  console.log(categories);
  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const onSubmit = (data) => {
    console.log("form data", data);
    const formData = new FormData();
    // Object.keys(data).forEach((key) => {
    //   if (key === "image") {
    //     formData.append(key, data[key][0]);
    //   } else {
    //     formData.append(key, data[key]);
    //   }
    // });
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    console.log(formData);

    Axios.post("/product/create", formData)
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  setValue("categories", selectedCategories.join(","));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-6 text-xl font-semibold lg:text-2xl">
        Add New Product
      </h1>

      {step === 1 && (
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label>Title</label>
            <input
              {...register("title")}
              placeholder="JBL earphone"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="text"
              {...register("price")}
              placeholder="10.15"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label>Image</label>
            <input
              type="file"
              {...register("image")}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label>Discount Tag</label>
            <input
              type="text"
              {...register("discounttag")}
              placeholder="false"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label>Rating</label>
            <input
              type="text"
              {...register("rating")}
              placeholder="3"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label>Discount Price</label>
            <input
              type="text"
              {...register("discountprice")}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label>Sizes</label>
            <input
              type="text"
              {...register("sizes")}
              placeholder="l"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label>Return Policy</label>
            <input
              type="text"
              {...register("returnpolicy")}
              placeholder="45 days return policy"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              {...register("description")}
              placeholder="A timeless bluetooth earphone that never goes out of style."
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label>Brand</label>
            <input
              type="text"
              {...register("brand")}
              placeholder="JBL"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label>Availability</label>
            <input
              type="text"
              {...register("availability")}
              placeholder="true"
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            />
          </div>
          <div>
            <label>Categories</label>
            <div className="mt-2 h-fit w-full rounded-md bg-gray-100 px-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`m-1 rounded p-2 ${selectedCategories.includes(category.id) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <input type="hidden" {...register("categories")} />
          </div>
        </div>
      )}

      <div className="mt-5 flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
        )}
        {step < 2 && (
          <Button variant="secondary" onClick={nextStep}>
            Next
          </Button>
        )}
        {step === 2 && <Button variant="default">Create</Button>}
      </div>
    </form>
  );
};

export default AddNewProductDialog;
