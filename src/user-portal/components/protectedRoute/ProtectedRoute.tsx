import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { Routes } from "../../../admin/lib/links";
// import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: "user" | "admin";
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuthContext();

  // const user = JSON.parse(Cookies.get("user") ?? "{}");

  if (!isLoggedIn) {
    return <Navigate to={`${Routes.Admin}`} />;
  }

  // if (user === role) {
  //   return <Navigate to={`/${Routes.Admin}/${Routes.Dashboard}`} />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;