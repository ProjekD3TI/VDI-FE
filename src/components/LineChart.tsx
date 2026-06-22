import { Field, FieldLabel } from "./ui/field";
import { Progress } from "./ui/progress";
interface IProps {
  name: string;
  used: number | undefined;
  total: number | undefined;
  percent: number | undefined;
}
const LineChart = ({ name, used = 0, total = 0, percent = 0 }: IProps) => {
  return (
    <Field className="w-full">
      <FieldLabel htmlFor="data">
        <span>{name}</span>
        <span className="ml-auto">{`${used}/${total}`}</span>
      </FieldLabel>
      <Progress value={used} max={total} id="data" />
      <FieldLabel htmlFor="data">
        <span className="ml-auto text-foreground/80 text-xs">{`${percent}% utitized`}</span>
      </FieldLabel>
    </Field>
  );
};

export default LineChart;
