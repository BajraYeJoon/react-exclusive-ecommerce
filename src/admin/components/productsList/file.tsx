import { useDropzone } from "react-dropzone";
import { Button } from "../../../common/ui/button";

interface FileDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  files: Array<string | File>;
  onRemove: (index: number) => void;
}

export function FileDropzone({ onDrop, files, onRemove }: FileDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400"
      >
        <input {...getInputProps()} type="file" />
        <p>Drag 'n' drop images here, or click to select</p>
      </div>
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {files.map((file, index) => (
            <div key={index} className="group relative">
              <img
                src={
                  typeof file === "string"
                    ? file
                    : URL.createObjectURL(file as File)
                }
                alt={`Product ${index}`}
                className="h-24 w-24 rounded-md object-cover"
              />
              <Button
                type="button"
                onClick={() => {
                  onRemove(index);
                }}
                variant="destructive"
                size="sm"
                className="absolute right-0 top-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
