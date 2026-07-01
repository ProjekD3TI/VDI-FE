import { useState } from "react";
import { useCreateAngkatan } from "./useAngkatan";
import { CreateAngkatanSchema } from "@/schema/angkatan.schema";
import { toast } from "sonner";
import axios from "axios";

export const useCreateAngkatanForm = () => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: addAngkatan, isPending } = useCreateAngkatan();

  const [formData, setFormData] = useState({
    angkatan: new Date().getFullYear(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = CreateAngkatanSchema.safeParse(formData);

    if (!result.success) {
      console.log("error");
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      console.log(fieldErrors);
      setErrors(fieldErrors);
      return;
    }

    try {
      await addAngkatan(result.data);

      setFormData({
        angkatan: new Date().getFullYear(),
      });

      setOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        const backendErrors = error.response.data.error;
        const fieldErrors: Record<string, string> = {};

        Object.keys(backendErrors).forEach((key) => {
          fieldErrors[key] = backendErrors[key][0];
        });

        setErrors(fieldErrors);
      } else {
        toast.error("Terjadi kesalahan.");
        console.error(error);
      }
    }
  };
  return {
    errors,
    formData,
    handleChange,
    handleSubmit,
    open,
    isPending,
    setOpen,
  };
};
