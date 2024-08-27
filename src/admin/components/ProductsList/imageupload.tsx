import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function Previews({ register }) {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div
      className="mb-2 mr-2 box-border inline-flex h-24 w-24 rounded border border-gray-300 p-1"
      key={file.name}
    >
      <div className="flex min-w-0 overflow-hidden">
        <img
          src={(file as any).preview}
          className="block h-full w-auto"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL((file as any).preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file) => URL.revokeObjectURL((file as any).preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input
          type="file"
          {...getInputProps()}
          {...register("image")}
          className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
        />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className="mt-4 flex flex-row flex-wrap">{thumbs}</aside>
    </section>
  );
}

export default Previews;
