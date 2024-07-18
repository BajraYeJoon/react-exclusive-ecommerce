import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn) {
    return <Navigate to={"/sign-up"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
