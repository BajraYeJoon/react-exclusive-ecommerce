import { useState } from "react";
import { Card, CardContent } from "../../../common/ui/card";
import { Button } from "../../../common/ui/button";
import { Input } from "../../../common/ui/input";
import {
  Package,
  Headphones,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";
import AboutMain from "./about/aboutMain";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const initialServices: Service[] = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Get your products delivered quickly and efficiently.",
    icon: CiDeliveryTruck,
  },
  {
    id: 2,
    title: "Quality Products",
    description: "We ensure only the best products reach our customers.",
    icon: Package,
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Our support team is always ready to assist you.",
    icon: Headphones,
  },
];

export default function Component() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newService, setNewService] = useState<Omit<Service, "id"> | null>(
    null,
  );

  const handleEdit = (id: number) => {
    setEditingId(id);
    setNewService(null);
  };

  const handleDelete = (id: number) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleSave = (id: number, updatedService: Omit<Service, "id">) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, ...updatedService } : service,
      ),
    );
    setEditingId(null);
  };

  const handleAdd = () => {
    setNewService({ title: "", description: "", icon: Plus });
    setEditingId(null);
  };

  const handleSaveNew = () => {
    if (newService) {
      setServices([...services, { ...newService, id: Date.now() }]);
      setNewService(null);
    }
  };

  const ServiceCard = ({
    service,
    isEditing,
    onSave,
  }: {
    service: Service;
    isEditing: boolean;
    onSave: (updatedService: Omit<Service, "id">) => void;
  }) => {
    const [editedService, setEditedService] = useState(service);

    return (
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center">
            <div className="mr-4 rounded-full bg-black p-3">
              {isEditing ? (
                <Plus className="h-6 w-6 text-white" />
              ) : (
                <service.icon className="h-6 w-6 text-white" />
              )}
            </div>
            {isEditing ? (
              <Input
                value={editedService.title}
                onChange={(e) =>
                  setEditedService({ ...editedService, title: e.target.value })
                }
                className="text-xl font-semibold"
                placeholder="Service Title"
              />
            ) : (
              <h3 className="text-xl font-semibold text-gray-800">
                {service.title}
              </h3>
            )}
          </div>
          {isEditing ? (
            <textarea
              value={editedService.description}
              onChange={(e) =>
                setEditedService({
                  ...editedService,
                  description: e.target.value,
                })
              }
              className="mb-4"
              placeholder="Service Description"
            />
          ) : (
            <p className="mb-4 text-gray-600">{service.description}</p>
          )}
          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={() => onSave(editedService)}>
                  <Check className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingId(null)}
                >
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(service.id)}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6">
      <AboutMain />
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-6 text-2xl font-bold">Manage Services</h2>
        <Button className="" onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isEditing={editingId === service.id}
            onSave={(updatedService) => handleSave(service.id, updatedService)}
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
}
