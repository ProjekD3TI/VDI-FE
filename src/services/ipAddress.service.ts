import api from "@/api/axiosInstance";
import { ipAddressSchema } from "@/schema/ipAddress.schema";
import z from "zod";

export const getIpAddresses = async () => {
  const response = await api.get("/ip_address");
  const schema = z.array(ipAddressSchema);
  return schema.parse(response.data.data.data);
};

export const getAvailableIpAddress = async () => {
  const response = await api.get("/ip_address/available");
  const schema = z.array(ipAddressSchema);
  return schema.parse(response.data.data);
};
