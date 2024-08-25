import { useForm } from "react-hook-form";
import { Axios } from "../../../lib/axiosInstance";

const AddNewProductDialog = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register("title")} defaultValue="JBL earphone" />
      </div>
      <div>
        <label>Price</label>
        <input type="text" {...register("price")} defaultValue="10.15" />
      </div>
      <div>
        <label>Image</label>
        <input type="file" {...register("image")} />
      </div>
      <div>
        <label>Discount Tag</label>
        <input type="text" {...register("discounttag")} defaultValue="false" />
      </div>
      <div>
        <label>Rating</label>
        <input type="text" {...register("rating")} defaultValue="3" />
      </div>
      <div>
        <label>Discount Price</label>
        <input type="text" {...register("discountprice")} />
      </div>
      <div>
        <label>Sizes</label>
        <input type="text" {...register("sizes")} defaultValue="l" />
      </div>
      <div>
        <label>Return Policy</label>
        <input
          type="text"
          {...register("returnpolicy")}
          defaultValue="45 days return policy"
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          {...register("description")}
          defaultValue="A timeless bluetooth earphone that never goes out of style."
        />
      </div>
      <div>
        <label>Brand</label>
        <input type="text" {...register("brand")} defaultValue="JBL" />
      </div>
      <div>
        <label>Availability</label>
        <input type="text" {...register("availability")} defaultValue="true" />
      </div>
      <div>
        <label>Categories</label>
        <input type="text" {...register("categories")} defaultValue="12,18" />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddNewProductDialog;
