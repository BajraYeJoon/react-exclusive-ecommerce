import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../components";
import { useAuthContext } from "../context/useAuthContext";
import Cookies from "js-cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserDetails } from "../api/userApi";
import { Loading } from "./layout/Layout";

interface FormData {
  name: string;
  phone: string;
}


const updateUserDetails = async (data: FormData): Promise<void> => {
  await axios.post(
    "https://nest-ecommerce-1fqk.onrender.com/profile/updateprofile",
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );
};

const ProfilePage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [message, setMessage] = useState("");
  const { logout } = useAuthContext();
  const queryClient = useQueryClient();

  const { data: userdetail, isLoading } = useQuery({
    queryKey: ["userDetail"],
    queryFn: fetchUserDetails,
  });

  const mutation = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: (data) => {
      reset({
        name: data.name,
        phone: data.phone,
      });
      queryClient.invalidateQueries({ queryKey: ["userDetail"] });
      setMessage("Profile updated successfully");
    },
    onError: () => {
      setMessage("Failed to update profile");
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="profile-container mx-72 pb-4 pt-4 max-2xl:mx-8 md:pt-9">
      <p className="py-2 text-xl font-semibold">Email Address</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          Your email address is <strong>{userdetail?.email}</strong>
          <h1>Your phone number is {userdetail?.phone}</h1>
          <h1>Your name is {userdetail?.name}</h1>
        </div>

        <div className="inline-flex text-sm font-semibold text-primary">
          Welcome, {userdetail?.name}
        </div>
      </div>
      <hr className="mb-8 mt-4" />

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="border p-2"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            {...register("phone")}
            className="border p-2"
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
      {message && <p>{message}</p>}

      <Button onClick={logout}>Log Out</Button>
    </div>
  );
};

export { ProfilePage };
