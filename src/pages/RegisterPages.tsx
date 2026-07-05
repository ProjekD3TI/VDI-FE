import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useGetAngkatan } from "@/hooks/useAngkatan";
import { useCreateUserForm } from "@/hooks/useCreateUserForm";
import { useRef } from "react";
import AlertSuccessRegister from "@/components/AlertSuccessRegister";

export function RegisterPages() {
  const formRef = useRef<HTMLFormElement>(null);

  // Mengambil state dan logic dari custom hook
  const {
    formData,
    errors,
    isPending,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleCloseDialog,
    success,
  } = useCreateUserForm();

  // Query data angkatan tetap dipanggil di level view
  const { data: angkatan = [], isLoading: isLoadingAngkatan } =
    useGetAngkatan();

  return (
    <div className="w-full p-20 flex flex-col justify-center items-center h-screen ">
      <h1 className="text-2xl font-bold mb-5 w-xs md:w-md text-center">
        Welcome to br
        <span className="text-primary"> Virtual Desktop Infrastructure</span> D3
        TI !
      </h1>
      <AlertSuccessRegister
        handleCloseDialog={handleCloseDialog}
        open={success}
      />
      <Card className="w-fit p-5">
        <h1 className="text-center text-xl font-semibold mb-6">Register</h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="md:w-116 flex flex-col gap-3"
        >
          <FieldGroup className="grid min-w-74 grid-cols-1 md:grid-cols-2">
            <Field>
              <FieldLabel>NIM</FieldLabel>
              <Input
                name="nim"
                value={formData.nim.toUpperCase()}
                onChange={handleChange}
                placeholder="NIM"
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
            <Button type="submit" className="md:col-span-2">
              {isPending ? <Spinner /> : "Submit"}
            </Button>
          </FieldGroup>
        </form>
      </Card>
    </div>
  );
}
