// components/ModalFormCreateUser.tsx
import { useRef } from "react";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useAngkatan } from "@/hooks/useAngkatan";
import { useCreateUserForm } from "@/hooks/useCreateUserForm";
import { Spinner } from "./ui/spinner";

const ModalFormCreateUser = () => {
  const formRef = useRef<HTMLFormElement>(null);

  // Mengambil state dan logic dari custom hook
  const {
    isOpen,
    setIsOpen,
    formData,
    errors,
    isPending,
    handleChange,
    handleSelectChange,
    handleSubmit,
  } = useCreateUserForm();

  // Query data angkatan tetap dipanggil di level view
  const { data: angkatan = [], isLoading: isLoadingAngkatan } = useAngkatan();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create User</Button>
      </DialogTrigger>
      <DialogContent className="">
        <form ref={formRef} onSubmit={handleSubmit} className="md:w-116">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="grid min-w-74 grid-cols-1 md:grid-cols-2">
            <Field>
              <FieldLabel>NIM</FieldLabel>
              <Input
                name="nim"
                value={formData.nim.toUpperCase()}
                onChange={handleChange}
                placeholder="NIM"
                autoCapitalize="on"
              />
              {errors.nim && (
                <p className="text-xs text-red-500">{errors.nim}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama"
                className="capitalize"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-xs text-red-500">{errors.username}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>Angkatan</FieldLabel>
              <Select
                value={formData.angkatan_id}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Angkatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Angkatan</SelectLabel>
                    {isLoadingAngkatan ? (
                      <Spinner />
                    ) : (
                      angkatan.map((data) => (
                        <SelectItem key={data.id} value={String(data.id)}>
                          {data.angkatan}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.angkatan_id && (
                <p className="text-xs text-red-500">{errors.angkatan_id}</p>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{isPending ? <Spinner /> : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFormCreateUser;
