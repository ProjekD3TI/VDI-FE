import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { Plugin, TooltipItem } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ICpu {
  percentage?: number;
  total?: number;
  text: string;
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

    ctx.fillText(text, centerX, centerY - 20);

    ctx.restore();
  },
};

const HalfDoughnutChart = ({ percentage = 0, total = 0, text }: ICpu) => {
  // memastikan nilai tetap di range 0-100
  const usedPercentage = Math.min(100, Math.max(0, percentage));
  const remainingPercentage = 100 - usedPercentage;

  const data = {
    datasets: [
      {
        data: [usedPercentage, remainingPercentage],
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
          label: (context: TooltipItem<"doughnut">) => `${context.raw}%`,
        },
      },

      centerText: {
        text: `${percentage}%`,
      },
    },
  };

  return (
    <div className="w-full max-w-100">
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />

      <div className="text-center -mt-6">
        <span className="text-primary">{total}</span> {text}
      </div>
    </div>
  );
};

export default HalfDoughnutChart;
