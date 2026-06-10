import api from "@/api/axiosInstance";

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post("/login", payload);
  return response.data;
};
export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};
