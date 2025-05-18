import inventory from "../assets/inventory.svg";
import exercises from "../assets/exercises.svg";
import calculator from "../assets/calculator.svg";
import settings from "../assets/settings.svg";
import { useTranslation } from "react-i18next";
import { Link } from "../types/types";
import LinkItem from "./LinkItem";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const links: Link[] = [
    {
      title: t("inventory"),
      url: "inventory",
      src: inventory,
      srcActive: "",
    },
    {
      title: t("exercises"),
      url: "exercises",
      src: exercises,
      srcActive: "",
    },
    {
      title: t("calculator"),
      url: "calculator",
      src: calculator,
      srcActive: "",
    },
    {
      title: t("settings"),
      url: "settings",
      src: settings,
      srcActive: "",
    },
  ];

  return (
    <footer className="fixed right-2 bottom-6 left-2 z-10 rounded-full bg-gray-900 p-1 text-white dark:bg-white">
      <nav>
        <ul className="flex items-stretch justify-between gap-0.5">
          {links.map((link) => (
            <LinkItem key={link.title} link={link} />
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
