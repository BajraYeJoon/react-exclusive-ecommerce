import { useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import { Input } from "../../../common/ui/input";
import { Phone } from "lucide-react";
import { Button } from "../../../common/ui/button";

interface FormData {
  name?: string;
  phone?: string;
}

interface GeneralInfoProps {
  userdetail: {
    name?: string;
    phone?: string;
  };
  onSubmit: (data: FormData) => void;
}

export default function GeneralInfo({
  userdetail,
  onSubmit,
}: GeneralInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: userdetail?.name || "",
      phone: userdetail?.phone || "",
    },
  });

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-lg bg-background shadow-md">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          General Information
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Update your profile details
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="relative">
            <BsPerson className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="name"
              type="text"
              {...register("name")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <Button onClick={() => reset()} variant={"outline"}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
