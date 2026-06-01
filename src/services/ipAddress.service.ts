import axiosInstance from "@/api/axiosInstance";
import type { IpAddressType } from "@/schema/ipAddress.schema";

export const getIpAddresses = async (): Promise<IpAddressType[]> => {
  try {
    const response = await axiosInstance.get("/ip_address");

    // Penanganan struktur data Laravel Pagination.
    // Jika backend: return response()->json(['data' => $ips])
    // Maka data aslinya ada di response.data.data.data
    const ips = response.data.data.data || response.data.data;

    return ips;
  } catch (error) {
    console.error("Error fetching IP Addresses:", error);
    throw error;
  }
};

export const getAvailableIpAddress = async (): Promise<IpAddressType[]> => {
  try {
    const response = await axiosInstance.get("/ip_address/available");
    const ips = response.data.data.data || response.data.data;
    return ips;
  } catch (error) {
    console.error("errpr fetching ip address", error);
    throw error;
  }
};
