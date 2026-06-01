import api from "@/api/axiosInstance";
import { VmSchema } from "@/schema/vm.schema";
import z from "zod";

export const getVirtualDesktops = async () => {
  try {
    const response = await api.get("/virtual-desktops");
    const schema = z.array(VmSchema);
    return schema.parse(response.data);
  } catch (error) {
    console.error("Error fetching virtual desktops:", error);
    throw error;
  }
};
export interface CreateVmPayload {
  template_id: number;
  user_id: number;
  ip_address: string;
}

export const createVirtualMachine = async (payload: CreateVmPayload) => {
  try {
    const response = await api.post("/vms", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating VM:", error);
    throw error;
  }
};