import api from "@/api/axiosInstance";
import { ipAddressSchema } from "@/schema/ipAddress.schema";
import z from "zod";

export const getIpAddresses = async (page: number) => {
  const response = await api.get(`/ip_address?page=${page}`);
  // const schema = z.array(ipAddressSchema);
  return response.data;
};

export const getAvailableIpAddress = async () => {
  const response = await api.get("/ip_address/available");
  const schema = z.array(ipAddressSchema);
  return schema.parse(response.data.data);
};
