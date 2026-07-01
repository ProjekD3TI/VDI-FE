import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetAngkatanById, useEditAngkatan } from "@/hooks/useAngkatan";

interface IProps {
  id: number;
}

export function ModalEditAngkatan({ id }: IProps) {
  // 1. Tambahkan state untuk mengontrol buka/tutup Dialog
  const [open, setOpen] = useState(false);
  console.log(id);
  const { data, isLoading } = useGetAngkatanById(id);

  // 2. Ambil fungsi mutate dan status pending dari hook useEditAngkatan
  const { mutate: editAngkatan, isPending } = useEditAngkatan();

  // 3. Handler saat form disubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const angkatanValue = formData.get("angkatan");
    console.log(angkatanValue);
    if (!angkatanValue) return;

    // Memanggil fungsi editAngkatan dengan payload yang sesuai (id dan tahun angkatan)
    editAngkatan(
      {
        angkatan: Number(angkatanValue),
        id,
      },
      {
        onSuccess: () => {
          // Hanya ditutup jika API sukses
          setOpen(false);
        },
        onError: (error) => {
          // Menangkap error API di sini
          console.error("Gagal edit:", error);
        },
      },
    );
  };

  return (
    // Hubungkan state 'open' ke komponen Dialog
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit angkatan</DialogTitle>
            <DialogDescription>
              Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="angkatan">Name</Label>
              {isLoading ? (
                <div className="text-sm text-muted-foreground">
                  Loading data...
                </div>
              ) : (
                <Input
                  id="angkatan"
                  name="angkatan"
                  defaultValue={data?.angkatan || ""}
                  type="text"
                  required
                />
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              {/* Pastikan type="button" agar tidak memicu submit saat klik Cancel */}
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            {/* 5. Disable tombol saat loading data atau sedang memproses penyimpanan */}
            <Button type="submit" disabled={isPending || isLoading}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
