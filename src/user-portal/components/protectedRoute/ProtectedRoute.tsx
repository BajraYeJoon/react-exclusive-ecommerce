import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: "user" | "admin";
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuthContext();

  const user = JSON.parse(Cookies.get("user") || "{}");

  if (!isLoggedIn) {
    return <Navigate to={"/sign-up"} />;
  }

  // if (user?.user?.role === "admin") {
  //   return <Navigate to={"/admin/profile"} />;
  // }

  if (user?.user?.role !== role) {
    return <Navigate to={"/sign-up"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;