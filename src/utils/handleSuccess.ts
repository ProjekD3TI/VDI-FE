import { toast } from "sonner";

export const handleSuccess = (message: string) => {
  toast.success(message, { position: "top-center" });
};
