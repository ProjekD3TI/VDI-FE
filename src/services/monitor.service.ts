import api from "@/api/axiosInstance";
import { DetailMonitorSchema } from "@/schema/monitor.schema";

export const getDetail = async () => {
  const response = await api.get("/monitor");
  return DetailMonitorSchema.parse(response.data.data);
};
