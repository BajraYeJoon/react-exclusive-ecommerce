import { useContext } from "react";
import { Button } from "../../components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import { SignUpFormData } from "../../schemas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "../../schemas/zodSchema";
import { GoogleSignInComponent } from "./GoogleSignIn";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const navigate = useNavigate();
  const { signup } = useAuthContext();

  const onSubmit = async (data: SignUpFormData) => {
    console.log(data);
    const { email, password, name, phoneNumber } = data;

    try {
      const response = signup({ name, email, password, phoneNumber });
      navigate("/sign-in");
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
          <FormInput
            type="text"
            placeholder="Name"
            name="name"
            register={register}
            error={errors.name}
          />
          <FormInput
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />
          <FormInput
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />
          <FormInput
            type="text"
            placeholder="phone"
            name="phoneNumber"
            register={register}
            error={errors.phoneNumber}
          />
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
