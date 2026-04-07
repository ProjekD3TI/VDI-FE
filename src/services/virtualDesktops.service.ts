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
