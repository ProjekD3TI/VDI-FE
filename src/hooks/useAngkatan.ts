import { useQuery } from "@tanstack/react-query";
import { getAngkatan } from "@/services/angkatan.service";

export const useAngkatan = () => {
  return useQuery({
    queryKey: ["angkatan"],
    queryFn: getAngkatan,
  });
};
