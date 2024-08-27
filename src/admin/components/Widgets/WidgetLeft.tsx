import { useQuery } from "@tanstack/react-query";
import { newUsers } from "../../lib/data";
import NewUsers from "../NewUsers/NewUsers";
import { fetchAllUsers } from "../../api/fetchUser";

export default function WidgetLeft() {
  const { data: newUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    select: (data) => {
      return data.data
        .map((user) => user)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  });

  console.log(newUsers);

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-gray-20 divide-y">
          {newUsers.map(({ name, email }) => (
            <NewUsers name={name} email={email} />
          ))}
        </ul>
      </div>
    </div>
  );
}
