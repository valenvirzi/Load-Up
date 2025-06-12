import { useTranslation } from "react-i18next";
import Settings from "../components/Settings/Settings";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col p-2 px-4 lg:px-10 lg:py-4">
      <div className="p-2">
        <h2 className="text-3xl xl:text-4xl">{t("settings")}</h2>
      </div>
      <Settings />
    </main>
  );
};

export default SettingsPage;
