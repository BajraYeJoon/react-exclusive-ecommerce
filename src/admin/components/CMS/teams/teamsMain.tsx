import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Input } from "../../../../common/ui/input";
import { Button } from "../../../../common/ui/button";
import { TeamsDisplay } from "./teamsDisplay";
import { Axios } from "../../../../common/lib/axiosInstance";

export interface Employee {
  id: string;
  name: string;
  position: string;
  image: string;
  twitter?: string;
  linkedin?: string;
}

const fetchEmployees = async () => {
  const { data } = await Axios.get("/employee");
  return data;
};

const addEmployee = async (employee: Employee) => {
  const formData = new FormData();
  formData.append("name", employee.name);
  formData.append("position", employee.position);
  formData.append("image", employee.image);
  if (employee.twitter) formData.append("twitter", employee.twitter);
  if (employee.linkedin) formData.append("linkedin", employee.linkedin);

  await Axios.post(`/employee/${employee.id}`, formData);
};

const updateEmployee = async (employee: Employee) => {
  const formData = new FormData();
  formData.append("name", employee.name);
  formData.append("position", employee.position);
  formData.append("image", employee.image);
  if (employee.twitter) formData.append("twitter", employee.twitter);
  if (employee.linkedin) formData.append("linkedin", employee.linkedin);

  await Axios.patch(`/employee/${employee.id}`, formData);
};

export default function EmployeeManagement() {
  const queryClient = useQueryClient();
  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
  const addMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    const employee = {
      ...data,
      imgSrc: data.image[0], // Handle file input
    };

    if (editingEmployee) {
      updateMutation.mutate({ ...employee, id: editingEmployee.id });
    } else {
      addMutation.mutate(employee);
    }

    setIsEditing(false);
    setEditingEmployee(null);
    reset();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingEmployee(null);
    reset();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("name")}
            placeholder="Name"
            defaultValue={editingEmployee?.name}
          />
          <Input
            {...register("position")}
            placeholder="Position"
            defaultValue={editingEmployee?.position}
          />
          <Input type="file" {...register("image")} accept="image/*" />
          <Input
            {...register("twitter")}
            placeholder="Twitter URL"
            defaultValue={editingEmployee?.twitter}
          />
          <Input
            {...register("linkedin")}
            placeholder="LinkedIn URL"
            defaultValue={editingEmployee?.linkedin}
          />
          <div className="space-x-2">
            <Button type="submit">
              {editingEmployee ? "Update Employee" : "Add Employee"}
            </Button>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <>
          <TeamsDisplay employees={employees} />
          <Button onClick={() => setIsEditing(true)} className="mt-4">
            Edit Employees
          </Button>
        </>
      )}
    </div>
  );
}