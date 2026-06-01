import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import {
  actionVm, // Jangan lupa import actionVm
  deleteVirtualMachine,
  getVirtualDesktops,
} from "@/services/virtualDesktops.service";
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";

const VirtualDesktop = () => {
  const [vm, setVm] = useState<VmTypes[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set([]));
  // Ubah state loading untuk menyimpan ID VM spesifik yang sedang diproses
  const [loadingActionId, setLoadingActionId] = useState<number | null>(null);

  const selectAll = vm.length > 0 && selectedRows.size === vm.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(vm.map((row) => String(row.vmid))));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (vmid: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(vmid);
    } else {
      newSelected.delete(vmid);
    }
    setSelectedRows(newSelected);
  };

  // Pindahkan fungsi loadVm ke luar useEffect agar bisa dipanggil kembali nanti
  
  useEffect(() => {
    const loadVm = async () => {
      const data = await getVirtualDesktops();
      setVm(data);
    };
    loadVm();
  }, []);

  const handleDelete = async (vmid: number) => {
    const isSuccess = await deleteVirtualMachine(vmid);
    if (isSuccess) {
      setVm((prev) => prev.filter((item) => item.vmid !== vmid));
    }
  };

  // Fungsi handle aksi VM baru yang menerima parameter currentVm
  const handleVmAction = async (currentVm: VmTypes) => {
  const action = currentVm.status === "running" ? "stop" : "start";
  
  // Set loading hanya untuk VM ini
  setLoadingActionId(currentVm.vmid);

  const result = await actionVm(currentVm.vmid, action);

  // Matikan loading
  setLoadingActionId(null);

  // Jika sukses, fetch ulang data dari server secara langsung
  if (result) {
    const updatedData = await getVirtualDesktops();
    setVm(updatedData);
  }
};

  return (
    <div className="w-full p-4">
      <Button variant={"secondary"} className="mb-4">
        Create New VM
      </Button>
      <div className="bg-card w-full p-3 border rounded-md">
        <Table>
          <TableCaption>A list of your recent Virtual Machines.</TableCaption>
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
              <TableHead>Template</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vm.map((data) => (
              <TableRow key={data.vmid}>
                <TableCell>
                  <Checkbox
                    id={`row-${data.vmid}-checkbox`}
                    name={`row-${data.vmid}-checkbox`}
                    checked={selectedRows.has(String(data.vmid))}
                    onCheckedChange={(checked) =>
                      handleSelectRow(String(data.vmid), checked === true)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{data.vmid}</TableCell>
                <TableCell>{data.storage}</TableCell>
                <TableCell>{data.ram}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.ip_address}</TableCell>
                <TableCell>{data.template_id}</TableCell>
                <TableCell
                  className={`${data.status === "running" ? "text-secondary" : "text-primary"}`}
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
                      <DropdownMenuItem asChild>
                        <Button
                          className="w-full"
                          // Panggil fungsi action dengan data spesifik baris ini
                          onClick={() => handleVmAction(data)}
                          // Tombol disable saat ID VM ini sama dengan state loading
                          disabled={loadingActionId === data.vmid}
                        >
                          {loadingActionId === data.vmid
                            ? "Processing..."
                            : data.status === "running"
                            ? "Stop"
                            : "Start"}
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="text-red-500 w-full"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the Virtual Machine from our
                              servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(data.vmid)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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