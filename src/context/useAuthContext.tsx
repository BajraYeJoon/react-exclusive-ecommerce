/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

type UserInfoProps = {
  username: string;
  password: string;
  name: string;
  phoneNumber: string;
};

type LoginProps = {
  name: string;
  password: string;
};

type AuthContextType = {
  user: UserInfoProps[];
  login: ({ name, password }: LoginProps) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfoProps[]>([]);

  const login = async ({ name, password }: LoginProps) => {
    console.log("Logging in", name, password);
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: name,
        password,
      });
      const data = response.data;
      Cookies.set("token", data.token, { expires: 7 });
      setUser(data);
      console.log("Login successful", data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
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
