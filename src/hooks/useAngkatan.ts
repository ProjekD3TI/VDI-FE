import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAngkatan,
  deleteAngkatan,
  editAngkatan,
  getAngkatan,
  getAngkatanById,
  getRegisterAngkatan,
} from "@/services/angkatan.service";
import type {
  AngkatanType,
  CreateAngkatanType,
} from "@/schema/angkatan.schema";
import { handleSuccess } from "@/utils/handleSuccess";
import { handleError } from "@/utils/handleError";

export const useAngkatan = () => {
  return useQuery({
    queryKey: ["angkatan"],
    queryFn: getAngkatan,
  });
};
export const useGetAngkatan = () => {
  return useQuery({
    queryKey: ["register/angkatan"],
    queryFn: getRegisterAngkatan,
  });
};
export const useGetAngkatanById = (id: number) => {
  return useQuery({
    queryKey: ["angkatan", id],
    queryFn: () => getAngkatanById(id),
  });
};
export const useCreateAngkatan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAngkatanType) => createAngkatan(payload),
    onSuccess: (response) => {
      handleSuccess(response.message);
      queryClient.invalidateQueries({ queryKey: ["angkatan"] });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
export const useDeleteAngkatan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteAngkatan(id),
    onSuccess: (data) => {
      handleSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ["angkatan"] });
    },
    onError: (error) => [handleError(error)],
  });
};

export const useEditAngkatan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ angkatan, id }: AngkatanType) => editAngkatan(angkatan, id),
    onSuccess: (data) => {
      handleSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ["angkatan"] });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
