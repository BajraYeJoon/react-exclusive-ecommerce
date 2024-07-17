import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Button } from "../../components";

// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const GoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);

      if (data) {
        navigate("/profile");
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
    <div>
      <Button onClick={GoogleSignIn}>Sign In google</Button>
    </div>
  );
};

export { SignupPage };
