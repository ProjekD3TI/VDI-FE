import { SkeletonTable } from "@/components/skeleteton/SkeletonTable";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useState } from "react";
import { useSearchParams } from "react-router";

const IpAddress = () => {
  // 1. Tambahkan state untuk melacak halaman saat ini
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const {
    data: responseData,
    isLoading: isLoadData,
    isError,
  } = useIpAddress(page);

  const handlePageChange = (targetPage: number | null) => {
    if (targetPage) {
      setSearchParams({ page: targetPage.toString() });
    }
  };
  // console.log("data", responseData.data.data);
  const meta = responseData?.data;
  const ipList = meta?.data || [];

  const getPageNumber = (url: string | null) => {
    if (!url) return null;
    const urlObj = new URL(url);
    return Number(urlObj.searchParams.get("page"));
  };

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
      {meta && meta.last_page > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            {meta.links.map((link, index: number) => {
              const targetPage = getPageNumber(link.url);
              if (link.label.includes("Previous")) {
                return (
                  <PaginationItem key={index}>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(targetPage);
                      }}
                      className={
                        !link.url ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>
                );
              }

              if (link.label.includes("Next")) {
                return (
                  <PaginationItem key={index}>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(targetPage);
                      }}
                      className={
                        !link.url ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>
                );
              }

              if (link.label === "...") {
                return (
                  <PaginationItem key={index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={link.active}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(targetPage);
                    }}
                  >
                    {link.label}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default IpAddress;
