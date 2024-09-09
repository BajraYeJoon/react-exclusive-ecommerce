import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loading } from "./layout/Layout";
import { useAuthContext } from "../context/useAuthContext";
import { fetchUserDetails, updateUserDetails } from "../api/userApi";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "../../common/ui/avatar";
import { GeneralInfo, Orders, PaymentInfo, TabNavigation } from "../components";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { logout } = useAuthContext();
  const queryClient = useQueryClient();

  const {
    data: userdetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDetail"],
    queryFn: fetchUserDetails,
  });

  if (error) {
    toast.error(error.message);
  }

  const mutation = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userDetail"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="container mx-auto my-6 max-w-4xl rounded-lg bg-white shadow">
      <div className="p-6 sm:p-6">
        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Profile picture"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <span>Welcome</span>
            <h1 className="text-2xl font-bold">{userdetail?.name}</h1>
            <p className="text-gray-600">{userdetail?.email}</p>
          </div>
        </div>
        <div className="mb-6">
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            logout={logout}
          />
        </div>
        {activeTab === "general" && (
          <GeneralInfo userdetail={userdetail} onSubmit={onSubmit} />
        )}
        {activeTab === "orders" && <Orders />}
        {activeTab === "payment" && <PaymentInfo />}
      </div>
    </section>
  );
};

export { ProfilePage };
