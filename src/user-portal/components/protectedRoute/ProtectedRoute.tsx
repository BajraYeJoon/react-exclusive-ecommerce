import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { UserRoutes } from "../../utils/userLinks";

interface ProtectedRouteProps {
	children: React.ReactNode;
	role: "user" | "admin";
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuthContext();

  console.log(role);

  if (!isLoggedIn) {
			return <Navigate to={`/${UserRoutes.SignUp}`} />;
		}

  return <>{children}</>;
};

export default ProtectedRoute;
