import { Avatar, AvatarFallback, AvatarImage } from "../../../common/ui/avatar";
import { Button } from "../../../common/ui/button";
import { FaBars } from "react-icons/fa";

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
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				className="z-50 lg:hidden"
				size="icon"
			>
				<FaBars className="h-5 w-5" />
				<span className="sr-only">Toggle menu</span>
			</Button>
		</div>
	);
};

export default ProfileHeader;
