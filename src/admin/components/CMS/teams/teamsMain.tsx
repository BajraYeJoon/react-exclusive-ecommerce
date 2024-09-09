import { useState } from "react";
import { TeamsDisplay } from "./teamsDisplay";
import { TeamsEdit } from "./teamsEdit";
import { Button } from "../../../../common/ui/button";

export interface Employee {
  id: string;
  name: string;
  position: string;
  imgSrc: string;
  twitter?: string;
  linkedin?: string;
}

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "tom crouise",
    position: "founder & chairman",
    imgSrc: "/employee-1.webp",
  },
  {
    id: "2",
    name: "Janeth doe ",
    position: "Marketing",
    imgSrc: "/employee-2.webp",
  },
  {
    id: "3",
    name: "John doe",
    position: "Sales Manager",
    imgSrc: "/employee-3.webp",
  },
  {
    id: "4",
    name: "Emily Joe",
    position: "Social Media",
    imgSrc: "/employee-1.webp",
  },
  {
    id: "5",
    name: "Tom crouise",
    position: "Action Actor",
    imgSrc: "/employee-2.webp",
  },
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newEmployees: Employee[]) => {
    setEmployees(newEmployees);
    setIsEditing(false);
  };

  return (
    <div className="">
      {isEditing ? (
        <TeamsEdit
          employees={employees}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
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
