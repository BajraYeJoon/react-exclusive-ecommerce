import { MenuIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../common/ui/dropdown-menu";
import { useAuthContext } from "../../../user-portal/context/useAuthContext";
import { useState } from "react";
import SidebarContent from "../sidebar/SidebarContent";

const Header = () => {
  const [open, setOpen] = useState(false);

  const { logout } = useAuthContext();
  return (
    <header className="mx-auto bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <h2 className="text-base font-medium sm:text-xl">Exclusive Admin</h2>

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

          <div className="block cursor-pointer md:hidden">
            {open ? (
              <X onClick={() => setOpen(!open)} />
            ) : (
              <MenuIcon
                onClick={() => setOpen(!open)}
                className="overflow-hidden"
              />
            )}
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-100%" }}
                transition={{ duration: 0.5 }}
                className="absolute left-0 top-0 z-10 mt-16 h-full w-full backdrop-blur-sm md:hidden"
                onClick={() => setOpen(!open)}
              >
                <SidebarContent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
