import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Axios } from "../../../common/lib/axiosInstance";
import Cookies from "js-cookie";
import { Button } from "../../../common/ui/button";
import { BiErrorCircle } from "react-icons/bi";
import { CheckCircle2Icon } from "lucide-react";

export default function EmailVerification() {
	const [verificationStatus, setVerificationStatus] = useState<
		"loading" | "success" | "error"
	>("loading");
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const verifyEmail = async () => {
			const searchParams = new URLSearchParams(location.search);
			const token = searchParams.get("token");

			if (!token) {
				setVerificationStatus("error");
				toast.error("Token is missing or invalid.");
				return;
			}

			Cookies.set("email_verification_token", token);

			try {
				const response = await Axios.post(`/auth/verify-email/?token=${token}`);
				if (response.status === 200) {
					setVerificationStatus("success");
					toast.success("Email verified successfully!");
				} else if (response.status === 400) {
					setVerificationStatus("error");
					toast.error("Email verification failed.");
				}
			} catch (error) {
				console.error("Email verification failed:", error);
				setVerificationStatus("error");
				toast.error("Validation failed: numeric string is expected.");
			}
		};

		verifyEmail();
	}, [location]);

	const handleContinue = () => {
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md rounded-lg bg-background p-8 text-center shadow-lg">
				{verificationStatus === "loading" && (
					<>
						<div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-blue-500"></div>
						<h2 className="mb-2 text-2xl font-semibold text-gray-800">
							Verifying Your Email
						</h2>
						<p className="text-gray-600">
							Please wait while we confirm your email address...
						</p>
					</>
				)}

				{verificationStatus === "success" && (
					<>
						<CheckCircle2Icon />
						<h2 className="mb-2 text-2xl font-semibold text-gray-800">
							Email Verified Successfully!
						</h2>
						<p className="mb-6 text-gray-600">
							Your email has been verified. You can now log in to your account.
						</p>
						<Button onClick={handleContinue}>Continue to Login</Button>
					</>
				)}

				{verificationStatus === "error" && (
					<>
						<BiErrorCircle />
						<h2 className="mb-2 text-2xl font-semibold text-gray-800">
							Verification Failed
						</h2>
						<p className="mb-6 text-gray-600">
							There was an error verifying your email. The link may have expired
							or is invalid.
						</p>
						<Button onClick={() => navigate("/sign-up")}>
							Return to Sign Up
						</Button>
					</>
				)}
			</div>
		</div>
	);
}
