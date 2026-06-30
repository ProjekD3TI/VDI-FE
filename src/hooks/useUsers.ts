import type { CreateUserType } from "@/schema/user.schema";
import { register } from "@/services/auth.service";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
} from "@/services/user.service";
import { handleError } from "@/utils/handleError";
import { handleSuccess } from "@/utils/handleSuccess";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUsers = (page: number, search: string) => {
  return useQuery({
    queryKey: ["users", page, search],
    queryFn: () => getUser(page, search),
  });
};

export const useUserById = (id: number) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserType) => register(payload),
    onSuccess: (data) => {
      handleSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
    onError: (error) => {
      console.log("ERROR REGISTER", error);
      handleError(error);
    },
  });
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserType) => createUser(payload),
    onSuccess: (data) => {
      handleSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (data) => {
      handleSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
