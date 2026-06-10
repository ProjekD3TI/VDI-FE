import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import {
  useActionVm,
  useDeleteVm,
  useVirtualDesktops,
} from "@/hooks/useVirtualDesktops";

import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "react-router";
import { SkeletonTable } from "@/components/skeleteton/SkeletonTable";

const VirtualDesktopTable = () => {
  const { data: data = [] ,isLoading : loadData} = useVirtualDesktops();
  const { mutate: removeVm, isPending: isDeleting } = useDeleteVm();
  const {
    mutate: handleAction,
    isPending: isActionPending,
    variables,
  } = useActionVm();

  return (
    <Table>
      <TableCaption>A list of your recent Virtual Machines.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>VM ID</TableHead>
          <TableHead>Hostname</TableHead>
          <TableHead>User</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loadData ? (
          <SkeletonTable col={6} row={10} />
        ) : (
          data.map((data) => (
            <TableRow key={data.vmid}>
              <TableCell className="font-medium">{data.vmid}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.user}</TableCell>
              <TableCell>{data.ip_address}</TableCell>
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
                  <DropdownMenuContent align="center" className="space-y-2">
                    <DropdownMenuItem asChild>
                      <Button className="w-full" variant={"outline"} asChild>
                        <Link to={`/dashboard/virtual-desktop/${data.vmid}`}>
                          View Detail
                        </Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button
                        className="w-full"
                        // Panggil fungsi action dengan data spesifik baris ini
                        onClick={() =>
                          handleAction({
                            vmid: data.vmid,
                            action:
                              data.status === "running" ? "stop" : "start",
                          })
                        }
                        // Tombol disable saat ID VM ini sama dengan state loading
                        disabled={
                          isActionPending && variables?.vmid === data.vmid
                        }
                      >
                        {isActionPending && variables?.vmid === data.vmid ? (
                          <>
                            <Spinner />
                            Processing...
                          </>
                        ) : data.status === "running" ? (
                          "Stop"
                        ) : (
                          "Start"
                        )}
                      </Button>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent size="sm">
                        <AlertDialogHeader>
                          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                          </AlertDialogMedia>
                          <AlertDialogTitle>
                            Delete Vritual Machine?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this chat conversation.
                            View <a href="#">Settings</a> delete any memories
                            saved during this chat.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel variant="outline">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => removeVm(data.vmid)}
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <div>
                                <Spinner /> Deleting ...
                              </div>
                            ) : (
                              "Delete"
                            )}
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
  );
};

export default VirtualDesktopTable;
