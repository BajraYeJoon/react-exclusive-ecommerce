import { SubmitHandler, useForm } from "react-hook-form";
import { Employee, EmployeeFormInputs } from "./teamsMain";
import { Label } from "../../../../common/ui/label";
import { Input } from "../../../../common/ui/input";
import { Button } from "../../../../common/ui/button";

interface EmployeeFormProps {
  onSubmit: SubmitHandler<EmployeeFormInputs>;
  editingEmployee?: Employee | null;
}

export default function EmployeeForm({ onSubmit, editingEmployee }: Readonly<EmployeeFormProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EmployeeFormInputs>();
  const imageFile = watch("image");


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          defaultValue={editingEmployee?.name}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          defaultValue={editingEmployee?.position}
          {...register("position", { required: "Position is required" })}
        />
        {errors.position && (
          <p className="text-sm text-red-500">{errors.position.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: editingEmployee ? false : "Image is required",
          })}
        />
        {errors.image && (
          <p className="text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>
      {editingEmployee && !imageFile?.[0] && (
        <div className="mt-2">
          <Label>Current Image</Label>
          <img
            src={editingEmployee.image}
            alt="Current Image"
            className="mt-1 h-20 w-20 rounded-full object-cover"
          />
        </div>
      )}
      {imageFile?.[0] && (
        <div className="mt-2">
          <Label>Image Preview</Label>
          <img
            src={URL.createObjectURL(imageFile[0])}
            alt="Image Preview"
            className="mt-1 h-20 w-20 rounded-full object-cover"
          />
        </div>
      )}
      <div>
        <Label htmlFor="twitter">Twitter URL</Label>
        <Input
          id="twitter"
          defaultValue={editingEmployee?.twitter}
          {...register("twitter")}
        />
      </div>
      <div>
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <Input
          id="linkedin"
          defaultValue={editingEmployee?.linkedin}
          {...register("linkedin")}
        />
      </div>
      <Button type="submit">
        {editingEmployee ? "Update" : "Add"} Employee
      </Button>
    </form>
  );
}
