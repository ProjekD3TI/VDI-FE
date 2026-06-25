import { useQuery } from "@tanstack/react-query";
import { getAngkatan, getRegisterAngkatan } from "@/services/angkatan.service";

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
