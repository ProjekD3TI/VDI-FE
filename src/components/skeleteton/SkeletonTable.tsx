import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "../ui/table";
interface IProps {
  row: number;
  col: number;
}
export function SkeletonTable({ row, col }: IProps) {
  return (
    <>
      {Array.from({ length: row }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: col }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
