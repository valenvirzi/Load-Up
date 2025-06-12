import { useTranslation } from "react-i18next";
import Footer from "../components/Navigation/Footer";
import { useSettingsStore } from "../context/SettingsContext";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  return (
    <div
      className={`relative flex min-h-lvh max-w-screen flex-col px-4 pb-24 dark:bg-stone-900 dark:text-white ${theme}`}
    >
      <div className="p-4 px-2">
        <h1 className="text-3xl xl:text-4xl">Error</h1>
      </div>
      <div className="p-4 px-2">
        <p>{t("errorHasOccurred")}</p>
      </div>
      <div className="mt-4 self-center">
        <Link
          className="cursor-pointer rounded-full bg-violet-800 p-3 px-4 text-white hover:bg-violet-800/85"
          to={"/"}
        >
          {t("homePage")}
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
