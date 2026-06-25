import { useMutation, useQuery } from "@tanstack/react-query";
import { resendVerifyEmail, verifyEmail } from "../services/email.service";
import { handleSuccess } from "@/utils/handleSuccess";
import { handleError } from "@/utils/handleError";

interface UseEmailVerificationProps {
  id: string | null;
  hash: string | null;
  expires: string | null;
  signature: string | null;
}

export const useEmailVerification = ({
  id,
  hash,
  expires,
  signature,
}: UseEmailVerificationProps) => {
  return useQuery({
    queryKey: ["verifyEmail", id, hash, signature],

    queryFn: () =>
      verifyEmail({
        id: id!,
        hash: hash!,
        expires: expires!,
        signature: signature!,
      }),

    enabled: !!id && !!hash && !!expires && !!signature,

    retry: false,

    refetchOnWindowFocus: false,
  });
};

export const useResendEmailVerification = (id: number) => {
  return useMutation({
    mutationFn: () => resendVerifyEmail(id),
    onSuccess: () => {
      handleSuccess("Verification resend to your email, please check");
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
