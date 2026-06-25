// src/services/user.service.ts
import { UserSchema } from "@/schema/user.schema";
import api from "@/api/axiosInstance";
import type { CreateUserType } from "@/schema/user.schema"; // Sesuaikan path

export const getUser = async (page: number) => {
  const response = await api.get(`/users?page=${page}`);

  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  const schema = UserSchema;
  return schema.parse(response.data.data);
};

export const createUser = async (payload: CreateUserType) => {
  const response = await api.post("/register", payload);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
