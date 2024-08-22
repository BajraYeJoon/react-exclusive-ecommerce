import React from "react";

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
            className="w-8 h-8 rounded-full"
            src={avatarlink}
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {email}
          </p>
        </div>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 ">
          <span className="relative flex items-center justify-around gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 64 64"
            >
              <path d="M 32 6 C 24.609804 6 17.944715 9.0884062 13.210938 14.039062 C 13.211191 14.03848 13.226562 14 13.226562 14 C 13.122848 14.112416 13.031583 14.220129 12.929688 14.332031 C 12.727381 14.550293 12.532697 14.774881 12.337891 15 C 3.8891589 24.525232 2 32 2 32 C 2 32 3.8891589 39.474768 12.337891 49 C 12.532697 49.225119 12.727381 49.449707 12.929688 49.667969 C 13.031583 49.779871 13.122848 49.887584 13.226562 50 C 13.226562 50 13.211191 49.96152 13.210938 49.960938 C 17.944715 54.911594 24.609804 58 32 58 C 39.390196 58 46.055285 54.911594 50.789062 49.960938 C 50.788809 49.96152 50.773438 50 50.773438 50 C 50.877152 49.887584 50.968417 49.779871 51.070312 49.667969 C 51.272619 49.449707 51.467303 49.225119 51.662109 49 C 60.110841 39.474768 62 32 62 32 C 62 32 60.110841 24.525232 51.662109 15 C 51.467303 14.774881 51.272619 14.550293 51.070312 14.332031 C 50.968417 14.220129 50.877152 14.112416 50.773438 14 C 50.773438 14 50.788809 14.03848 50.789062 14.039062 C 46.055285 9.0884062 39.390196 6 32 6 z M 32 10 C 44.15 10 54 19.85 54 32 C 54 44.15 44.15 54 32 54 C 19.85 54 10 44.15 10 32 C 10 19.85 19.85 10 32 10 z M 32 22 C 26.477 22 22 26.477 22 32 C 22 37.523 26.477 42 32 42 C 37.523 42 42 37.523 42 32 C 42 31.662 41.981219 31.329 41.949219 31 L 35 31 L 34 29 L 37.103516 23.412109 C 35.608516 22.521109 33.867 22 32 22 z"></path>
            </svg>
            View
          </span>
        </button>
      </div>
    </li>
  );
};

export default NewUsers;
