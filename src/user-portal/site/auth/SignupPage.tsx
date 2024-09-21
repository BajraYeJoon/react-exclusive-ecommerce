import { useForm } from "react-hook-form";
import { SignUpFormData } from "../../schemas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "../../schemas/zodSchema";
import { GoogleSignInComponent } from "./GoogleSignIn";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { Input } from "../../../common/ui/input";
import { Button } from "../../../common/ui/button";
import { CgSpinner } from "react-icons/cg";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormData>({
    mode: "all",
    resolver: zodResolver(SignUpFormSchema),
  });

  const { signup } = useAuthContext();

  const onSubmit = async (data: SignUpFormData) => {
    const { email, password, name, phoneNumber } = data;

    try {
      await signup({ name, email, password, phoneNumber });
      reset();
    } catch (err) {
      console.error("Signup error", err);
    }
  };

  return (
    <div className="sign-up-content flex w-[400px] flex-col space-y-4">
      <h2 className="text-lg lg:text-3xl">Create an account</h2>
      <p className="text-sm lg:text-base">Enter your details below</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full flex-col gap-4">
          <div>
            <Input
              type="text"
              placeholder="Name"
              {...register("name", {
                setValueAs: (value: string) => value.trim(),
              })}
            />
            {errors.name && (
              <span className="error text-xs text-primary">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span className="error text-xs text-primary">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                setValueAs: (value: string) =>
                  value.trim().replace(/\s+/g, " "),
              })}
            />
            {errors.password && (
              <span className="error text-xs text-primary">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className="error text-xs text-primary">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
      </form>
      {/* <GoogleSignInComponent text={"Sign up with Google"} /> */}
      <div className="inline-flex gap-3 text-sm">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-primary underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export { SignupPage };
