import ModalFormCreateUser from "@/components/ModalFormCreateUser";
import ModalFormCreateVM from "@/components/ModalFormCreateVM";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserType } from "@/schema/user.schema";
import { getUser } from "@/services/user.service";
import { MoreHorizontalIcon } from "lucide-react";
import { use, useState } from "react";
import { toast } from "sonner";
const usersPromise = getUser();
const User = () => {
  // const [user, setUser] = useState<UserType[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set([]));
  const user = use(usersPromise) as UserType[]
  const selectAll = selectedRows.size === user.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(user.map((row) => row.nim)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (nim: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(nim);
    } else {
      newSelected.delete(nim);
    }
    setSelectedRows(newSelected);
  };
  return (
    <div className="w-full p-4">
      <div className="flex justify-between my-4">
        <ModalFormCreateUser/>
        <Button
          variant="outline"
          onClick={() =>
            toast.error("Event has not been created", {
              position: "top-center",
            })
          }
        >
          Error
        </Button>
        <Field orientation={"horizontal"} className="w-md">
          <Input type="search" placeholder="Search..." />
          <Button>Search</Button>
        </Field>
      </div>
      <div className="bg-card p-3 border rounded-md">
        <Table>
          <TableCaption>A list of your User</TableCaption>
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
              <TableHead className="w-25">NIM</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Angkatan</TableHead>
              <TableHead className="text-center">VMs</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.map((data) => (
              <TableRow>
                <TableCell>
                  <Checkbox
                    id={`row-${data.nim}-checkbox`}
                    name={`row-${data.nim}-checkbox`}
                    checked={selectedRows.has(data.nim)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(data.nim, checked === true)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium" key={data.nim}>
                  {data.nim}
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.username}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.angkatan}</TableCell>
                <TableCell className="text-center">
                  {data.has_vm === true ? (
                    "view VM"
                  ) : (
                    <ModalFormCreateVM id={data.id} />
                  )}
                </TableCell>
                {/* <TableCell>
                  {data.vm_id ? data.vm_id :   <ModalFormCreateVM id={data.id} />}
                </TableCell> */}
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
                      <DropdownMenuItem>Detail</DropdownMenuItem>
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

export default User;
