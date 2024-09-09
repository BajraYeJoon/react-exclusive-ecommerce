import { useState } from "react";
import { StatsEdit } from "./statsEdit";
import { StatsDisplay } from "./statsDisplay";
import { Button } from "../../../../common/ui/button";

export interface Stat {
  value: string;
  description: string;
}

interface StatsProps {
  isPro?: boolean;
}

const initialStats: Stat[] = [
  { value: "10.5k", description: "Sallers active our site" },
  { value: "33k", description: "Mopnthly Produduct Sale" },
  { value: "45.5k", description: "Customer active in our site" },
  { value: "25k", description: "Anual gross sale in our site" },
];

export default function Stats({ isPro = false }: StatsProps) {
  const [stats, setStats] = useState<Stat[]>(initialStats);
  const [isEditing, setIsEditing] = useState(false);

  const maxStats = isPro ? 8 : 4;

  const handleSave = (newStats: Stat[]) => {
    setStats(newStats);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-4 text-xl font-medium">Manage Stats</h2>
      {isEditing ? (
        <StatsEdit
          stats={stats}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          maxStats={maxStats}
        />
      ) : (
        <>
          <StatsDisplay stats={stats} />
          <Button onClick={() => setIsEditing(true)} className="mt-4">
            Edit Stats
          </Button>
        </>
      )}
    </div>
  );
}
