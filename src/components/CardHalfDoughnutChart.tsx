import React from "react";
import { Card } from "./ui/card";
import HalfDoughnutChart from "./HalfDoughnutChart";
import { type LucideProps } from "lucide-react";

interface Icard {
  tittle: string;
  percentage: number;
  total: number;
  text: string;
  Icon: React.ComponentType | React.ComponentType<LucideProps>;
}
const CardHalfDoughnutChart = ({
  tittle,
  percentage,
  total,
  text,
  Icon,
}: Icard) => {
  return (
    <Card className="w-full px-5 md:col-span-2">
      <div className="flex gap-2">
        <Icon className="text-primary" />
        {tittle}
      </div>
      <div className="flex justify-center">
        <HalfDoughnutChart percentage={percentage} total={total} text={text} />
      </div>
    </Card>
  );
};

export default CardHalfDoughnutChart;
