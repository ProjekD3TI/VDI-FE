import { useRef, useState } from "react";

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
import { CreateUserSchema } from "@/schema/user.schema";
import { toast } from "sonner";
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
import { useCreateUser } from "@/hooks/useUsers";
import { Spinner } from "./ui/spinner";

const ModalFormCreateUser = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: angkatan = [], isLoading: isLoadingAngkatan } = useAngkatan();
  const { mutateAsync: addUser, isPending } = useCreateUser();
  const [formData, setFormData] = useState({
    nim: "",
    name: "",
    username: "",
    email: "",
    angkatan_id: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = CreateUserSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      toast.error("Data Tidak Valid!", { position: "top-center" });
      return;
    }

    try {
      await addUser(result.data);

      setFormData({
        nim: "",
        name: "",
        username: "",
        email: "",
        angkatan_id: "",
      });

      setIsOpen(false);
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

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
                value={formData.nim}
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
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    angkatan_id: value,
                  }))
                }
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
