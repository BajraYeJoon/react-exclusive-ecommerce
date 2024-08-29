import { Button } from "../../components";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "../../schemas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "../../schemas/zodSchema";
import { GoogleSignInComponent } from "./GoogleSignIn";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { Input } from "../../../common/ui/input";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
  });

  // const navigate = useNavigate();
  const { signup } = useAuthContext();

  const onSubmit = async (data: SignUpFormData) => {
    console.log(data);
    const { email, password, name, phoneNumber } = data;

    try {
      const response = signup({ name, email, password, phoneNumber });
      reset();
      console.log(response);
    } catch (err) {
      console.error("Signup error", err);
    }
  };

  return (
    <div className="sign-up-content flex flex-col space-y-4">
      <h2 className="text-lg lg:text-3xl">Create an account</h2>
      <p className="text-sm lg:text-base">Enter your details below</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full flex-col gap-4">
          <div>
            <Input
              type="text"
              placeholder="Name"
              {...register("name", {
                pattern: /^[a-zA-Z0-9_.-]*$/,
                required: "Name is required",
              })}
            />
            {errors && (
              <span className="error text-xs text-primary">
                {errors.name?.message}
              </span>
            )}
          </div>
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)@gmail([.])com/g,
                  message: "Please enter a valid Gmail address",
                },
              })}
            />
            {errors && (
              <span className="error text-xs text-primary">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors && (
              <span className="error text-xs text-primary">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="phone"
              {...register("phoneNumber")}
            />
            {errors && (
              <span className="error text-xs text-primary">
                {errors.phoneNumber?.message}
              </span>
            )}
          </div>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </form>
      <GoogleSignInComponent text={"Sign up with Google"} />
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
