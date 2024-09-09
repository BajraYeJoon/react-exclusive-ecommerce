import { useForm } from "react-hook-form";
import { OurStoryContent } from "./aboutMain";
import { Input } from "../../../../common/ui/input";
import { Button } from "../../../../common/ui/button";

interface OurStoryEditProps {
  content: OurStoryContent;
  onSave: (content: OurStoryContent) => void;
  onCancel: () => void;
}

export function OurStoryEdit({ content, onSave, onCancel }: OurStoryEditProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OurStoryContent>({
    defaultValues: content,
  });

  const onSubmit = (data: OurStoryContent) => {
    onSave(data);
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
          htmlFor="paragraph1"
          className="block text-sm font-medium text-gray-700"
        >
          Paragraph 1
        </label>
        <textarea
          id="paragraph1"
          {...register("paragraph1", { required: "Paragraph 1 is required" })}
          className="mt-1 w-full border"
          rows={4}
        />
        {errors.paragraph1 && (
          <p className="mt-1 text-sm text-red-600">
            {errors.paragraph1.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="paragraph2"
          className="block text-sm font-medium text-gray-700"
        >
          Paragraph 2
        </label>
        <textarea
          id="paragraph2"
          {...register("paragraph2", { required: "Paragraph 2 is required" })}
          className="mt-1 w-full border"
          rows={4}
        />
        {errors.paragraph2 && (
          <p className="mt-1 text-sm text-red-600">
            {errors.paragraph2.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        <Input
          id="imageUrl"
          {...register("imageUrl", { required: "Image URL is required" })}
          className="mt-1"
        />
        {errors.imageUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
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
