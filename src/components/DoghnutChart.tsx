import { Chart as ChartJS, ArcElement, Tooltip, Legend, type TooltipItem } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Registrasi komponen Chart.js yang diperlukan
ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
  used: number;
  free: number;
}

const DoghnutChart = ({ used, free }: IProps) => {
  const data = {
    labels: ["Used", "Free"], // Mengubah label agar lebih relevan dengan props
    datasets: [
      {
        data: [used, free],
        backgroundColor: ["#d87943", "#e5e7eb"], // PERBAIKAN: Menambahkan '#' pada e5e7eb
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context:TooltipItem<'doughnut'>) => {
            return ` ${context.label}: ${context.raw} GB`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-64">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoghnutChart;
