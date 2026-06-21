import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { Plugin, TooltipItem } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ICpu {
  usedCpu?: number;
  totalCpu?: number;
}

interface CenterTextOptions {
  text: string;
}

const centerTextPlugin: Plugin<"doughnut"> = {
  id: "centerText",

  afterDraw(chart, _args, options) {
    const { ctx } = chart;

    const meta = chart.getDatasetMeta(0);

    if (!meta?.data?.length) return;

    const arc = meta.data[0];

    const centerX = arc.x;
    const centerY = arc.y;

    const { text } = options as CenterTextOptions;

    ctx.save();

    ctx.font = "bold 48px sans-serif";
    ctx.fillStyle = "#d87943";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Semi doughnut perlu sedikit offset ke bawah
    ctx.fillText(text, centerX, centerY - 20);

    ctx.restore();
  },
};

const SemiDoughnutChart = ({ usedCpu = 0, totalCpu = 0 }: ICpu) => {
  const remainingCpu = Math.max(0, totalCpu - usedCpu);

  const percentage =
    totalCpu > 0 ? ((usedCpu / totalCpu) * 100).toFixed(1) : "0.0";

  const data = {
    datasets: [
      {
        data: [usedCpu, remainingCpu],
        backgroundColor: ["#d87943", "#e5e7eb"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,

    rotation: -90,
    circumference: 180,

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"doughnut">) => {
            return `${context.raw} CPU`;
          },
        },
      },

      // opsi untuk plugin custom
      centerText: {
        text: `${percentage}%`,
      },
    },
  };

  return (
    <div className="w-full max-w-100">
      <Doughnut
        className=""
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
      />

      <div className="text-center -mt-6">
        <span className="text-primary">{totalCpu}</span> vCPU cores allocated
      </div>
    </div>
  );
};

export default SemiDoughnutChart;
