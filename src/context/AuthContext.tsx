import { createContext, useState, ReactNode } from "react";
import { getFromStorage, removeFromStorage, saveToStorage } from "../utils/storage";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(getFromStorage("accessToken"));

  const login = (token: string) => {
    saveToStorage("accessToken", token);
    setToken(token);
  };

  const logout = () => {
    removeFromStorage("accessToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
