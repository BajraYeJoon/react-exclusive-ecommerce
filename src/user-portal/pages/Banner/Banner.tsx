import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { UserRoutes } from "../../utils/userLinks";
import { useRecoilState } from "recoil";
import { languageState } from "../../atoms/languageState";

const countries = {
	en: "English",
	es: "Español",
	np: "नेपाली",
};

const Banner = () => {
	const [lang, setLang] = useRecoilState(languageState);

	const handleLanguageChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		setLang(event.target.value);
	};

	return (
		<div className="banner-container bg-foreground text-background">
			<div className="banner-content relative mx-6 flex flex-col items-center justify-center gap-3 py-3 md:flex-row md:gap-0 lg:mx-64">
				<div className="sale-message-container flex items-center gap-3 text-center max-2xl:max-w-2xl">
					<p className="sale-message text-[12px]">
						<FormattedMessage id="greeting" />
						<FormattedMessage id="saleMessage" />
						<Link
							to={`/${UserRoutes.Products}`}
							className="ml-4 cursor-pointer underline"
						>
							<FormattedMessage id="shopNow" />
						</Link>
					</p>
				</div>
				<div className="language-selector flex text-xs md:absolute md:right-0 md:top-2/4 md:-translate-y-2/4 md:text-base">
					<select
						className="cursor-pointer bg-transparent text-background"
						value={lang}
						onChange={handleLanguageChange}
					>
						{Object.entries(countries).map(([language, langName]) => (
							<option value={language} key={language}>
								{langName}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default Banner;
