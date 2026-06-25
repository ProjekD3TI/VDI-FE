import api from "@/api/axiosInstance";
import type { CreateUserType } from "@/schema/user.schema";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface OtpPayload {
  email: string;
  otp: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post("/login", payload);
  return response.data;
};
export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};
export const register = async (payload: CreateUserType) => {
  const response = await api.post("/register", payload);
  return response.data;
};

export const otp = async (payload: OtpPayload) => {
  const response = await api.post("/verify-otp", payload);
  return response.data;
};
