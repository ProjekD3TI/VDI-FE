import axios from "axios";
import { toast } from "sonner";

export const handleError = (
  error: unknown,
  defaultMessage = "Terjadi kesalahan pada server.",
) => {
  let errorMessage = defaultMessage;

  if (axios.isAxiosError(error)) {
    errorMessage =
      error.response?.data?.message || error.message || defaultMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast.error(errorMessage, { position: "top-center" });
};

