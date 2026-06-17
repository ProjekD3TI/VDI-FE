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
import type { IpAddressType } from "@/schema/ipAddress.schema";
import { useSearchParams } from "react-router";

// Sesuaikan path import komponen di bawah dengan struktur folder Anda
import { PaginationComponent } from "@/components/PaginationComponent";

const IpAddress = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: responseData,
    isLoading: isLoadData,
    isError,
  } = useIpAddress(page);

  // Fungsi ini sekarang selalu menerima angka berkat penanganan di dalam PaginationComponent
  const handlePageChange = (targetPage: number) => {
    setSearchParams({ page: targetPage.toString() });
  };

  const meta = responseData?.data;
  const ipList = meta?.data || [];

  return (
    <div className="flex flex-col w-full m-4 ">
      <div className="bg-card p-3 border rounded-md w-full h-fit">
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
              <SkeletonTable row={10} col={3} />
            ) : ipList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              ipList.map((ip: IpAddressType) => (
                <TableRow key={ip.id}>
                  <TableCell>{ip.id}</TableCell>
                  <TableCell>{ip.ip_address}</TableCell>
                  <TableCell
                    className={`capitalize ${
                      ip.status === "free" ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {ip.status}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Panggil komponen reusable di sini */}
      <PaginationComponent meta={meta} onPageChange={handlePageChange} />
    </div>
  );
};

export default IpAddress;
