import { useState } from "react";
import { loginUser } from "../api/authApi";
import { LoginRequest, LoginResponse } from "../types/authTypes";
import { saveToStorage } from "../utils/storage";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);
      const data: LoginResponse = await loginUser(credentials);

      // Store tokens securely
      saveToStorage("accessToken", data.accessToken);
      if (data.refreshToken) saveToStorage("refreshToken", data.refreshToken);

      return data;
    } catch (err: any) {
      const backendMessage = err.response?.data?.message || "An unexpected error occurred.";
      setError(backendMessage);
      throw new Error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
