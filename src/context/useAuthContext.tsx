/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";

type LoginProps = {
  name: string;
  password: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  login: ({ name, password }: LoginProps) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("token") ? true : false,
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ name, password }: LoginProps) => {
    setIsLoading(true);
   
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: name,
        password,
      });
      const data = response.data;
      Cookies.set("token", data.token, { expires: 7 });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setIsLoggedIn(false);
    toast.success("You are now logged out");
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error in the AuthContextProvider");
  }
  return context;
};
