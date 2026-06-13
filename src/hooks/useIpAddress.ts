import {
  getAvailableIpAddress,
  getIpAddresses,
} from "@/services/ipAddress.service";
import { useQuery } from "@tanstack/react-query";

export const useIpAddress = (page:number) => {
  return useQuery({
    queryKey: ["ipAddress",page],
    queryFn: ()=>getIpAddresses(page),
  });
};

export const useAvailableIpAddress = (enabled = false) => {
  return useQuery({
    queryKey: ["availableIpAddresses"],
    queryFn: getAvailableIpAddress,
    enabled
  });
};
