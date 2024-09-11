import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";

export function FileDropzone() {
  const { setValue, watch } = useFormContext();
  const images = watch("images");

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => URL.createObjectURL(file));
      setValue("images", [...(images || []), ...acceptedFiles]);
    },
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {images && images.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {images.map((file, index) =>
            typeof file === "string" ? (
              <img
                key={index}
                src={file}
                alt={`Product ${index}`}
                className="h-24 w-24 object-cover"
              />
            ) : (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Product ${index}`}
                className="h-24 w-24 object-cover"
              />
            ),
          )}
        </div>
      ) : (
        <p>Drag 'n' drop images here, or click to select</p>
      )}
    </div>
  );
}
