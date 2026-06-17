// src/services/virtualDesktops.service.ts
import api from "@/api/axiosInstance";
import { DetailVmSchema, TemplateSchema, VmSchema } from "@/schema/vm.schema";
import z from "zod";

export interface CreateVmPayload {
  template_id: number;
  user_id: number;
  ip_address: string;
}

export const getVirtualDesktops = async () => {
  const response = await api.get("/vms");
  return z.array(VmSchema).parse(response.data.data);
};

export const getDetailVm = async(vmid:number)=>{
  const response = await api.get(`/vms/${vmid}`);
  return DetailVmSchema.parse(response.data.data);
}

export const createVirtualMachine = async (payload: CreateVmPayload) => {
  const response = await api.post("/vms", payload);
  return response.data;
};

export const deleteVirtualMachine = async (vmid: number) => {
  const response = await api.delete(`/vms/${vmid}`);
  return response.data;
};

export const actionVm = async (vmid: number | null | undefined, action: string) => {
  const response = await api.post(`/vms/${action}`, { vmid });
  return response.data;
};


export const getTemplate = async()=>{
    const response = await api.get('/vms/template');
    return z.array(TemplateSchema).parse(response.data.data)
}
