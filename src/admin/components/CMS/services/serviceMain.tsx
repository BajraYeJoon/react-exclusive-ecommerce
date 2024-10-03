import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
	addService,
	deleteService,
	fetchServices,
	updateService,
} from "../../../../common/api/cms/services";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../../../common/ui/dialog";
import { Button } from "../../../../common/ui/button";
import { Card, CardContent, CardFooter } from "../../../../common/ui/card";
import { ServiceLoader } from "../../../../common/components/cmsLoader";
import { toast } from "sonner";
import ConfirmationDialog from "../../confirmation/ConfirmationDialog";
import ServiceForm from "./serviceForm";

export interface Service {
	id: string;
	title: string;
	description: string;
	icon: string;
}

export interface ServiceFormInputs {
	title: string;
	description: string;
	icon: FileList;
}

export default function ServiceManagement() {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [editingService, setEditingService] = useState<Service | null>(null);
	const queryClient = useQueryClient();
	const { reset, setValue } = useForm<ServiceFormInputs>();

	const { data: servicesData, isLoading } = useQuery({
		queryKey: ["services"],
		queryFn: fetchServices,
	});

	const services = servicesData?.data;

	const addServiceMutation = useMutation({
		mutationFn: addService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["services"] });
			toast.success("Service added successfully");
			setIsAddDialogOpen(false);
			reset();
		},
	});

	const updateServiceMutation = useMutation({
		mutationFn: updateService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["services"] });
			setIsEditDialogOpen(false);
			setEditingService(null);
			reset();
		},
	});

	const deleteServiceMutation = useMutation({
		mutationFn: deleteService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["services"] });
			toast.success("Service deleted successfully");
		},
	});

	const onSubmit: SubmitHandler<ServiceFormInputs> = (data) => {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		if (data.icon[0]) {
			formData.append("icon", data.icon[0]);
		}

		if (editingService) {
			formData.append("id", editingService.id);
			updateServiceMutation.mutate(formData);
		} else {
			addServiceMutation.mutate(formData);
		}
	};

	const handleEdit = (service: Service) => {
		setEditingService(service);
		setValue("title", service.title);
		setValue("description", service.description);
		setIsEditDialogOpen(true);
	};

	// if (error)
	//   return <div>Error loading services: {(error as Error).message}</div>;

	return (
		<section>
			<div className="mb-6 flex items-center justify-between gap-12">
				<h1 className="text-sm font-bold md:text-2xl">Services Management</h1>
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 h-4 w-4" /> Add New Service
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Service</DialogTitle>
						</DialogHeader>
						<ServiceForm onSubmit={onSubmit} />
					</DialogContent>
				</Dialog>
			</div>
			{isLoading ? (
				<ServiceLoader />
			) : (
				<div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
					{services?.map((service: Service) => (
						<Card key={service.id} className="overflow-hidden">
							<CardContent className="p-4">
								<div className="mb-2 flex flex-col items-center gap-3 md:mb-4 md:flex-row">
									<img
										src={service.icon}
										alt={service.title}
										className="mr-4 h-12 w-12 rounded-full object-cover"
									/>
									<h2 className="text-xs font-medium md:text-xl">
										{service.title}
									</h2>
								</div>
								<p className="text-[11px] text-gray-600 md:text-base">
									{service.description}
								</p>
							</CardContent>
							<CardFooter className="flex flex-row justify-end gap-2 bg-gray-50 p-4 md:space-x-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleEdit(service)}
								>
									<Pencil className="mr-2 h-4 w-4" />
									<span className="hidden sm:block">Edit</span>
								</Button>

								<ConfirmationDialog
									triggerText={
										<>
											<Trash2 className="mr-2 h-4 w-4" />
											<span className="hidden sm:block">Delete</span>
										</>
									}
									title="Delete Service"
									description="Are you sure you want to delete this service?"
									onConfirm={() => deleteServiceMutation.mutate(service.id)}
									confirmText="Delete"
									cancelText="No"
								/>
							</CardFooter>
						</Card>
					))}
				</div>
			)}

			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Service</DialogTitle>
					</DialogHeader>
					<ServiceForm onSubmit={onSubmit} editingService={editingService} />
				</DialogContent>
			</Dialog>
		</section>
	);
}
