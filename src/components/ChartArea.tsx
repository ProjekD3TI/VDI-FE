import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartMetrics } from "@/schema/monitor.schema";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export function ChartArea(chartData: ChartMetrics) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0, // Mematikan animasi agar update realtime tidak patah-patah
    },
    scales: {
      // Sumbu Y untuk CPU (Kiri)
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "CPU Usage (%)",
          color: "#e78a53",
        },
      },
      // Sumbu Y untuk Memory (Kanan)
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        beginAtZero: true,
        // Hapus "max" agar Chart.js otomatis menyesuaikan dengan RAM servermu
        grid: {
          drawOnChartArea: false, // Mencegah garis grid bertabrakan dengan grid sumbu kiri
        },
        title: {
          display: true,
          text: "Memory Usage (GB)",
          color: "#5f8787",
        },
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "CPU Usage (%)",
        data: chartData.cpu,
        borderColor: "#e78a53",
        backgroundColor: "#623e29",
        fill: true,
        tension: 0.4,
        yAxisID: "y", // Hubungkan ke skala sumbu kiri
      },
      {
        label: "Memory Usage (GB)",
        data: chartData.memory,
        borderColor: "#5f8787",
        backgroundColor: "#003a3c",
        fill: true,
        tension: 0.4,
        yAxisID: "y1", // Hubungkan ke skala sumbu kanan
      },
    ],
  };

  return (
    <div className="w-full h-72">
      {" "}
      {/* Tambahkan tinggi tetap pada div agar grafik terlihat jelas */}
      <Line options={options} data={data} />
    </div>
  );
}
