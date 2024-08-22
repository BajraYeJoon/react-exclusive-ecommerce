import { MenuIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useAuthContext } from "../../../context/useAuthContext";

const Header = () => {
  const { logout } = useAuthContext();
  return (
    <header className="mx-auto bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <h2 className="text-xl font-medium">Exclusive Admin</h2>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="profile-badge h-6 w-6 cursor-pointer overflow-hidden rounded-full bg-foreground/35"></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="block md:hidden">
            <MenuIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
