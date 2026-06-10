import { MoreHorizontalIcon } from "lucide-react";

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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import type { AngkatanType } from "@/schema/angkatan.schema";
import { getAngkatan } from "@/services/angkatan.service";

const Angkatan = () => {
  const [angkatan, setAngkatan] = useState<AngkatanType[]>([]);
  useEffect(() => {
    const loadData = async () => {
      const data = await getAngkatan();
      setAngkatan(data);
    };
    loadData();
  });
  return (
    <div className="w-full m-20 g-card p-3 border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Angkatan</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {angkatan.map((data) => (
            <TableRow>
              <TableCell className="font-medium">{data.angkatan}</TableCell>
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
                    <DropdownMenuItem variant="destructive">
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
  );
};
export default Angkatan;
