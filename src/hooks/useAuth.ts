import { login, logout } from "@/services/auth.service";
import { handleError } from "@/utils/handleError";
import { handleSuccess } from "@/utils/handleSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      handleSuccess("Login berhasil!");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      // console.log("LOGIN ERROR", error);
      handleError(error.message);
    },
  });
};


export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.clear();
      handleSuccess("Berhasil Logout");
      navigate("/login", { replace: true });
    },
    onError: () => {
      localStorage.removeItem("token");
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
};
