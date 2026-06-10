import api from "@/api/axiosInstance";
import { AngkatanSchema } from "@/schema/angkatan.schema";
import z from "zod";
export const getAngkatan = async () => {
  const response = await api.get("/angkatan");
  const schema = z.array(AngkatanSchema);
  return schema.parse(response.data.data);
};
