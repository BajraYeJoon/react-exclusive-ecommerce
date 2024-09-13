import { Button } from "../../../../common/ui/button";
import { Card, CardContent, CardFooter } from "../../../../common/ui/card";
import { Stat } from "./statsMain";
import { PencilIcon, TrashIcon } from "lucide-react";

interface StatsDisplayProps {
  stats: Stat[];
  onEdit: (stat: Stat) => void;
  onDelete: (id: number) => void;
}

export function StatsDisplay({ stats, onEdit, onDelete }: StatsDisplayProps) {
  return (
    <section className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.id}
          className="transition-all duration-300 hover:shadow-md"
        >
          <CardContent className="p-6">
            <div className="space-y-2 text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-between gap-2 p-4 pt-0 md:flex-row">
            <Button variant="outline" size="sm" onClick={() => onEdit(stat)}>
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(stat.id || 0)}
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
