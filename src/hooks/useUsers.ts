import type { CreateUserType } from "@/schema/user.schema";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
} from "@/services/user.service";
import { handleError } from "@/utils/handleError";
import { handleSuccess } from "@/utils/handleSuccess";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUser(page),
  });
};

export const useUserById = (id: number) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
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
