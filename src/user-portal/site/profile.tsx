import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "./layout/Layout";
import { useAuthContext } from "../context/useAuthContext";
import { fetchUserDetails, updateUserDetails } from "../api/userApi";
import { Input } from "../../common/ui/input";
import { Button } from "../../common/ui/button";
import { toast } from "sonner";
interface FormData {
  name?: string;
  phone?: string;
}

const ProfilePage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
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
    toast.error(`${error}`);
  }

  const mutation = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: (data) => {
      const resetData: Partial<FormData> = {};
      if (data.name) resetData.name = data.name;
      if (data.phone) resetData.phone = data.phone;
      reset(resetData);
      queryClient.invalidateQueries({ queryKey: ["userDetail"] });
      toast.success(`${data.message}`);
      console.log(data);
    },
    onError: () => {},
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 w-fit">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Name
          </label>

          <Input
            id="name"
            type="text"
            {...register("name")}
            defaultValue={userdetail?.name || ""}
            // placeholder={userdetail?.name || ""}
          />
        </div>
        <div className="mb-4 w-fit">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="phone"
          >
            Phone
          </label>
          <Input
            id="phone"
            type="text"
            {...register("phone")}
            defaultValue={userdetail?.phone || ""}
            // placeholder={userdetail?.phone || ""}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button>Update Profile</Button>
        </div>
      </form>

      <Button onClick={logout} className="mt-4">
        Log Out
      </Button>
    </div>
  );
};

export { ProfilePage };
