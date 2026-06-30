// hooks/useCreateUserForm.ts
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CreateUserSchema } from "@/schema/user.schema";
import { useCreateUser } from "@/hooks/useUsers";

export const useCreateUserForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: addUser, isPending } = useCreateUser();
  const [success, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    nim: "",
    name: "",
    username: "",
    email: "",
    angkatan_id: "",
  });

  const handleCloseDialog = () => {
    setIsSuccess(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      angkatan_id: value,
    }));

    if (errors.angkatan_id) {
      setErrors((prev) => ({ ...prev, angkatan_id: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = CreateUserSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      toast.error("Validation failed.", { position: "top-center" });
      return;
    }

    try {
      await addUser(result.data);

      // Reset Form jika sukses
      setFormData({
        nim: "",
        name: "",
        username: "",
        email: "",
        angkatan_id: "",
      });
      setIsOpen(false);
      setErrors({});
      setIsSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        const backendErrors = error.response.data.error;
        const fieldErrors: Record<string, string> = {};

        Object.keys(backendErrors).forEach((key) => {
          fieldErrors[key] = backendErrors[key][0];
        });

        setErrors(fieldErrors);
      } else {
        console.error(error);
      }
    }
  };

  return {
    isOpen,
    setIsOpen,
    formData,
    errors,
    isPending,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleCloseDialog,
    success,
  };
};
