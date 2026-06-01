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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getAvailableIpAddress } from "@/services/ipAddress.service";
import type { IpAddressType } from "@/schema/ipAddress.schema";
import { createVirtualMachine } from "@/services/virtualDesktops.service"; // Import service VM

type Props = {
  id: number;
};

const ModalFormCreateVM = ({ id }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  // States
  const [open, setOpen] = useState(false); // Kontrol modal manual
  const [user, setUser] = useState<UserType | null>(null);
  const [dataIps, setDataIps] = useState<IpAddressType[]>([]);
  const [selectedIp, setSelectedIp] = useState<string>("");

  // Loading States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIps = async () => {
      try {
        setIsLoading(true);
        const data = await getAvailableIpAddress();
        setDataIps(data);
      } catch (err) {
        setError("Gagal mengambil data IP Address dari server.");
      } finally {
        setIsLoading(false);
      }
    };

    // Hanya fetch IP jika modal sedang terbuka
    if (open) {
      fetchIps();
    }
  }, [open]); // Jadikan 'open' sebagai dependency

  useEffect(() => {
    const loadUser = async () => {
      const data = await getUserById(id);
      setUser(data);
    };

    if (open) {
      loadUser();
    }
  }, [id, open]);

  // Fungsi saat form disubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedIp) return;

    try {
      setIsSubmitting(true);

      const payload = {
        template_id: 23077, // Statis sementara, bisa dibuat dinamis nanti
        user_id: id,
        ip_address: selectedIp,
      };

      await createVirtualMachine(payload);

      // Jika berhasil, tutup modal dan kembalikan state IP ke awal
      setOpen(false);
      setSelectedIp("");

      // Opsional: Anda bisa tambahkan toast notification di sini
      alert("VM sedang dibuat dan dimasukkan ke antrean sistem!");
    } catch (err: any) {
      // Tangani error, misalnya jika backend mengembalikan error validasi 422
      alert(
        err.response?.data?.message || "Terjadi kesalahan saat membuat VM.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={"sm"}>Create VM</Button>
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
                    disabled={isLoading || !!error || isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          isLoading
                            ? "Memuat IP..."
                            : error
                              ? "Gagal memuat"
                              : "Pilih IP Address"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      <SelectGroup>
                        {dataIps.length === 0 && !isLoading ? (
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
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => formRef.current?.requestSubmit()}
            // Disable tombol saat meload data API, jika IP belum dipilih, atau saat proses submit
            disabled={isLoading || !selectedIp || isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalFormCreateVM;
