// src/services/user.service.ts
import { UserSchema } from "@/schema/user.schema";
import api from "@/api/axiosInstance";
import z from "zod";
import type { CreateUserType } from "@/schema/user.schema"; // Sesuaikan path

export const getUser = async () => {
  const response = await api.get("/users");
  
  const schema = z.array(UserSchema);
  return schema.parse(response.data.data);
};

export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  const schema = UserSchema;
  return schema.parse(response.data.data);
};

export const createUser = async (payload: CreateUserType) => {
  const response = await api.post("/users", payload);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
