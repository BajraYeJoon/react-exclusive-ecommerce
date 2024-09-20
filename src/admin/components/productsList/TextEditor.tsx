import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "../../../common/ui/label";

const ProductDescriptionEditor = ({ setValue, register, errors }: any) => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value: any) => {
    setDescription(value);
    setValue("description", value);
  };

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
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
  ];

  return (
    <div className="">
      <Label className="mb-1 block h-fit font-medium">
        Product Description
      </Label>
      <div className="h-[300px] overflow-y-auto">
        <ReactQuill
          {...register("description", { required: "Description is required" })}
          value={description}
          onChange={handleDescriptionChange}
          className="overscroll-y-auto rounded border p-2"
          placeholder="Enter detailed product description"
          theme="snow"
          modules={modules}
          formats={formats}
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
