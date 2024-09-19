import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Component() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6 shadow">
        <h2 className="mb-6 text-lg font-semibold">Manage My Account</h2>
        <nav>
          <ul className="space-y-2">
            <li className="font-medium text-red-500">My Profile</li>
            <li>Address Book</li>
            <li>My Payment Options</li>
          </ul>
          <h2 className="mb-2 mt-6 font-semibold">My Orders</h2>
          <ul className="space-y-2">
            <li>My Returns</li>
            <li>My Cancellations</li>
          </ul>
          <h2 className="mb-2 mt-6 font-semibold">My WishList</h2>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-bold">Edit Your Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="mb-1 block">
                First Name
              </label>
              <Input
                id="firstName"
                {...register("firstName")}
                defaultValue="Md"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1 block">
                Last Name
              </label>
              <Input
                id="lastName"
                {...register("lastName")}
                defaultValue="Rimel"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
              <Input
                id="email"
                {...register("email")}
                defaultValue="rimel1111@gmail.com"
              />
            </div>
            <div>
              <label htmlFor="address" className="mb-1 block">
                Address
              </label>
              <Input
                id="address"
                {...register("address")}
                defaultValue="Kingston, 5236, United State"
              />
            </div>
          </div>
          <h2 className="mb-4 mt-6 text-xl font-semibold">Password Changes</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="mb-1 block">
                Current Password
              </label>
              <Input
                id="currentPassword"
                type="password"
                {...register("currentPassword")}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="mb-1 block">
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword")}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-1 block">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
