import { Mail, User2 } from "lucide-react";
import { BsMenuButton } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { FaProductHunt, FaSellsy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Routes } from "../../lib/links";

const sidebarItems = [
  {
    href: Routes.Dashboard,
    icon: BsMenuButton,
    label: "Dashboard",
  },
  {
    href: Routes.Orders,
    icon: Mail,
    label: "Orders",
    badge: "3",
  },
  {
    href: Routes.Users,
    icon: User2,
    label: "Users",
  },
  {
    href: Routes.Products,
    icon: FaProductHunt,
    label: "Products",
  },
  {
    href: Routes.AddCategory,
    icon: CgAdd,
    label: "Add Category",
  },
  {
    href: Routes.FlashSales,
    icon: FaSellsy,
    label: "Flash Sales",
  },
];

const SidebarContent = () => {
  return (
    <div className="h-full w-fit overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
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
                <span className="ms-3 flex-1 whitespace-nowrap text-sm md:text-base">
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
  );
};

export default SidebarContent;
