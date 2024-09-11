import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Check,
  Headphones,
  Package,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";

import { Card, CardContent } from "../../../../common/ui/card";
import { Input } from "../../../../common/ui/input";
import { Button } from "../../../../common/ui/button";
import { addService, fetchServices } from "../../../../common/api/cms/services";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  CiDeliveryTruck,
  Package,
  Headphones,
  Plus,
};

const ServiceMain = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newService, setNewService] = useState<Omit<Service, "id"> | null>(
    null,
  );
  const queryClient = useQueryClient();

  const {
    data: servicesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const services = servicesData?.data;
  console.log(services, "services");

  const addServiceMutation = useMutation({
    mutationFn: addService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setNewService(null);
    },
  });

  // const updateServiceMutation = useMutation({
  //   mutationFn: updateService,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["services"] });
  //     setEditingId(null);
  //   },
  // });

  // const deleteServiceMutation = useMutation({
  //   mutationFn: deleteService,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["services"] });
  //   },
  // });

  // const handleSave = (id: number, updatedService: FormData) => {
  //   updateServiceMutation.mutate({ id, ...Object.fromEntries(updatedService) });
  // };

  const handleAdd = () => {
    setNewService({ title: "", description: "", icon: "Plus" });
    setEditingId(null);
  };

  const handleSaveNew = (formData: FormData) => {
    const newServiceData = Object.fromEntries(formData) as Omit<Service, "id">;
    addServiceMutation.mutate(newServiceData);
  };

  // const handleDelete = (id: number) => {
  //   deleteServiceMutation.mutate(id);
  // };

  const ServiceCard = ({
    service,
    isEditing,
    onSave,
  }: {
    service: Service;
    isEditing: boolean;
    onSave: (updatedService: FormData) => void;
  }) => {
    const [editedService, setEditedService] = useState(service);
    const [iconFile, setIconFile] = useState<File | null>(null);

    const handleEdit = (id: number) => {
      setEditingId(id);
      setNewService(null);
    };

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setIconFile(e.target.files[0]);
      }
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name, value } = e.target;
      setEditedService((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveWithIcon = () => {
      const formData = new FormData();
      formData.append("title", editedService.title);
      formData.append("description", editedService.description);
      if (iconFile) {
        formData.append("icon", iconFile);
      }
      onSave(formData);
    };

    const IconComponent = iconMap[service.icon] || Plus;

    return (
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center">
            <div className="mr-4 rounded-full bg-primary p-3">
              {isEditing ? (
                <Input type="file" onChange={handleIconChange} />
              ) : (
                <img
                  src={service.icon}
                  alt="Service Icon"
                  className="h-10 w-10"
                />
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="title"
                    value={editedService.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                  />
                  <textarea
                    name="description"
                    value={editedService.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                  />
                  <Button onClick={handleSaveWithIcon}>
                    <Check className="mr-2 h-4 w-4" /> Save
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(service.id)}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      // onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading services</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service: Service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isEditing={editingId === service.id}
            // onSave={(updatedService) => handleSave(service.id, updatedService)}
            onSave={() => console.log("Save")}
          />
        ))}
        {newService && (
          <ServiceCard
            service={{ id: 0, ...newService }}
            isEditing={true}
            onSave={handleSaveNew}
          />
        )}
      </div>
    </div>
  );
};

export default ServiceMain;
