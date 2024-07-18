import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Button } from "../../components";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const GoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);

      if (data) {
        Cookies.set("loggedin", "logged");
        navigate("/profile");
        window.location.reload();
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

  return (
    <section className="sigup-container m-24 flex flex-col items-center justify-center gap-10 lg:flex-row">
      <div className="flex flex-col items-start gap-5">
        <h2 className="text-base lg:text-3xl">Create an account</h2>
        <p className="text-lg lg:text-base">Enter your details below</p>
      </div>
      {/* <div>
        <Button onClick={GoogleSignIn}>Sign In google</Button>
      </div> */}
    </section>
  );
};

export { SignupPage };
