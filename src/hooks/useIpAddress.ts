import {
  getAvailableIpAddress,
  getIpAddresses,
} from "@/services/ipAddress.service";
import { useQuery } from "@tanstack/react-query";

export const useIpAddress = () => {
  return useQuery({
    queryKey: ["ipAddress"],
    queryFn: getIpAddresses,
  });
};

export const useAvailableIpAddress = (enabled = false) => {
  return useQuery({
    queryKey: ["availableIpAddresses"],
    queryFn: getAvailableIpAddress,
    enabled
  });
};
