import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";
import { Axios } from "../../common/lib/axiosInstance";

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
  token: string;
}

type AuthContextType = {
  isAdmin: boolean;
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

  const [isAdmin] = useState(
    JSON.parse(Cookies.get("user") ?? "{}") === "admin" ? true : false,
  );

  console.log(isAdmin, "isAdmin");

  const fetchUserDetails = async (token: string) => {
    try {
      const response = await axios.get(
        "https://nest-ecommerce-1fqk.onrender.com/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const userDetails = response.data;

      Cookies.set("user", JSON.stringify(userDetails.user.role), {
        expires: 7,
      });
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const login = async ({ name, password }: LoginProps) => {
    setIsLoading(true);

    try {
      const response = await Axios.post("auth/signin", {
        email: name,
        password,
      });
      const data = response.data;
      await fetchUserDetails(data.token);
      setIsLoggedIn(true);
      Cookies.set("token", data.token, { expires: 7 });
      // Update the Axios instance after setting the token
      Axios.defaults.headers.common["Authorization"] =
        `Bearer ${Cookies.get("token")}`;
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
      if (response.status === 200) {
        toast.success(
          "Signup successful. Please check your email to verify your account.",
        );
      } else if (response.status === 400) {
        toast.error("You are already registerd. Please Login");
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
    Cookies.remove("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAdmin, isLoggedIn, isLoading, login, logout, signup }}
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
