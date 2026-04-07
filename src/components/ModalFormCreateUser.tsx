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
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./ui/select";

const ModalFormCreateUser = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Create User</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create User</AlertDialogTitle>
          <AlertDialogDescription>
            <form action="" className="md:w-116">
              <FieldGroup className="grid min-w-74 grid-cols-1 md:grid-cols-2">
                <Field>
                  <FieldLabel>NIM</FieldLabel>
                  <Input placeholder="name" />
                </Field>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input placeholder="name" />
                </Field>
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input placeholder="username" />
                </Field>
                <Field>
                  <FieldLabel>Angkatan</FieldLabel>
                  <Select>
                    <SelectTrigger>Pilih Angkatan</SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Create</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalFormCreateUser;
