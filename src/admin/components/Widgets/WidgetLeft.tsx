import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../api/fetchUser";
import NewUsers from "../NewUsers/NewUsers";
import { Link } from "react-router-dom";

export default function WidgetLeft() {
  const { data: newUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    select: (data) => {
      return (
        data &&
        data.data
          ?.map((user: any) => user)
          .slice(0, 5)
          .sort((a: any, b: any) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
      );
    },
  });

  console.log(newUsers);

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h5>
        <Link
          to="/admin/users"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul className="divide-gray-20 divide-y">
          {newUsers && newUsers.map((values) => <NewUsers values={values} />)}
        </ul>
      </div>
    </div>
  );
}
