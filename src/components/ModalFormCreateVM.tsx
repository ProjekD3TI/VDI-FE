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
import { useRef, useState } from "react";
import { getUserById } from "@/services/user.service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useQuery } from "@tanstack/react-query";
import { useCreateVm, useGetTemplate } from "@/hooks/useVirtualDesktops";
import { useAvailableIpAddress } from "@/hooks/useIpAddress";

type Props = {
  id: number;
};

const ModalFormCreateVM = ({ id }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedIp, setSelectedIp] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: open,
  });
  const {
    data: dataIps = [],
    isLoading: isLoadingIps,
    isError: isErrorIps,
  } = useAvailableIpAddress(open);
  const {
    data: template = [],
    isLoading: isLoadingTemplate,
    isError: isErrorTemplate,
  } = useGetTemplate(open);
  const { mutate: createVm, isPending: isSubmitting } = useCreateVm(() => {
    setOpen(false); // Tutup modal jika sukses
    setSelectedIp(""); // Reset IP
    setSelectedTemplate(null);
  });
  // Fungsi saat form disubmit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIp || !selectedTemplate) return;

    createVm({
      template_id: selectedTemplate!,
      user_id: id,
      ip_address: selectedIp,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Create VM</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Virtual Machine</AlertDialogTitle>
          <AlertDialogDescription className="overflow-y-auto" asChild>
            <form
              className="max-h-64 md:max-h-none text-foreground"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input id="name" value={user?.name || ""} readOnly />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" value={user?.email || ""} readOnly />
                </Field>
                <Field>
                  <FieldLabel htmlFor="angkatan">Angkatan</FieldLabel>
                  <Input id="angkatan" value={user?.angkatan || ""} readOnly />
                </Field>
                <Field>
                  <FieldLabel htmlFor="nim">Nomor Induk Mahasiswa</FieldLabel>
                  <Input id="nim" value={user?.nim || ""} readOnly />
                </Field>
              </div>

              <FieldSeparator className="my-4" />

              <div className="my-2">
                <h4 className="text-md text-foreground font-semibold">
                  Authentication Virtual Machine
                </h4>
                <span className="text-[10px] italic text-muted-foreground">
                  Password dibuat secara otomatis.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input id="username" value={user?.username || ""} readOnly />
                </Field>
                <Field>
                  <FieldLabel htmlFor="ipaddress">IP Address</FieldLabel>

                  <Select
                    value={selectedIp}
                    onValueChange={setSelectedIp}
                    disabled={isLoadingIps || isErrorIps || isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          isLoadingIps
                            ? "Memuat IP..."
                            : isErrorIps
                              ? "Gagal memuat"
                              : "Pilih IP Address"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="max-h-50">
                      <SelectGroup>
                        {dataIps.length === 0 && !isLoadingIps ? (
                          <div className="p-2 text-sm text-center">
                            IP Habis/Kosong
                          </div>
                        ) : (
                          dataIps.map((ip) => (
                            <SelectItem key={ip.id} value={ip.ip_address}>
                              {ip.ip_address}
                            </SelectItem>
                          ))
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="ipaddress">Template</FieldLabel>

                  <Select
                    value={selectedTemplate?.toString() ?? ""}
                    onValueChange={(value) =>
                      setSelectedTemplate(Number(value))
                    }
                    disabled={
                      isLoadingTemplate || isErrorTemplate || isSubmitting
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          isLoadingTemplate
                            ? "Memuat Template..."
                            : isErrorTemplate
                              ? "Gagal memuat"
                              : "Pilih Template"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      <SelectGroup>
                        {template.map((data) => (
                          <SelectItem
                            key={data.template_id}
                            value={String(data.template_id)}
                          >
                            {data.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => formRef.current?.requestSubmit()}
            // Disable tombol saat meload data API, jika IP belum dipilih, atau saat proses submit
            disabled={
              isLoadingIps || !selectedIp || !selectedTemplate || isSubmitting
            }
          >
            {isSubmitting ? "Creating..." : "Create"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalFormCreateVM;
