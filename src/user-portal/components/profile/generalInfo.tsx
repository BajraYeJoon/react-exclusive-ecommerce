import { useForm } from "react-hook-form";
import { Input } from "../../../common/ui/input";
import { Button } from "../../../common/ui/button";

interface FormData {
  name?: string;
  phone?: string;
}

const GeneralInfo = ({ userdetail, onSubmit }: any) => {
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">General Information</h2>
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
          />
        </div>
        <div className="flex items-center justify-between">
          <Button>Update Profile</Button>
        </div>
      </form>
    </div>
  );
};

export default GeneralInfo;
