import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getIpAddresses } from "@/services/ipAddress.service";
import type { IpAddressType } from "@/schema/ipAddress.schema";
import { useEffect, useState } from "react";
const IpAddress = () => {
  const [dataIps, setDataIps] = useState<IpAddressType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIps = async () => {
      try {
        setIsLoading(true);
        const data = await getIpAddresses();
        setDataIps(data);
      } catch (err) {
        setError("Gagal mengambil data IP Address dari server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIps();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-center">Memuat data IP Address...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }
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
          {dataIps.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center h-24">
                Belum ada data IP Address.
              </TableCell>
            </TableRow>
          ) : (
            dataIps.map((ip) => (
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
