import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../../../../common/ui/card";
import { Employee } from "./teamsMain";
import { Linkedin, Pencil, Trash2, Twitter } from "lucide-react";
import { Button } from "../../../../common/ui/button";

type TeamsDisplayProps = {
  employees: Employee[];
  handleEdit: (employee: Employee) => void;
  handleDelete: (id: string) => void;
};

export function TeamsDisplay({ employees, handleEdit, handleDelete }: TeamsDisplayProps) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
    {employees?.map((employee: Employee) => (
      <Card key={employee.id} className="w-full overflow-hidden">
        <CardContent className="flex flex-col gap-2 p-4 sm:flex-row">
          <div className="flex flex-col items-start">
            <img
              src={employee.image}
              alt={employee.name}
              className="h-24 w-full object-cover md:h-24 md:w-auto"
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
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(employee)}
                className="w-full"
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span className="hidden sm:block">Edit</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(employee.id)}
                className="w-full"
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
  );
}
