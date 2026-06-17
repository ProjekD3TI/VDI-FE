import ModalFormCreateUser from "@/components/ModalFormCreateUser";
import ModalFormCreateVM from "@/components/ModalFormCreateVM";
import { PaginationComponent } from "@/components/PaginationComponent";
import { SkeletonTable } from "@/components/skeleteton/SkeletonTable";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteUser, useUsers } from "@/hooks/useUsers";
import type { UserType } from "@/schema/user.schema";
import { MoreHorizontalIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router";
const UserPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: responseData, isLoading, isError } = useUsers(page);
  const { mutate: removeUser } = useDeleteUser();

  const handlePageChange = (targetPage: number) => {
    setSearchParams({ page: targetPage.toString() });
  };
   const meta = responseData?.data;
   const user = meta?.data || [];
   console.log(user)

  return (
    <div className="w-full p-4">
      <div className="flex justify-between my-4">
        <ModalFormCreateUser />
        <Field orientation={"horizontal"} className="w-md">
          <Input type="search" placeholder="Search..." />
          <Button>Search</Button>
        </Field>
      </div>
      <div className="bg-card p-3 border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
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
            {isLoading || isError ? (
              <SkeletonTable row={20} col={7} />
            ) : (
              user.map((data: UserType) => (
                <TableRow>
                  <TableCell className="font-medium" key={data.nim}>
                    {data.nim}
                  </TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.username}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.angkatan}</TableCell>
                  <TableCell className="text-center">
                    {data.vm_status === null ? (
                      <ModalFormCreateVM id={data.id} />
                    ) : data.vm_status === "creating" ? (
                      <Button disabled>
                        <Spinner /> Creating...
                      </Button>
                    ) : data.vm_status === "stopped" ||
                      data.vm_status === "running" ? (
                      <Button className="w-full" variant={"outline"} asChild>
                        <Link to={`/dashboard/virtual-desktop/${data.vmid}`}>
                          View
                        </Link>
                      </Button>
                    ) : null}
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
                                permanently delete{" "}
                                <span className="text-primary">
                                  {data.name}
                                </span>{" "}
                                from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => removeUser(data.id)}
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationComponent meta={meta} onPageChange={handlePageChange} />
    </div>
  );
};

export default UserPage;
