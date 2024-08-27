import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { sendOtp } from "../../api/forgotPassword";
import { useRecoilState } from "recoil";
import { emailState } from "../../../user-portal/atoms/emailstate";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [, setEmail] = useRecoilState(emailState);

  const onSubmit = async (data) => {
    try {
      const response = await sendOtp(data.email);
      setEmail(data.email);
      console.log("Response:", response.data);
      toast.success("otp has been sent to your email");

      if (response.data.message.includes("successfully")) {
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send otp");
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
      <Link
        to="/"
        className="mb-6 flex items-center text-2xl font-semibold text-gray-900"
      >
        Exclusive
      </Link>
      <div className="w-full rounded-lg bg-white p-6 shadow dark:border sm:max-w-md sm:p-8 md:mt-0">
        <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Forgot your password?
        </h1>
        <p className="font-light text-gray-500">
          Don't fret! Just type in your email and we will send you a code to
          reset your password!
        </p>
        <form
          className="mt-4 space-y-4 md:space-y-5 lg:mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="name@company.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email?.message?.toString()}
              </p>
            )}
          </div>

          <Button>Reset Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
