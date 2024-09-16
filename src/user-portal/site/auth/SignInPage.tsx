import { useForm } from "react-hook-form";
import { LoginFormData } from "../../schemas/types";
import { LoginFormSchema } from "../../schemas/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../common/ui/button";
import { GoogleSignInComponent } from "./GoogleSignIn";
import { useAuthContext } from "../../context/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { CgSpinner } from "react-icons/cg";
import { Routes } from "../../../admin/lib/links";
import { UserRoutes } from "../../utils/userLinks";
import { Input } from "../../../common/ui/input";

const SignInPage = () => {
  const { login, isLoading } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      const user = JSON.parse(Cookies.get("user") || "{}");

      if (user === Routes.Admin) {
        navigate(`/${Routes.Admin}/${Routes.Dashboard}`);
        toast.success("Welcome to the admin panel");
      } else {
        navigate(`/${UserRoutes.Profile}`);
        toast.success("You are now logged in");
      }
    } catch (error: any) {
      if (error.statusCode === 401) {
        toast.error("Invalid credentials. Please try again.");
      } else if (error.message === "User already exists") {
        toast.error("User already exists. Please use a different email.");
      } else {
        console.log(error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  

  return (
    <div className="sign-up-content space-y-8">
      {" "}
      <h2 className="text-lg lg:text-3xl">Login to your account</h2>
      <p className="text-sm lg:text-base">Provide your details below</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {" "}
        <div className="flex w-full flex-col gap-4">
          <Input type="text" placeholder="Email" {...register("name")} />

          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <Button type="submit" className="w-full">
            {isLoading ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              "Login"
            )}
          </Button>
          <GoogleSignInComponent text="Sign in with Google" />
          <Link to={"/forgot-password"}>
            <p className="text-red-400 underline">Forgot your password</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export { SignInPage };
