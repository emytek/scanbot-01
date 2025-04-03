import axiosInstance from "./axiosInstance";
import { LoginRequest, LoginResponse } from "../types/authTypes";

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/api/account/login", credentials);
  return response.data;
};
