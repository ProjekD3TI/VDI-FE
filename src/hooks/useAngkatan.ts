import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAngkatan,
  getAngkatan,
  getRegisterAngkatan,
} from "@/services/angkatan.service";
import type { AngkatanType } from "@/schema/angkatan.schema";
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
export const useCreateAngkatan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AngkatanType) => createAngkatan(payload),
    onSuccess: (response) => {
      handleSuccess(response.message);
      queryClient.invalidateQueries({ queryKey: ["angkatan"] });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
