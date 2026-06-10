import { SkeletonTable } from "@/components/skeleteton/SkeletonTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIpAddress } from "@/hooks/useIpAddress";
const IpAddress = () => {
  const { data: data = [], isLoading: isLoadData, isError } = useIpAddress();
  return (
    <div className="bg-card p-3 border rounded-md w-full m-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoadData || isError ? (
            <SkeletonTable row={20} col={3} />
          ) : (
            data.map((ip) => (
              <TableRow key={ip.id}>
                <TableCell>{ip.id}</TableCell>
                <TableCell>{ip.ip_address}</TableCell>
                <TableCell
                  className={` capitalize
                    ${ip.status === "free" ? "text-secondary" : "text-primary"}
                    `}
                >
                  {ip.status}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default IpAddress;
