import api from "@/api/axiosInstance";

export interface VerifyEmailParams {
  id: string;
  hash: string;
  expires: string;
  signature: string;
}

export const verifyEmail = async ({
  id,
  hash,
  expires,
  signature,
}: VerifyEmailParams) => {
  const response = await api.get(`/email/verify/${id}/${hash}`, {
    params: {
      expires,
      signature,
    },
    headers: {
      Accept: "application/json",
    },
  });

  return response.data;
};
export const resendVerifyEmail = async (id:number) => {
  const response = await api.post(`/email/resend`, {
    id,
  });
  return response.data;
};
