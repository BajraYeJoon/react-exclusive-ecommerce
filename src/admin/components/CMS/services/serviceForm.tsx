import { SubmitHandler, useForm } from "react-hook-form";
import { Service, ServiceFormInputs } from "./serviceMain";
import { Label } from "../../../../common/ui/label";
import { Input } from "../../../../common/ui/input";
import { Button } from "../../../../common/ui/button";

interface ServiceFormProps {
  onSubmit: SubmitHandler<ServiceFormInputs>;
  editingService?: Service | null;
}

export default function ServiceForm({
  onSubmit,
  editingService,
}: Readonly<ServiceFormProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ServiceFormInputs>();
  const iconFile = watch("icon");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          defaultValue={editingService?.title}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          defaultValue={editingService?.description}
          {...register("description", { required: "Description is required" })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm sm:text-base"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="icon">Icon</Label>
        <Input
          id="icon"
          type="file"
          accept="image/*"
          {...register("icon", {
            required: editingService ? false : "Icon is required",
          })}
        />
        {errors.icon && (
          <p className="text-sm text-red-500">{errors.icon.message}</p>
        )}
      </div>
      {editingService && !iconFile?.[0] && (
        <div className="mt-2">
          <Label>Current Icon</Label>
          <img
            src={editingService.icon}
            alt="Current Icon"
            className="mt-1 h-20 w-20 rounded-full object-cover"
          />
        </div>
      )}
      {iconFile?.[0] && (
        <div className="mt-2">
          <Label>Icon Preview</Label>
          <img
            src={URL.createObjectURL(iconFile[0])}
            alt="Icon Preview"
            className="mt-1 h-20 w-20 rounded-full object-cover"
          />
        </div>
      )}
      <Button type="submit">{editingService ? "Update" : "Add"} Service</Button>
    </form>
  );
}
