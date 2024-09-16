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
import { Label } from "../../../../common/ui/label";
import { Input } from "../../../../common/ui/input";
import { ServiceLoader } from "../../../../common/components/cmsLoader";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // URL of the icon image
}

interface ServiceFormInputs {
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

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteServiceMutation.mutate(id);
    }
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span className="hidden sm:block">Delete</span>
                </Button>
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

interface ServiceFormProps {
  onSubmit: SubmitHandler<ServiceFormInputs>;
  editingService?: Service | null;
}

function ServiceForm({ onSubmit, editingService }: ServiceFormProps) {
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
