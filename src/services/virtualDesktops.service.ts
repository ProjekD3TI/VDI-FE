import api from "@/api/axiosInstance";
import { VmSchema } from "@/schema/vm.schema";
import axios from "axios";
import { toast } from "sonner";
import z from "zod";

export const getVirtualDesktops = async () => {
  try {
    const response = await api.get("/vms");
    const schema = z.array(VmSchema);
    return schema.parse(response.data.data);
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

export const deleteVirtualMachine = async (vmid: number) => {
  try {
    await api.delete(`/vms/${vmid}`);
    toast.success("Delete VM Success", { position: "top-center" });
    return true;
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : String(error);
    toast.error(message, { position: "top-center" });
    return false;
  }
};

export const actionVm = async (vmid:number,action:string)=>{
  try{
    const response = await api.post(`/vms/${action}`,{vmid});
    toast.success(`Success to ${action} VM ${vmid}`,{position:'top-center'})
    return response.data
  }catch(error){
    console.error(error);
    let message = "Terjadi kesalahan sistem";

    // Validasi apakah error berasal dari Axios
    if (axios.isAxiosError(error)) {
        // TypeScript sekarang tahu 'error' memiliki properti response
        message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
        // Jika error javascript biasa
        message = error.message;
    }
    toast.error(message,{position:'top-center'})
  }
}