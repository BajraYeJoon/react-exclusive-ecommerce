import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { sendOtp, verifyOtp } from "../../api/forgotPassword";
import { useRecoilValue } from "recoil";
import { emailState } from "../../../user-portal/atoms/emailstate";
import { toast } from "sonner";
import Cookies from "js-cookie";
const OtpVerificationForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const email = useRecoilValue(emailState);

	const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
		const otpbyUser = data.code1 + data.code2 + data.code3 + data.code4;

		const payload = {
			otp: otpbyUser,
			password: data.newpassword,
		};

		const result = await verifyOtp(payload);
		if (result) {
			navigate("/sign-in");
			Cookies.remove("key");
		}
	};

	const resendOtp = async () => {
		try {
			const response = await sendOtp(email);

			if (response.status === 200) {
				toast.success("please check your email for OTP again");
				navigate("/verify-otp", {
					replace: true,
					state: { key: new Date().getTime() },
				});
			}
		} catch (error) {
			toast.error("failed to resend OTP");
		}
	};

	return (
		<div className="relative mx-auto w-full max-w-lg rounded-2xl bg-white px-6 pb-9 pt-10 shadow-xl">
			<div className="mx-auto flex w-full max-w-md flex-col space-y-16">
				<div className="flex flex-col items-center justify-center space-y-2 text-center">
					<div className="text-3xl font-semibold">
						<p>Email Verification</p>
					</div>
					<div className="flex flex-row text-sm font-medium text-gray-400">
						<p>We have sent a code to your {email}</p>
					</div>
				</div>

				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col space-y-16">
							<div className="mx-auto flex w-full max-w-xs flex-row items-center justify-between">
								{["code1", "code2", "code3", "code4"].map((code) => (
									<div className="h-16 w-16" key={code}>
										<Input
											type="text"
											maxLength={1}
											pattern="\d*"
											inputMode="numeric"
											onInput={(e) => {
												e.currentTarget.value = e.currentTarget.value.replace(
													/[^0-9]/g,
													"",
												);
											}}
											{...register(code, {
												required: "This field is required",
											})}
										/>
										{errors[code] && (
											<p className="text-sm text-red-500">
												{errors[code].message?.toString()}
											</p>
										)}
									</div>
								))}
							</div>

							<div className="h-16 w-full">
								<Input
									type="text"
									{...register("newpassword", {
										required: "This field is required",
									})}
								/>
								{errors.newpassword && (
									<p className="text-sm text-red-500">
										{errors.newpassword.message?.toString()}
									</p>
								)}
							</div>
						</div>

						<Button type="submit">Reset Password</Button>
					</form>

					<div className="flex flex-row items-center justify-center space-x-1 text-center text-sm font-medium text-gray-500">
						<p>Didn't receive code?</p>
						<Button onClick={resendOtp}>Resend</Button>
						{}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OtpVerificationForm;
