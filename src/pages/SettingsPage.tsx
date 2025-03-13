// TODO: Design this page

import { useTranslation } from "react-i18next";
import Settings from "../components/Settings";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col p-2">
      <div className="p-2">
        <h2 className="text-3xl">{t("settings")}</h2>
      </div>
      <Settings />
    </main>
  );
};

export default SettingsPage;
