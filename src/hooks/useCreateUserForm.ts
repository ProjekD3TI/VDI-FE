// hooks/useCreateUserForm.ts

import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { AngkatanType } from "@/schema/angkatan.schema";
import { CreateUserSchema } from "@/schema/user.schema";

import { getAngkatan } from "@/services/angkatan.service";
import { createUser } from "@/services/user.service";

interface UseCreateUserFormProps {
  refreshData?: () => void;
  onSuccess?: () => void;
}

const initialForm = {
  nim: "",
  name: "",
  username: "",
  email: "",
  angkatan_id: "",
};

export const useCreateUserForm = ({
  refreshData,
  onSuccess,
}: UseCreateUserFormProps) => {
  const [angkatan, setAngkatan] = useState<AngkatanType[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const loadAngkatan = async () => {
      try {
        const data = await getAngkatan();
        setAngkatan(data);
      } catch (error) {
        console.error(error);
      }
    };

    void loadAngkatan();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleAngkatanChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      angkatan_id: value,
    }));

    setErrors((prev) => ({
      ...prev,
      angkatan_id: "",
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setErrors({});
  };

  const handleSubmit = async () => {
    const result = CreateUserSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);

      toast.error("Data tidak valid", {
        position: "top-center",
      });

      return false;
    }

    try {
      await createUser(result.data);

      toast.success("Berhasil membuat user", {
        position: "top-center",
      });

      refreshData?.();

      resetForm();

      onSuccess?.();

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  return {
    angkatan,

    formData,
    errors,

    handleChange,
    handleAngkatanChange,

    handleSubmit,
    resetForm,
  };
};
