import { useGetTemplate } from "@/hooks/useVirtualDesktops";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SkeletonTable } from "@/components/skeleteton/SkeletonTable";

const TemplateVMTable = () => {
  const { data: template = [], isLoading } = useGetTemplate(true);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>RAM</TableHead>
          <TableHead>CPU</TableHead>
          <TableHead>Storage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? <SkeletonTable col={5} row={5} /> : (
          template.map((data) => (
            <TableRow key={data.template_id}>
              <TableCell>{data.template_id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.ram}</TableCell>
              <TableCell>{data.cpu}</TableCell>
              <TableCell>{data.storage}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TemplateVMTable;
