import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthContext } from "../context/useAuthContext";
import { fetchUserDetails } from "../api/userApi";
import { Loading } from "./layout/Layout";
import { Button } from "../../common/ui/button";
import { GeneralInfo, Orders, PaymentInfo, TabNavigation } from "../components";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { cn } from "../../common/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../common/ui/dialog";
import { Card, CardContent } from "../../common/ui/card";
import { Label } from "../../common/ui/label";
import { Input } from "../../common/ui/input";
import ProfileHeader from "../components/profile/profileHeader";
import { AlertCircle } from "lucide-react";
import { Badge } from "../../common/ui/badge";

export function ProfilePage() {
	const [activeTab, setActiveTab] = useState("profile");
	const { logout } = useAuthContext();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();

	const {
		data: userdetail,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["userDetail"],
		queryFn: fetchUserDetails,
	});

	useEffect(() => {
		if (activeTab === "wishlist") {
			navigate("/favorites");
		}
	}, [activeTab, navigate]);

	if (isLoading)
		return (
			<div className="flex h-72 items-center justify-center md:h-[90vh]">
				<Loading />
			</div>
		);
	if (error) {
		toast.error(error.message);
		return <div>Error loading user details</div>;
	}

	return (
		<div className="relative mx-auto my-4 flex h-[70vh] w-full max-w-7xl flex-col px-4 lg:my-10 lg:flex-row lg:px-6">
			<aside
				className={cn(
					"fixed inset-y-0 left-0 z-40 w-64 transform bg-background p-6 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
					isSidebarOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<div className="mt-16 lg:mt-0">
					<h2 className="mb-4 text-lg font-semibold">Manage My Account</h2>
					<TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
					<Button onClick={logout} className="mt-6 w-full">
						<FaSignOutAlt className="mr-2" />
						Logout
					</Button>
				</div>
			</aside>

			<main className="flex-1 bg-foreground/5 p-6 lg:ml-6">
				<ProfileHeader
					userdetail={userdetail}
					setIsSidebarOpen={setIsSidebarOpen}
					isSidebarOpen={isSidebarOpen}
				/>

				{activeTab === "profile" && (
					<div className="flex flex-col gap-3">
						<VerifiedUser isEmailVerified={userdetail?.isEmailVerified} />
						<h2 className="mb-4 text-2xl font-medium">Profile Information</h2>
						<p className="mb-4">
							Here you can view and edit your profile information.
						</p>
						<Card className="border-none shadow-none">
							<CardContent className="mb-2 space-y-2 p-0">
								<div className="space-y-1">
									<Label htmlFor="name">Name</Label>
									<Input id="name" disabled defaultValue={userdetail?.name} />
								</div>
								<div className="space-y-1">
									<Label htmlFor="phone">Username</Label>
									<Input id="phone" disabled defaultValue={userdetail?.phone} />
								</div>
							</CardContent>
						</Card>
						<Dialog>
							<DialogTrigger asChild>
								<Button className="mt-4">Edit Profile</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Edit Your Profile</DialogTitle>
								</DialogHeader>
								<GeneralInfo userdetail={userdetail} />
							</DialogContent>
						</Dialog>
					</div>
				)}

				{activeTab === "address" && <PaymentInfo />}
				{activeTab === "orders" && <Orders />}
				{activeTab === "returns" && <div>My Returns Content</div>}
				{activeTab === "cancellations" && <div>My Cancellations Content</div>}
			</main>
		</div>
	);
}

function VerifiedUser({
	isEmailVerified,
}: Readonly<{ isEmailVerified: boolean }>) {
	return (
		<>
			{isEmailVerified ? (
				<Badge className="w-fit" variant={"default"}>
					Verified
				</Badge>
			) : (
				<div
					className="flex items-center gap-3 rounded-lg border border-primary p-4 text-primary"
					role="alert"
				>
					<AlertCircle className="h-5 w-5 flex-shrink-0" />
					<div>
						<p className="font-medium">Please verify your email</p>
						<p className="text-sm">
							We've sent a verification link to your registered mail. Please
							check your inbox and click the link to verify your account.
						</p>
					</div>
				</div>
			)}
		</>
	);
}
