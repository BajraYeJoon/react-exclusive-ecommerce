import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../components";
import { fetchUserDetails } from "../api/fetch";
import { useAuthContext } from "../context/useAuthContext";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const [userdetail, setUserdetail] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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

  const onSubmit = async (data) => {
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
      // Update user details in the state if needed
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  return (
    <div>
      <div className="col-span-8 overflow-hidden sm:px-8 sm:shadow">
        <p className="py-2 text-xl font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            Your email address is <strong>{userdetail.email}</strong>
            <h1>Your phone number is {userdetail.phone}</h1>
            <h1>Your name is {userdetail.name}</h1>
          </p>
          <div className="inline-flex text-sm font-semibold text-primary">
            Welcome, {userdetail.name}
          </div>
        </div>
        <hr className="mb-8 mt-4" />

        <form onSubmit={handleSubmit(onSubmit)}>
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
          <button type="submit" className="mt-4 bg-primary p-2 text-white">
            Update Profile
          </button>
        </form>
        {message && <p>{message}</p>}

        <Button onClick={logout}>Log Out</Button>
      </div>
    </div>
  );
};

export { ProfilePage };
