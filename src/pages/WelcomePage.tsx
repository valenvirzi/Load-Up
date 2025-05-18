import gym from "../assets/gym.svg";
import { useTranslation } from "react-i18next";

const WelcomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col items-stretch gap-2 p-2 px-4">
      <div className="p-2">
        <img src={gym} className="w-24" alt="Icon" />
        <h2 className="text-3xl text-pretty">{t("welcomeToLoadUp")}</h2>
      </div>
      <section className="flex flex-col gap-3 p-2">
        {/* TODO: Translate Page */}
        <h2 className="text-xl">{t("featuresTitle")}:</h2>
        <ul className="flex list-disc flex-col gap-2 pr-1 pl-4 text-pretty">
          <li>
            <p>{t("featureInventory")}</p>
          </li>
          <li>
            <p>{t("featureLoadCalc")}</p>
          </li>
          <li>
            <p>{t("featureSaveExercises")}</p>
          </li>
          <li>
            <p>{t("featureProgress")}</p>
          </li>
          <li>
            <p>{t("featureSettings")}</p>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default WelcomePage;
