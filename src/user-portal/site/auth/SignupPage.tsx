import { useForm } from "react-hook-form";
import { SignUpFormData } from "../../schemas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "../../schemas/zodSchema";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { Input } from "../../../common/ui/input";
import { Button } from "../../../common/ui/button";
import { CgSpinner } from "react-icons/cg";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { toast } from "sonner";
import { FormattedMessage, useIntl } from "react-intl";

const SignupPage = () => {
	const intl = useIntl();
	const recaptcha = useRef<ReCAPTCHA>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset: formReset,
	} = useForm<SignUpFormData>({
		mode: "all",
		resolver: zodResolver(SignUpFormSchema),
	});

	const { signup } = useAuthContext();

	const onSubmit = async (data: SignUpFormData) => {
		const { email, password, name, phoneNumber } = data;

		const captchaValue = recaptcha?.current?.getValue();

		if (!captchaValue) {
			toast.error(<FormattedMessage id="signup.captchaError" />);
			return;
		}

		try {
			await signup({ name, email, password, phoneNumber, formReset });
			recaptcha?.current?.reset();
		} catch (err) {
			console.error("Signup error", err);
			toast.error(<FormattedMessage id="signup.signupError" />);
		}
	};

	return (
		<div className="sign-up-content flex w-full flex-col space-y-4 sm:w-[400px]">
			<h2 className="text-lg lg:text-3xl">
				<FormattedMessage id="signup.createAccount" />
			</h2>
			<p className="text-sm lg:text-base">
				<FormattedMessage id="signup.enterDetails" />
			</p>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div className="flex w-full flex-col gap-4">
					<div>
						<Input
							type="text"
							placeholder={intl.formatMessage({ id: "signup.name" })}
							{...register("name", {
								setValueAs: (value: string) => value.trim(),
							})}
						/>
						{errors.name && (
							<span className="error text-xs text-primary">
								{errors.name.message}
							</span>
						)}
					</div>
					<div>
						<Input
							id="email"
							type="email"
							placeholder={intl.formatMessage({ id: "signup.email" })}
							{...register("email")}
						/>
						{errors.email && (
							<span className="error text-xs text-primary">
								{errors.email.message}
							</span>
						)}
					</div>
					<div>
						<Input
							type="password"
							placeholder={intl.formatMessage({ id: "signup.password" })}
							{...register("password", {
								setValueAs: (value: string) =>
									value.trim().replace(/\s+/g, " "),
							})}
						/>
						{errors.password && (
							<span className="error text-xs text-primary">
								{errors.password.message}
							</span>
						)}
					</div>
					<div>
						<Input
							type="text"
							placeholder={intl.formatMessage({ id: "signup.phoneNumber" })}
							{...register("phoneNumber")}
						/>
						{errors.phoneNumber && (
							<span className="error text-xs text-primary">
								{errors.phoneNumber.message}
							</span>
						)}
					</div>
					<ReCAPTCHA
						ref={recaptcha}
						sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? ""}
					/>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? (
							<CgSpinner className="animate-spin" size={20} />
						) : (
							<FormattedMessage id="signup.createAccountButton" />
						)}
					</Button>
				</div>
			</form>
			<div className="inline-flex gap-3 text-sm">
				<FormattedMessage id="signup.alreadyHaveAccount" />{" "}
				<Link to="/sign-in" className="text-primary underline">
					<FormattedMessage id="signup.signIn" />
				</Link>
			</div>
		</div>
	);
};

export { SignupPage };
