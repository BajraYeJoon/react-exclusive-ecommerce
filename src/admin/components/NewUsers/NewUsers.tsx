import { EyeIcon } from "lucide-react";

interface NewUsersProps {
  name: string;
  email: string;
  avatarlink: string;
}

const NewUsers = ({ name, email, avatarlink }: NewUsersProps) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="h-8 w-8 rounded-full"
            src={avatarlink}
            alt="Neil image"
          />
        </div>
        <div className="ms-4 min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {email}
          </p>
        </div>
        <button className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400">
          <span className="relative flex items-center justify-around gap-2 rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
            <EyeIcon />
            View
          </span>
        </button>
      </div>
    </li>
  );
};

export default NewUsers;
