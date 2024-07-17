import { Button } from "../components";
// import Cookies from "js-cookie";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    // Cookies.remove("accessToken");

    navigate("/sign-up");
  };

  const deleteUserAccount = async () => {
    const user = auth.currentUser;
    await deleteUser(user as any);
    navigate("/sign-up");
  };

  const info = auth.currentUser;
  console.log(info, "info");
  return (
    <div>
      <Button onClick={logOut}>Log Out</Button>
      Delete Account ? <Button onClick={deleteUserAccount}>Delete</Button>
    </div>
  );
};

export { ProfilePage };
