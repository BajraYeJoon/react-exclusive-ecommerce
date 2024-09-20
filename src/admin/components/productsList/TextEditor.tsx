import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "../../../common/ui/label";

const ProductDescriptionEditor = ({ setValue, register, errors }: any) => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value: any) => {
    setDescription(value);
    setValue("description", value);
  };

  useEffect(() => {
    register("description", {
      required: "This field is required",
    });
  }, [register]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="">
      <Label className="mb-1 block h-fit font-medium">
        Product Description
      </Label>
      <div className="h-[300px] overflow-y-auto">
        <ReactQuill
          value={description}
          onChange={handleDescriptionChange}
          className="overscroll-y-auto rounded border p-2"
          placeholder="Enter detailed product description"
          theme="snow" // Snow is a basic theme, you can customize it or use 'bubble'
          modules={modules} // Use the custom toolbar
          formats={formats} // Define the formats allowed
        />
      </div>

      {errors.description && (
        <p className="mt-1 text-sm text-primary">
          {errors.description.message}
        </p>
      )}
    </div>
  );
};

export default ProductDescriptionEditor;
