import { Button } from "../components";
import { useAuthContext } from "../context/useAuthContext";
const ProfilePage = () => {
  const { logout } = useAuthContext();

  // const deleteUserAccount = async () => {
  //   const user = auth.currentUser;
  //   await deleteUser(user as any);
  //   navigate("/sign-up");
  // };

  // const info = auth.currentUser;
  // console.log(info, "info");
  return (
    <div>
      <Button onClick={logout}>Log Out</Button>
      {/* Delete Account ? <Button onClick={deleteUserAccount}>Delete</Button> */}
    </div>
  );
};

export { ProfilePage };
