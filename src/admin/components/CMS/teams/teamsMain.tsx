import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { Plus } from "lucide-react";
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
import { EmployeeLoader } from "../../../../common/components/cmsLoader";
import { toast } from "sonner";
import EmployeeForm from "./teamsEdit";
import { TeamsDisplay } from "./teamsDisplay";

export interface Employee {
	id: string;
	name: string;
	position: string;
	image: string;
	twitter?: string;
	linkedin?: string;
}

export interface EmployeeFormInputs {
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
					<TeamsDisplay
						handleDelete={handleDelete}
						handleEdit={handleEdit}
						employees={employees}
					/>
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
