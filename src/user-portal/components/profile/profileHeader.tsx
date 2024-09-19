import { Avatar, AvatarFallback, AvatarImage } from "../../../common/ui/avatar";
import { Button } from "../../../common/ui/button";
import { FaBars, FaTimes } from "react-icons/fa";

const ProfileHeader = ({
  userdetail,
  setIsSidebarOpen,
  isSidebarOpen,
}: any) => {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 sm:items-center">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="Profile picture"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <span>Welcome</span>
          <h1 className="text-2xl font-medium">{userdetail?.name}</h1>
          <p className="text-foreground/55">{userdetail?.email}</p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
      >
        {isSidebarOpen ? (
          <FaTimes size={24} className="text-primary" />
        ) : (
          <FaBars size={24} className="text-primary" />
        )}
        <span className="sr-only">
          {isSidebarOpen ? "Close menu" : "Open menu"}
        </span>
      </Button>
    </div>
  );
};

export default ProfileHeader;
