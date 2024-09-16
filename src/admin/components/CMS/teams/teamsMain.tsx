import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Pencil, Trash2, Plus, Linkedin, Twitter } from "lucide-react";
import {
  addEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../../../../common/api/cms/employee";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../common/ui/dialog";
import { Button } from "../../../../common/ui/button";
import { Card, CardContent, CardFooter } from "../../../../common/ui/card";
import { Label } from "../../../../common/ui/label";
import { Input } from "../../../../common/ui/input";
import { EmployeeLoader } from "../../../../common/components/cmsLoader";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
export interface Employee {
  id: string;
  name: string;
  position: string;
  image: string;
  twitter?: string;
  linkedin?: string;
}

interface EmployeeFormInputs {
  name: string;
  position: string;
  image: FileList;
  twitter?: string;
  linkedin?: string;
}

export default function EmployeeManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const queryClient = useQueryClient();

  const { data: employeesData, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const employees = employeesData?.data;

  const addMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setIsAddDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee updated successfully");
      setIsEditDialogOpen(false);
      setEditingEmployee(null);
    },
    onError: () => {
      toast.error("Please try again later");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee deleted successfully");
    },
    onError: () => {
      toast.error(
        "There was an error deleting the employee, please try again later",
      );
    },
  });

  const onSubmit: SubmitHandler<EmployeeFormInputs> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("position", data.position);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }
    if (data.twitter) formData.append("twitter", data.twitter);
    if (data.linkedin) formData.append("linkedin", data.linkedin);

    if (editingEmployee) {
      updateMutation.mutate({ id: editingEmployee.id, data: formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-6">
        <h1 className="text-base font-bold md:text-2xl">Employee Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <EmployeeForm onSubmit={onSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <EmployeeLoader />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
            {employees?.map((employee: Employee) => (
              <Card key={employee.id} className="w-full overflow-hidden">
                <CardContent className="flex flex-col p-4 sm:flex-row">
                  <div className="flex flex-col items-start">
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="h-12 w-full object-cover md:h-auto md:w-auto"
                    />
                    <div className="my-2">
                      <h2 className="text-sm font-medium md:text-base">
                        {employee.name}
                      </h2>
                      <p className="text-sm font-light">{employee.position}</p>
                    </div>
                  </div>

                  <CardFooter className="flex flex-row justify-center gap-4 p-0 sm:flex-col md:gap-2">
                    <div className="flex aspect-square h-fit flex-col items-center justify-center gap-2 object-cover sm:flex-row">
                      {employee.twitter && (
                        <Link to={employee.twitter}>
                          <Twitter />
                        </Link>
                      )}
                      {employee.linkedin && (
                        <Link to={employee.linkedin}>
                          <Linkedin />
                        </Link>
                      )}
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(employee)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        <span className="hidden sm:block">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span className="hidden sm:block">Delete</span>
                      </Button>
                    </div>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </div>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Employee</DialogTitle>
              </DialogHeader>
              <EmployeeForm
                onSubmit={onSubmit}
                editingEmployee={editingEmployee}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </section>
  );
}

interface EmployeeFormProps {
  onSubmit: SubmitHandler<EmployeeFormInputs>;
  editingEmployee?: Employee | null;
}

function EmployeeForm({ onSubmit, editingEmployee }: EmployeeFormProps) {
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
