import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCreateAngkatanForm } from "@/hooks/useCreateAngkatanForm";

export default function ModalCreateAngkatan() {
  const {
    errors,
    formData,
    handleChange,
    handleSubmit,
    isPending,
    open,
    setOpen,
  } = useCreateAngkatanForm();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Angkatan</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Angkatan</DialogTitle>
          <DialogDescription>
            Masukkan tahun angkatan kemudian klik Save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="angkatan">Angkatan</Label>

              <Input
                id="angkatan"
                name="angkatan"
                value={Number(formData.angkatan)}
                onChange={handleChange}
              />

              {errors.angkatan && (
                <p className="mt-1 text-xs text-red-500">{errors.angkatan}</p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
