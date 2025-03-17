import { useTranslation } from "react-i18next";
import { Link } from "../types/types";
import LinkItem from "./LinkItem";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const links: Link[] = [
    {
      title: t("inventory"),
      url: "inventory",
      src: "./inventory.svg",
      srcActive: "",
    },
    {
      title: t("exercises"),
      url: "exercises",
      src: "./exercises.svg",
      srcActive: "",
    },
    {
      title: t("calculator"),
      url: "calculator",
      src: "./calculator.svg",
      srcActive: "",
    },
    {
      title: t("settings"),
      url: "settings",
      src: "./settings.svg",
      srcActive: "",
    },
  ];

  return (
    <footer className="fixed right-1 bottom-6 left-1 z-10 rounded-full bg-gray-900 p-1 text-white md:right-3 md:left-3 dark:bg-white">
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
