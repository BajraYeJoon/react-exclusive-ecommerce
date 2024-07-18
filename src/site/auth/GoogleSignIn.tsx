import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { FcGoogle } from "react-icons/fc";

export const GoogleSignInComponent = ({ text }: { text: string }) => {
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

  return (
    <Button onClick={GoogleSignIn} variant={"outline"}>
      <FcGoogle className="mr-2 w-full" size={20} />
      {text}
    </Button>
  );
};
