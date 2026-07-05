// src/hooks/useVirtualDesktops.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getVirtualDesktops,
  createVirtualMachine,
  deleteVirtualMachine,
  actionVm,
  getTemplate,
  getDetailVm,
} from "@/services/virtualDesktops.service";
import type { CreateVmType } from "@/schema/vm.schema";
import { handleSuccess } from "@/utils/handleSuccess";
import { handleError } from "@/utils/handleError";
export const useVirtualDesktops = () => {
  return useQuery({
    queryKey: ["vms"],
    queryFn: getVirtualDesktops,
  });
};

export const useDetailVm = (vmid: number) => {
  return useQuery({
    queryKey: ["vm", vmid],
    queryFn: () => getDetailVm(vmid),
    enabled: !!vmid,
  });
};
export const useGetTemplate = (enabled = false) => {
  return useQuery({
    queryKey: ["vms/templates"],
    queryFn: getTemplate,
    enabled,
  });
};
export const useCreateVm = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVmType) => createVirtualMachine(payload),
    onSuccess: (data) => {
      handleSuccess(data.message);
      // Refresh tabel VM dan tabel User
      queryClient.invalidateQueries({ queryKey: ["vms"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

export const useDeleteVm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vmid: number) => deleteVirtualMachine(vmid),
    onSuccess: () => {
      handleSuccess("Berhasil Delete VM!");
      queryClient.invalidateQueries({ queryKey: ["vms"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

export const useActionVm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      vmid,
      action,
    }: {
      vmid: number | null | undefined;
      action: string;
    }) => actionVm(vmid, action),
    onSuccess: (data, variables) => {
      handleSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ["vms"] });
      queryClient.invalidateQueries({ queryKey: ["vm", variables.vmid] });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
