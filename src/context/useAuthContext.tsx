/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";

type LoginProps = {
  name: string;
  password: string;
};

interface SignupProps {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}



interface SignupResponse {
  status: number;
  data: any;
}

type AuthContextType = {
  isLoggedIn: boolean;
  login: ({ name, password }: LoginProps) => void;
  logout: () => void;
  isLoading: boolean;
  signup: (data: SignupProps) => void;
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
      const response = await axios.post(
        "https://nest-ecommerce-1fqk.onrender.com/auth/signin",
        {
          email: name,
          password,
        },
      );
      const data = response.data;
      // Cookies.set("token", data.token, { expires: 7 });
      console.log(data)
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async ({
    name,
    email,
    password,
    phoneNumber,
  }: SignupProps) => {
    setIsLoading(true);
    try {
      const response = await axios.post<SignupResponse>(
        "https://nest-ecommerce-1fqk.onrender.com/auth/signup",
        {
          name,
          email,
          password,
          phone: phoneNumber,
        },
      );
      if (response.status === 201) {
        setIsLoggedIn(true);
        toast.success("Signup successful");
      } else {
        console.error("Signup failed", response.data);
        toast.error("Signup failed");
      }
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("Signup failed");
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
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error in the AuthContextProvider");
  }
  return context;
};