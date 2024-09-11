import { useForm } from "react-hook-form";
import { OurStoryContent } from "./aboutMain";
import { Input } from "../../../../common/ui/input";
import { Button } from "../../../../common/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAbout } from "../../../../common/api/cms/about";

interface OurStoryEditProps {
  content: OurStoryContent;
  onSave: (content: OurStoryContent) => void;
  onCancel: () => void;
}

export function OurStoryEdit({ content, onCancel }: OurStoryEditProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OurStoryContent>({
    defaultValues: content,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAbout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      onCancel(); // Close the edit form on success
    },
  });

  const onSubmit = (data: OurStoryContent) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          className="mt-1"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="paragraph"
          className="block text-sm font-medium text-gray-700"
        >
          Paragraph 2
        </label>
        <textarea
          id="paragraph"
          {...register("body", { required: "Paragraph 2 is required" })}
          className="mt-1 w-full border"
          rows={4}
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        {content.image ? (
          <div className="mt-1">
            <img
              src={content.image}
              alt="Current Image"
              className="mb-2 h-12 w-12"
            />
            <input
              type="file"
              id="imageUrl"
              {...register("image")}
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
            />
          </div>
        ) : (
          <input
            type="file"
            id="imageUrl"
            {...register("image")}
            className="mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
          />
        )}
        {errors.image && (
          <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}