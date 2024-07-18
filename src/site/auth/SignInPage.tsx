import { useForm } from "react-hook-form";
import { LoginFormData } from "../../schemas/types";
import { LoginFormSchema } from "../../schemas/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormInput } from "../../components";
import { GoogleSignInComponent } from "./GoogleSignIn";
import { useAuthContext } from "../../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";

const SignInPage = () => {
  const { login, isLoading } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });
  const onSubmit = async (data: LoginFormData) => {
    await login(data);
    toast.success("You are now logged in");
    navigate("/profile");
  };

  return (
    <div className="sign-up-content space-y-8">
      {" "}
      <h2 className="text-lg lg:text-3xl">Login to your account</h2>
      <p className="text-sm lg:text-base">Provide your details below</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {" "}
        <div className="flex w-full flex-col gap-4">
          <FormInput
            type="text"
            placeholder="Email"
            name="name"
            register={register}
            error={errors.name}
          />

          <FormInput
            type="passsword"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />
          <Button type="submit" className="w-full">
            {isLoading ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              "Login"
            )}
          </Button>
          <GoogleSignInComponent text="Sign in with Google" />
        </div>
      </form>
    </div>
  );
};

export { SignInPage };
