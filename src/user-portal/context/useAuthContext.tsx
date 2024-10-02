import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";
import { Axios } from "../../common/lib/axiosInstance";

type LoginProps = {
  email: string;
  password: string;
  loginFormReset: () => void;
};

interface SignupProps {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  formReset: () => void;
}

export interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface SignupResponse {
  message(message: string): unknown;
  status: number;
  data: any;
  token: string;
}

type AuthContextType = {
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: ({ email, password, loginFormReset }: LoginProps) => void;
  logout: () => void;
  isLoading: boolean;
  signup: (data: SignupProps) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("access_token") ? true : false,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = JSON.parse(Cookies.get("user") || "{}");
    setIsAdmin(userRole === "admin");
  }, [isLoggedIn]);

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
        expires: 1,
      });
      setIsAdmin(userDetails.user.role === "admin");
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const login = async ({ email, password, loginFormReset }: LoginProps) => {
    setIsLoading(true);

    try {
      const response = await Axios.post("/auth/signin", {
        email,
        password,
      });

      console.log(response, "response from login");
      const { accessToken, refreshToken } = response.data;
      Cookies.set("access_token", accessToken, { expires: 7 }); // 1 hour
      Cookies.set("refresh_token", refreshToken, { expires: 7 }); // 7 days
      await fetchUserDetails(accessToken);
      setIsLoggedIn(true);
      loginFormReset();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const signup = async ({
    name,
    email,
    password,
    phoneNumber,
    formReset,
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
        formReset();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast.success("You are now logged out");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
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
