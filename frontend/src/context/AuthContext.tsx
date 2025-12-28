import { createContext, type ReactNode } from "react";
import type { AuthContextType } from "../types/Types";
import axios from "axios";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
  });

  const Register: AuthContextType["Register"] = async (userData) => {
    try {
      await api.post("/auth/register", userData);
    } catch (error) {
      console.error(error);
    }
  };

  const Login: AuthContextType["Login"] = async (userData) => {
    try {
      await api.post("/auth/login", userData);
    } catch (error) {
      console.error(error);
    }
  };

  const Logout: AuthContextType["Logout"] = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ Register, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
