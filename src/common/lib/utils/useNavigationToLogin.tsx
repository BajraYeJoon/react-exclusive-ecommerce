import { useNavigate } from "react-router-dom";

const useNavigateToLogin = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  return redirectToLogin;
};

export default useNavigateToLogin;
