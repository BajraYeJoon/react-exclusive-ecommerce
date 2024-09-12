import { LinkIcon, MenuIcon, X } from "lucide-react";
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
import { Button } from "../../../common/ui/button";
import { Link } from "react-router-dom";
import useWindow from "../../../common/lib/useWindow";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { dimension } = useWindow();
  const { logout } = useAuthContext();

  return (
    <header className="mx-auto mt-4 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <h2 className="text-base font-medium sm:text-xl">Exclusive Admin</h2>

        <div className="flex items-center gap-4">
          {dimension.width > 768 && <DashboardButton />}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="profile-badge h-6 w-6 cursor-pointer overflow-hidden rounded-full bg-foreground/35"></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <DashboardButton />
              </DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="block cursor-pointer lg:hidden">
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
                className=":hidden absolute left-0 top-0 z-10 mt-20 h-full w-full backdrop-blur-sm"
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

function DashboardButton() {
  return (
    <Link to={"/"}>
      <Button>
        Visit Website <LinkIcon size={16} className="ml-2" />
      </Button>
    </Link>
  );
}
