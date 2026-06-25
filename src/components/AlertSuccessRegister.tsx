import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { UserCheck } from "lucide-react";
interface IProps {
  open: boolean;
  handleCloseDialog: () => void;
}
const AlertSuccessRegister = ({ open, handleCloseDialog }: IProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <UserCheck />
          </AlertDialogMedia>
          <AlertDialogTitle>Registration Success</AlertDialogTitle>
          <AlertDialogDescription>
            You have successfully registered. Please check your email to verify
            your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            variant="outline"
            className="col-span-2"
            onClick={handleCloseDialog}
          >
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertSuccessRegister;
