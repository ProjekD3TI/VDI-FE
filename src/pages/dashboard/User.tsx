import ModalFormCreateUser from "@/components/ModalFormCreateUser";
import ModalFormCreateVM from "@/components/ModalFormCreateVM";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
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
import { deleteUser, getUser } from "@/services/user.service";
import { MoreHorizontalIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
const User = () => {
  const [user, setUser] = useState<UserType[]>([]);
  // const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set([]));
   const [isLoading, setIsLoading] = useState<boolean>(true);
  // const selectAll = selectedRows.size === user.length;

  // const handleSelectAll = (checked: boolean) => {
  //   if (checked) {
  //     setSelectedRows(new Set(user.map((row) => row.nim)));
  //   } else {
  //     setSelectedRows(new Set());
  //   }
  // };
const loadData = useCallback(async () => {
    try {
      const data = await getUser();
      setUser(data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    } finally {
      setIsLoading(false);
    }
  }, []); 
  useEffect(() => {
    
    const timer = setTimeout(() => {
      void loadData();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadData]);

  // const handleSelectRow = (nim: string, checked: boolean) => {
  //   const newSelected = new Set(selectedRows);
  //   if (checked) {
  //     newSelected.add(nim);
  //   } else {
  //     newSelected.delete(nim);
  //   }
  //   setSelectedRows(newSelected);
  // };
  const handleDelete = async (id:number)=>{
    const isSuccess = await deleteUser(id);
    if(isSuccess){
      setUser((prev)=>prev.filter((item)=>item.id !== id))
    }
  }
   
  return (
    <div className="w-full p-4">
      <div className="flex justify-between my-4">
        <ModalFormCreateUser refreshData={loadData}/>
        <Field orientation={"horizontal"} className="w-md">
          <Input type="search" placeholder="Search..." />
          <Button>Search</Button>
        </Field>
      </div>
      <div className="bg-card p-3 border rounded-md">
        {isLoading ? (<Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>):(
<Table>
          <TableCaption>A list of your User</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-8">
                <Checkbox
                  id="select-all-checkbox"
                  name="select-all-checkbox"
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead> */}
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
                {/* <TableCell>
                  <Checkbox
                    id={`row-${data.nim}-checkbox`}
                    name={`row-${data.nim}-checkbox`}
                    checked={selectedRows.has(data.nim)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(data.nim, checked === true)
                    }
                  />
                </TableCell> */}
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
                              permanently delete <span className="text-primary">{data.name}</span>  from our
                              servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(data.id)}
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
        )}
        
      </div>
    </div>
  );
};

export default User;
