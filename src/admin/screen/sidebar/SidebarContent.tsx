import { Mail, User2 } from "lucide-react";
import { BsMenuButton } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { FaProductHunt, FaSellsy } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Routes } from "../../lib/links";
import { GrDocumentImage } from "react-icons/gr";
import { MdEditNote } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { FcRatings } from "react-icons/fc";

const sidebarItems = [
  {
    href: Routes.Dashboard,
    icon: BsMenuButton,
    label: "Dashboard",
    color: "#3498db", // Blue
  },
  {
    href: Routes.Orders,
    icon: Mail,
    label: "Orders",
    badge: "3",
    color: "#e74c3c", // Red
  },
  {
    href: Routes.Users,
    icon: User2,
    label: "Users",
    color: "#2ecc71", // Green
  },
  {
    href: Routes.Products,
    icon: FaProductHunt,
    label: "Products",
    color: "#f39c12", // Orange
  },
  {
    href: Routes.AddCategory,
    icon: CgAdd,
    label: "Add Category",
    color: "#9b59b6", // Purple
  },
  {
    href: Routes.FlashSales,
    icon: FaSellsy,
    label: "Flash Sales",
    color: "#e67e22", // Orange
  },
  {
    href: Routes.Banners,
    icon: GrDocumentImage,
    label: "Banners",
    color: "#1abc9c", // Turquoise
  },
  {
    href: Routes.CMS,
    icon: MdEditNote,
    label: "Change Content",
    color: "#34495e", // Dark Blue
  },
  {
    href: Routes.Discount,
    icon: CiDiscount1,
    label: "Discount",
    color: "#d35400", // Dark Orange
  },
  {
    href: Routes.Ratings,
    icon: FcRatings,
    label: "Ratings",
    color: "#f1c40f", // Yellow
  },
];


const SidebarContent = () => {
  return (
    <div className="z-50 h-full overflow-y-auto px-3 py-4">
      <ul className="space-y-2 font-medium">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={index}>
              <NavLink
                to={`/admin/${item.href}`}
                className={({ isActive }) =>
                  `group flex items-center rounded-lg p-2 text-gray-900 ${
                    isActive ? "bg-red-500/60 text-gray-200" : ""
                  }`
                }
              >
                <Icon className="h-6 w-6" color={item.color} />{" "}
                {/* Apply the color */}
                <span
                  className={`ms-3 flex-1 whitespace-nowrap text-sm md:text-base ${item.label.replace(
                    /\s+/g,
                    "-",
                  )}`}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span className="ms-3 inline-flex items-center justify-center rounded-full bg-primary px-2 text-sm font-medium text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default SidebarContent;