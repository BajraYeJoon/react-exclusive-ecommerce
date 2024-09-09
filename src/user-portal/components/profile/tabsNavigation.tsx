import {
  FaUser,
  FaShoppingCart,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "../../../common/ui/button";

const TabNavigation = ({ activeTab, setActiveTab, logout }: any) => {
  const tabs = [
    { id: "general", label: "General", icon: FaUser },
    { id: "orders", label: "My Orders", icon: FaShoppingCart },
    { id: "payment", label: "Payment", icon: FaCreditCard },
  ];

  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 ${activeTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          <tab.icon />
          {tab.label}
        </button>
      ))}
      <Button onClick={logout}>
        <FaSignOutAlt />
        Logout
      </Button>
    </nav>
  );
};

export default TabNavigation;
