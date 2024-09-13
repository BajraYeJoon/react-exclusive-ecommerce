import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../../api/fetchUser";
import NewUsers from "../../user-component/newUsers/NewUsers";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "../../../../common/ui/skeleton";
import uuidv4 from "../../../../common/lib/utils/uuid";

export default function WidgetLeft() {
  const {
    data: newUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    select: (data) => {
      return data?.data
        ?.map((user: any) => user)
        .slice(0, 5)
        .sort((a: any, b: any) => {
          return +new Date(b.createdAt) - +new Date(a.createdAt);
        });
    },
  });

  if (error) {
    toast.error("Failed to fetch users, Please reload");
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow sm:p-8 lg:max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h5>
        <Link
          to="/admin/users"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul className="divide-gray-20 divide-y">
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map(() => (
                <div
                  className="mb-4 flex items-center justify-between"
                  key={`skeleton-${uuidv4()}`}
                >
                  <div className="flex gap-2">
                    <Skeleton className="h-7 w-7 rounded-full" />

                    <Skeleton className="h-7 w-40" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </>
          ) : (
            <>
              {newUsers?.map((values: any) => (
                <NewUsers key={values.id} values={values} />
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
