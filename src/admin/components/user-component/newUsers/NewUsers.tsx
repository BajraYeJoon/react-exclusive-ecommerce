import { EyeIcon } from "lucide-react";
import { Button } from "../../../../common/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../common/ui/dialog";
import UserDialogContent from "../userDetail/UserDialogContent";

// interface NewUsersProps {
//   name: string;
//   email: string;
//   id: number;
//   // avatarlink: string;
// }

const NewUsers = ({ values }: any) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="h-8 w-8 rounded-full"
            src="https://i.pravatar.cc/300"
            alt="Neil image"
          />
        </div>
        <div className="ms-4 min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {values.name}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {values.email}
          </p>
        </div>
        <Dialog>
          <DialogTrigger
            className="flex items-center justify-center gap-2"
            asChild
          >
            <Button>
              <EyeIcon />
              View
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UserDialogContent info={values} />
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
};

export default NewUsers;
