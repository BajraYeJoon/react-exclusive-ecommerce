import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { languageState } from "../../atoms/languageState";

const countries = {
  en: "English",
  es: "Spanish",
};

const Banner = () => {
  // const [lang, setLang] = useRecoilState(languageState);

  return (
    <div className="banner-container bg-foreground text-background">
      <div className="banner-content relative mx-6 flex flex-col items-center justify-center gap-3 py-3 md:flex-row md:gap-0 lg:mx-64">
        <div className="sale-message-container flex items-center gap-3 text-center max-2xl:max-w-2xl">
          <p className="sale-message text-xs">
            <FormattedMessage id="app.greeting" />
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <Link to={"/"} className="ml-4 cursor-pointer underline">
              ShopNow
            </Link>
          </p>
        </div>
        <div className="language-selector flex text-xs md:absolute md:right-0 md:top-2/4 md:-translate-y-2/4 md:text-base">
          <select className="cursor-pointer bg-transparent text-background">
            {Object.entries(countries).map(([language, langName]) => (
              <option
                value={language}
                key={language}
                // onClick={() => setLang(language)}
              >
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
