import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthContext } from "../context/useAuthContext";
import { fetchUserDetails } from "../api/userApi";
import { Loading } from "./layout/Layout";

import { Button } from "../../common/ui/button";
import { GeneralInfo, Orders, PaymentInfo, TabNavigation } from "../components";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { cn } from "../../common/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../common/ui/dialog";
import { Card, CardContent } from "../../common/ui/card";
import { Label } from "../../common/ui/label";
import { Input } from "../../common/ui/input";
import ProfileHeader from "../components/profile/profileHeader";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { logout } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data: userdetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDetail"],
    queryFn: fetchUserDetails,
  });

  useEffect(() => {
    if (activeTab === "wishlist") {
      navigate("/favorites");
    }
  }, [activeTab, navigate]);

  if (isLoading)
    return (
      <div className="flex h-72 items-center justify-center md:h-[90vh]">
        <Loading />
      </div>
    );
  if (error) {
    toast.error(error.message);
    return <div>Error loading user details</div>;
  }

  return (
    <div className="relative mx-72 my-4 flex h-fit flex-col bg-foreground/5 max-2xl:mx-6 lg:my-10 lg:flex-row">
      <aside
        className={cn(
          `w-full bg-background p-6 lg:block lg:w-64`,
          isSidebarOpen ? "block" : "hidden",
        )}
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
        {activeTab === "profile" && (
          <>
            {" "}
            <ProfileHeader
              userdetail={userdetail}
              setIsSidebarOpen={setIsSidebarOpen}
              isSidebarOpen={isSidebarOpen}
            />
            <div>
              <h2 className="mb-4 text-2xl font-medium">Profile Information</h2>
              <p className="mb-4">
                Here you can view and edit your profile information.
              </p>
              <Card className="border-none shadow-none">
                <CardContent className="mb-2 space-y-2 p-0">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" disabled defaultValue={userdetail?.name} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Username</Label>
                    <Input
                      id="phone"
                      disabled
                      defaultValue={userdetail?.phone}
                    />
                  </div>
                </CardContent>
              </Card>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Your Profile</DialogTitle>
                  </DialogHeader>
                  <GeneralInfo userdetail={userdetail} />
                </DialogContent>
              </Dialog>
            </div>{" "}
          </>
        )}

        {activeTab === "address" && <PaymentInfo />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "returns" && <div>My Returns Content</div>}
        {activeTab === "cancellations" && <div>My Cancellations Content</div>}
      </main>
    </div>
  );
}

export { ProfilePage };
