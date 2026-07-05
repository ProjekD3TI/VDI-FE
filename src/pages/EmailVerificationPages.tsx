import VdiLogo from "@/assets/logo-text-with-icon.webp";
import { useSearchParams } from "react-router";
import {
  useEmailVerification,
  useResendEmailVerification,
} from "../hooks/useEmailVerification";
import { Card } from "@/components/ui/card";
import JoinVektor from "@/assets/join.svg";
import FailedVektor from "@/assets/failed.svg";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { isAxiosError } from "axios";
export default function EmailVerification() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const hash = searchParams.get("hash");
  const expires = searchParams.get("expires");
  const signature = searchParams.get("signature");

  const { data, isLoading, isError, isSuccess, error } = useEmailVerification({
    id,
    hash,
    expires,
    signature,
  });
  const { mutate: resendEmail, isPending: isResending } =
    useResendEmailVerification(Number(id));
  return (
    <div className="w-full flex flex-col gap-16 p-16 justify-center items-center min-h-screen">
      {isSuccess && (
        <>
          <img src={VdiLogo} className="w-30" />
          <Card className="w-fit max-w-md container p-10 flex flex-col items-center justify-center relative">
            <img src={JoinVektor} className="size-30 md:size-50 text-center" />
            <h1 className="font-semibold text-md md:text-2xl text-center">
              {data.message || "Thank you for verifying your email."}
            </h1>
            <span className="text-muted-foreground text-xs  text-center">
              Contact the admin for processing the building of your virtual
              machine.
            </span>
          </Card>
        </>
      )}
      {isLoading && (
        <>
          <img src={VdiLogo} className="w-30" />
          <Card className="w-fit max-w-md container p-10 flex flex-col items-center justify-center relative">
            <h1 className=" text-xs md:text-lg text-center">
              Verifying your email, please wait and don't close the window.
            </h1>
            <Spinner />
          </Card>
        </>
      )}
      {(!id || !hash) && (
        <>
          <img src={VdiLogo} className="w-30" />
          <Card className="w-fit max-w-md container p-10 flex flex-col items-center justify-center relative">
            <img
              src={FailedVektor}
              className="size-30 md:size-50 text-center"
            />
            <h1 className="font-semibold text-md md:text-2xl text-center">
              Link failed
            </h1>
            <span className="text-muted-foreground text-xs  text-center">
              Contact the admin for getting some help.
            </span>
          </Card>
        </>
      )}
      {isError && (
        <>
          <img src={VdiLogo} className="w-30" />
          <Card className="w-fit max-w-md  container p-10 flex flex-col items-center justify-center relative">
            <img
              src={FailedVektor}
              className="size-30 md:size-50 text-center"
            />
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-semibold text-md md:text-2xl text-center">
                {isAxiosError(error)
                  ? error.response?.data?.message ||
                    "Verification link has expired."
                  : "Verification link has expired."}
              </h1>
              <span className="text-muted-foreground text-xs text-center">
                You can request a new verification link below or contact the
                admin.
              </span>
            </div>
            {id && (
              <Button
                onClick={() => resendEmail()}
                disabled={isResending}
                className="w-full mt-2"
              >
                {isResending ? "Sending..." : "Resend Verification Email"}
              </Button>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
