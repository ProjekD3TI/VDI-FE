import {
  ProxmoxMetricsSchema,
  type ChartMetrics,
  type ProxmoxMetrics,
} from "@/schema/monitor.schema";
import echoClient from "@/services/echo.service";
import { getDetail } from "@/services/monitor.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useMonitor = () => {
  const [metrics, setMetrics] = useState<ProxmoxMetrics | null>(null);
  const [chartData, setChartData] = useState<ChartMetrics>({
    labels: [],
    cpu: [],
    memory: [],
  });
  const MAX_DATA_POINTS = 15;

  useEffect(() => {
    const channel = echoClient.channel("proxmox-metrics");

    channel.listen(
      ".ProxmoxMetricsUpdated",
      (event: Record<string, unknown>) => {
        // Validasi data yang masuk menggunakan Zod
        const parsedData = ProxmoxMetricsSchema.safeParse(event.metrics);

        if (parsedData.success) {
          const liveData = parsedData.data;
          setMetrics(parsedData.data);

          const now = new Date();
          const timeLabel = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
          setChartData((prevData) => {
            // Masukkan data baru ke akhir array
            const updatedLabels = [...prevData.labels, timeLabel];
            const updatedCpu = [...prevData.cpu, liveData.cpu.usage_percentage];
            const updatedMemory = [...prevData.memory, liveData.memory.used_gb];

            return {
              labels: updatedLabels.slice(-MAX_DATA_POINTS),
              cpu: updatedCpu.slice(-MAX_DATA_POINTS),
              memory: updatedMemory.slice(-MAX_DATA_POINTS),
            };
          });
        } else {
          // Jika format data dari backend tidak sesuai, log errornya tanpa merusak UI
          console.error("Zod Validation Error:", parsedData.error.format());
        }
      },
    );

    return () => {
      channel.stopListening(".ProxmoxMetricsUpdated");
      echoClient.leaveChannel("proxmox-metrics");
    };
  }, []);

  return { metrics, chartData };
};
export const useGetDetailMonitor = () => {
  return useQuery({
    queryKey: ["monitor"],
    queryFn: getDetail,
  });
};
