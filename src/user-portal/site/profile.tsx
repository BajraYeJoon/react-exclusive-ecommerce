import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthContext } from "../context/useAuthContext";
import { fetchUserDetails } from "../api/userApi";
import { Loading } from "./layout/Layout";

import { Button } from "../../common/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../common/ui/avatar";
import { GeneralInfo, TabNavigation } from "../components";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { logout } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    data: userdetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDetail"],
    queryFn: fetchUserDetails,
  });

  if (isLoading) return <Loading />;
  if (error) {
    toast.error(error.message);
    return <div>Error loading user details</div>;
  }

  return (
    <div className="relative mx-72 my-4 flex h-fit flex-col bg-foreground/5 max-2xl:mx-6 lg:my-10 lg:flex-row">
      <aside
        className={`w-full bg-white p-6 lg:w-64 ${isSidebarOpen ? "block" : "hidden"} lg:block`}
      >
        <div className="absolute left-0 top-0 z-30 mt-36 h-fit w-full border-b bg-gray-100 md:mt-0 md:block md:w-fit md:bg-background">
          <h2 className="mb-4 text-lg font-semibold">Manage My Account</h2>
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <Button onClick={logout} className="mt-6 w-full">
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="min-h-[500px] flex-1 p-6">
        <div className="mb-6 flex items-center justify-between gap-4 sm:items-center">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Profile picture"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <span>Welcome</span>
              <h1 className="text-2xl font-bold">{userdetail?.name}</h1>
              <p className="text-gray-600">{userdetail?.email}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="z-50 lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? (
              <FaTimes size={24} className="text-primary" />
            ) : (
              <FaBars size={24} className="text-primary" />
            )}
            <span className="sr-only">
              {isSidebarOpen ? "Close menu" : "Open menu"}
            </span>
          </Button>
        </div>
        {activeTab === "profile" && <GeneralInfo userdetail={userdetail} />}
        {activeTab === "address" && <div>Address Book Content</div>}
        {activeTab === "payment" && <div>Payment Information Content</div>}
        {activeTab === "orders" && <div>My Orders Content</div>}
        {activeTab === "returns" && <div>My Returns Content</div>}
        {activeTab === "cancellations" && <div>My Cancellations Content</div>}
        {activeTab === "wishlist" && <div>My WishList Content</div>}
      </main>
    </div>
  );
}

export { ProfilePage };
