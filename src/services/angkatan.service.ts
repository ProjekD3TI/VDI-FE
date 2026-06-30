import api from "@/api/axiosInstance";
import { AngkatanSchema, type AngkatanType } from "@/schema/angkatan.schema";
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

export const createAngkatan = async (payload: AngkatanType) => {
  const response = await api.post("/angkatan", payload);
  return response.data;
};
export const editAngkatan = async (id: number) => {
  const response = await api.delete(`/angkatan/${id}`);
  return response.data;
};
