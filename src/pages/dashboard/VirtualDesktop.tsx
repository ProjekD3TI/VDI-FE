import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { VmTypes } from "@/schema/vm.schema";
import { getVirtualDesktops } from "@/services/virtualDesktops.service";
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";

const VirtualDesktop = () => {
  const [vm, setVm] = useState<VmTypes[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set(["1"]));

  const selectAll = selectedRows.size === vm.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(vm.map((row) => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };
  useEffect(() => {
    const loadVm = async () => {
      const data = await getVirtualDesktops();
      setVm(data);
    };
    loadVm();
  }, []);
  return (
    <div className="w-full p-4">
      <Button variant={"secondary"} className="mb-4">
        Create New VM
      </Button>
      <div className="bg-card p-3 border rounded-md">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <Checkbox
                  id="select-all-checkbox"
                  name="select-all-checkbox"
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-25">VM ID</TableHead>
              <TableHead>Storage</TableHead>
              <TableHead>RAM</TableHead>
              <TableHead>Hostname</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vm.map((data) => (
              <TableRow>
                <TableCell>
                  <Checkbox
                    id={`row-${data.id}-checkbox`}
                    name={`row-${data.id}-checkbox`}
                    checked={selectedRows.has(data.id)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(data.id, checked === true)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{data.storage}</TableCell>
                <TableCell>{data.ram}</TableCell>
                <TableCell>{data.hostname}</TableCell>
                <TableCell>{data.ip_address}</TableCell>
                <TableCell
                  className={`${data.status === "Running" ? "text-secondary" : "text-primary"}`}
                >
                  {data.status}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="warning">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VirtualDesktop;
