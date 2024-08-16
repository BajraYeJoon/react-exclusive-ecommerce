import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../components";
import { fetchUserDetails } from "../api/fetch";
import { useAuthContext } from "../context/useAuthContext";
import Cookies from "js-cookie";

interface FormData {
  name: string;
  phone: string;
}

interface UserDetail {
  email: string;
  phone: string;
  name: string;
}
const ProfilePage = () => {
  const [userdetail, setUserdetail] = useState<UserDetail>({
    email: "",
    phone: "",
    name: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<FormData>();
  const [message, setMessage] = useState("");

  const { logout } = useAuthContext();

  useEffect(() => {
    (async () => {
      const res = await fetchUserDetails();
      setUserdetail(res);
      reset({
        name: res.name,
        phone: res.phone,
      });
    })();
  }, [reset]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(
        "https://nest-ecommerce-1fqk.onrender.com/profile/updateprofile",
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      setMessage("Profile updated successfully");
      console.log(response.data);
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="profile-container mx-72 pb-4 pt-4 max-2xl:mx-8 md:pt-9">
      <p className="py-2 text-xl font-semibold">Email Address</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          Your email address is <strong>{userdetail.email}</strong>
          <h1>Your phone number is {userdetail.phone}</h1>
          <h1>Your name is {userdetail.name}</h1>
        </div>

        <div className="inline-flex text-sm font-semibold text-primary">
          Welcome, {userdetail.name}
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
            // placeholder={userdetail.name}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            {...register("phone")}
            className="border p-2"
            // placeholder={userdetail.phone}
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
