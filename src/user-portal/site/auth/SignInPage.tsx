import { useForm } from "react-hook-form";
import { LoginFormData } from "../../schemas/types";
import { LoginFormSchema } from "../../schemas/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../common/ui/button";
import { useAuthContext } from "../../context/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { CgSpinner } from "react-icons/cg";
import { Routes } from "../../../admin/lib/links";
import { UserRoutes } from "../../utils/userLinks";
import { Input } from "../../../common/ui/input";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const SignInPage = () => {
  const { login, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const recaptcha = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    reset: loginFormReset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    const captchaValue = recaptcha?.current?.getValue();

    if (!captchaValue) {
      toast.error("Please complete the reCAPTCHA");
      return;
    }

    try {
      await login({ email, password, loginFormReset });
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
        toast.error(
          "Invalid credentials. Please check your email and password.",
        );
        recaptcha?.current?.reset();
      } else {
        toast.error(error?.message);
        recaptcha?.current?.reset();
      }
    }
  };

  return (
    <div className="sign-up-content w-[400px] space-y-8">
      {" "}
      <h2 className="text-lg lg:text-3xl">Login to your account</h2>
      <p className="text-sm lg:text-base">Provide your details below</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {" "}
        <div className="flex w-full flex-col gap-4">
          <Input type="text" placeholder="Email" {...register("email")} />

          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />

          <ReCAPTCHA
            ref={recaptcha}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ""}
          />

          <Button type="submit" className="w-full">
            {isLoading ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              "Login"
            )}
          </Button>
          {/* <GoogleSignInComponent text="Sign in with Google" /> */}
          <div className="flex justify-between gap-5">
            <Link to={"/forgot-password"}>
              <p className="text-sm text-primary underline">
                Forgot your password
              </p>
            </Link>
            <Link to={"/sign-up"}>
              <p className="text-sm underline">Don't have an account?</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export { SignInPage };
