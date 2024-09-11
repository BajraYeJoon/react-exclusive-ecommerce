import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "../../../../common/ui/input";
import { Button } from "../../../../common/ui/button";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function TeamsEdit({ employees, onSave, onCancel }: any) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { employees },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employees",
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newEmployees: any) =>
      axios.put("{{render}}/employee", { employees: newEmployees }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("employees");
      },
    },
  );

  const onSubmit = (data: any) => {
    mutation.mutate(data.employees);
    onSave(data.employees);
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="max-w-fit space-y-2 rounded-md border p-4"
          >
            <Input
              {...register(`employees.${index}.name`, {
                required: "Name is required",
              })}
              placeholder="Name"
            />
            <Input
              {...register(`employees.${index}.position`, {
                required: "Position is required",
              })}
              placeholder="Position"
            />
            <Input
              {...register(`employees.${index}.imgSrc`, {
                required: "Image source is required",
              })}
              placeholder="Image Source"
            />
            <Input
              {...register(`employees.${index}.twitter`)}
              placeholder="Twitter URL"
            />
            <Input
              {...register(`employees.${index}.linkedin`)}
              placeholder="LinkedIn URL"
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              Remove Employee
            </Button>
          </div>
        ))}
        {errors.employees && (
          <p className="text-red-500">All required fields must be filled</p>
        )}
        <div className="mt-4 space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
      <Button
        type="button"
        onClick={() =>
          append({
            id: Date.now().toString(),
            name: "",
            position: "",
            imgSrc: "",
          })
        }
        className="mt-2"
      >
        Add Employee
      </Button>
    </div>
  );
}