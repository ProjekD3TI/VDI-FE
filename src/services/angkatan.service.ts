import api from "@/api/axiosInstance";
import {
  AngkatanSchema,
  type CreateAngkatanType,
} from "@/schema/angkatan.schema";
import z from "zod";
export const getAngkatan = async () => {
  const response = await api.get("/angkatan");
  const schema = z.array(AngkatanSchema);
  return schema.parse(response.data.data);
};
export const getRegisterAngkatan = async () => {
  const response = await api.get("/register/angkatan");
  const schema = z.array(AngkatanSchema);
  return schema.parse(response.data.data);
};

export const createAngkatan = async (payload: CreateAngkatanType) => {
  const response = await api.post("/angkatan", payload);
  return response.data;
};
export const editAngkatan = async (angkatan: number, id: number) => {
  const response = await api.put(`/angkatan/${id}`, { angkatan });
  return response.data;
};
export const deleteAngkatan = async (id: number) => {
  const response = await api.delete(`/angkatan/${id}`);
  return response.data;
};
export const getAngkatanById = async (id: number) => {
  const response = await api.get(`/angkatan/${id}`);
  return response.data.data;
};
