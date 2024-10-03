import { useForm } from "react-hook-form";
import { LoginFormData } from "../../schemas/types";
import { LoginFormSchema } from "../../schemas/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../common/ui/button";
import { AxiosError, useAuthContext } from "../../context/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { CgSpinner } from "react-icons/cg";
import { Routes } from "../../../admin/lib/links";
import { UserRoutes } from "../../utils/userLinks";
import { Input } from "../../../common/ui/input";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useIntl, FormattedMessage } from "react-intl";

const SignInPage = () => {
	const { login, isLoading } = useAuthContext();
	const navigate = useNavigate();
	const recaptcha = useRef<ReCAPTCHA>(null);
	const intl = useIntl();
	const {
		register,
		handleSubmit,
		reset: loginFormReset,
	} = useForm<LoginFormData>({
		resolver: zodResolver(LoginFormSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		const { email, password } = data;
		const captchaValue = recaptcha?.current?.getValue();

		if (!captchaValue) {
			toast.error(intl.formatMessage({ id: "signin.captchaError" }));
			return;
		}

		await login({ email, password, loginFormReset });
		const user = JSON.parse(Cookies.get("user") ?? "{}");

		try {
			if (user === Routes.Admin) {
				navigate(`/${Routes.Admin}/${Routes.Dashboard}`);
				toast.success(intl.formatMessage({ id: "signin.adminWelcome" }));
			} else if (user === "user") {
				navigate(`/${UserRoutes.Profile}`);
				toast.success(intl.formatMessage({ id: "signin.loginSuccess" }));
			}
		} catch (error) {
			console.error("Login error", error);
			const axiosError = error as AxiosError;
			toast.error(axiosError?.response?.data?.message);
		}
	};

	return (
		<div className="sign-up-content w-[400px] space-y-8">
			<h2 className="text-lg lg:text-3xl">
				<FormattedMessage id="signin.loginToAccount" />
			</h2>
			<p className="text-sm lg:text-base">
				<FormattedMessage id="signin.provideDetails" />
			</p>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div className="flex w-full flex-col gap-4">
					<Input
						type="text"
						placeholder={intl.formatMessage({ id: "signin.email" })}
						{...register("email")}
					/>

					<Input
						type="password"
						placeholder={intl.formatMessage({ id: "signin.password" })}
						{...register("password")}
					/>

					<ReCAPTCHA
						ref={recaptcha}
						sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ""}
					/>

					<Button type="submit" className="w-full">
						{isLoading ? (
							<CgSpinner className="animate-spin" size={20} />
						) : (
							<FormattedMessage id="signin.loginButton" />
						)}
					</Button>

					<div className="flex justify-between gap-5">
						<Link to={"/forgot-password"}>
							<p className="text-sm text-primary underline">
								<FormattedMessage id="signin.forgotPassword" />
							</p>
						</Link>
						<Link to={"/sign-up"}>
							<p className="text-sm underline">
								<FormattedMessage id="signin.dontHaveAccount" />
							</p>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export { SignInPage };
