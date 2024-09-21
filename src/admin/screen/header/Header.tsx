import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LinkIcon, MenuIcon, X } from "lucide-react";
import { FcLandscape } from "react-icons/fc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../common/ui/dropdown-menu";
import { useAuthContext } from "../../../user-portal/context/useAuthContext";
import SidebarContent from "../sidebar/SidebarContent";
import { Button } from "../../../common/ui/button";
import useWindow from "../../../common/lib/useWindow";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { dimension } = useWindow();
  const { logout } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 w-full bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center justify-center gap-3">
          <FcLandscape size={30} />
          <h2 className="hidden font-ember text-base font-medium sm:block sm:text-xl">
            Exclusive Admin
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {dimension.width > 768 && <DashboardButton />}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="profile-badge h-6 w-6 cursor-pointer overflow-hidden rounded-full bg-foreground/35"></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {dimension.width < 768 && (
                <DropdownMenuLabel>
                  <DashboardButton />
                </DropdownMenuLabel>
              )}
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
        </div>
      </div>

      <MobileSidebar open={open} setOpen={setOpen} />
    </header>
  );
};

const MobileSidebar = ({ open, setOpen }) => (
  <AnimatePresence>
    {open && (
      <>
        <div
          className="fixed inset-0 top-16 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 overflow-y-auto bg-white shadow-lg lg:hidden"
        >
          <div className="p-4">
            <SidebarContent />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

function DashboardButton() {
  return (
    <Link to={"/"}>
      <Button>
        Visit Website <LinkIcon size={16} className="ml-2" />
      </Button>
    </Link>
  );
}

export default Header;
