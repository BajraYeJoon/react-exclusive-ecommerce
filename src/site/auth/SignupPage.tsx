import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { Button } from "../../components";
import { useForm } from "react-hook-form";
// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import { SignUpFormData } from "../../schemas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { SignUpFormSchema } from "../../schemas/zodSchema";
import { GoogleSignInComponent } from "./GoogleSignIn";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignUpFormData) => {
    const { email, password, name, phoneNumber } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userData = userCredential.user;

      const docRef = await addDoc(collection(db, "usersData"), {
        name,
        email,
        phoneNumber,
      });

      await setDoc(doc(db, "usersData", docRef.id), {
        uid: userData.uid,
      });

      console.log("SUCCESS", userData);
      navigate("/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sign-up-content flex flex-col space-y-4">
      <h2 className="text-lg lg:text-3xl">Create an account</h2>
      <p className="text-sm lg:text-base">Enter your details below</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {" "}
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
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            register={register}
            error={errors.phoneNumber}
          />
          <FormInput
            type="passsword"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
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
