import { Mail, User2 } from "lucide-react";
import { BsMenuButton } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa";
import { Link } from "react-router-dom";

const sidebarItems = [
  {
    href: "",
    icon: BsMenuButton,
    label: "Dashboard",
  },
  {
    href: "orders",
    icon: Mail,
    label: "Orders",
    badge: "3",
  },
  {
    href: "users",
    icon: User2,
    label: "Users",
  },
  {
    href: "products",
    icon: FaProductHunt,
    label: "Products",
  },
];

const Sidebar = () => {
  return (
    <aside
      id="default-sidebar"
      className="hidden h-screen w-64 sm:px-6 md:block lg:px-8"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
                  to={`/admin/${item.href}`}
                  className="group flex items-center rounded-lg p-2 text-gray-900"
                >
                  <Icon className="h-6 w-6" />
                  <span className="ms-3 flex-1 whitespace-nowrap">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
