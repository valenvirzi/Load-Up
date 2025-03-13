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
      title: t("timer"),
      url: "timer",
      src: "./timer.svg",
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
    <footer className="absolute right-1 bottom-4 left-1 rounded-full bg-gray-900 p-1 text-white md:right-3 md:left-3">
      <nav>
        <ul className="flex items-stretch justify-between gap-0.5">
          {links.map((item) => (
            <LinkItem
              key={item.title}
              title={item.title}
              url={item.url}
              src={item.src}
              srcActive={item.srcActive}
            />
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
