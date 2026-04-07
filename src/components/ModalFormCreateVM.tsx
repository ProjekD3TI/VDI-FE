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
import { Button } from "./ui/button";
import { Field, FieldLabel, FieldSeparator } from "./ui/field";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { getUserById } from "@/services/user.service";
import type { UserType } from "@/schema/user.schema";

type Props = {
  id: number;
};
const ModalFormCreateVM = ({ id }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("first");
  };
  useEffect(() => {
    const loadUser = async () => {
      const data = await getUserById(id);
      setUser(data);
    };
    loadUser();
  }, [id]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"}> Create VM</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Virtual Machine</AlertDialogTitle>
          <AlertDialogDescription className="overflow-y-auto">
            <form
              className="max-h-64 md:max-h-none"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <Field>
                  <FieldLabel htmlFor="angkatan">Angkatan</FieldLabel>
                  <Input
                    id="angkatan"
                    placeholder="angkatan"
                    value={user?.angkatan}
                    readOnly
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    value={user?.email}
                    readOnly
                    placeholder="example@mail.com"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="nim">Nomor Induk Mahasiswa</FieldLabel>
                  <Input
                    id="nim"
                    placeholder="NIM"
                    value={user?.nim}
                    readOnly
                  />
                </Field>
              </div>
              <FieldSeparator className="my-2" />
              <div className="my-2">
                <div className="text-md text-foreground ">
                  Authentication Virtual Machine
                </div>
                <span className="text-[10px] italic">
                  IP Address dan Password dibuat secara otomatis.
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    placeholder="username"
                    value={user?.username}
                    readOnly
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="passsword" placeholder="password" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="ipaddress">IP Address</FieldLabel>
                  <Input id="ipaddress" placeholder="xxx.xxx.xxx.xxx" />
                </Field>
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => formRef.current?.requestSubmit()}>
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalFormCreateVM;
