import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { Button } from "../../components";
import { useForm } from "react-hook-form";
// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import { FormData } from "../../schemas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSchema from "../../schemas/zodSchema";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const navigate = useNavigate();

  const GoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);

      if (data) {
        navigate("/profile");
        // window.location.reload();
      }
      //   const credential = GoogleAuthProvider.credentialFromResult(data);
      //   const token = credential?.accessToken;

      //   if (token) {
      //     Cookies.set("accessToken", token, { expires: 1 });
      //     navigate("/sign-in");
    } catch (error: any) {
      console.log(error.code, error.message, error.email, "error");
    }
  };

  const onSubmit = async (data: FormData) => {
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
    <section className="sigup-container m-24 flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-start gap-5">
        <h2 className="text-base lg:text-3xl">Create an account</h2>
        <p className="text-lg lg:text-base">Enter your details below</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
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
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
      <Button onClick={GoogleSignIn}>Sign In google</Button>
    </section>
  );
};

export { SignupPage };
