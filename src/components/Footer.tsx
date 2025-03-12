import Link from "../types/types";
import LinkItem from "./LinkItem";

const links: Link[] = [
  {
    title: "Inventory",
    src: "./inventory.svg",
    srcActive: "",
  },
  {
    title: "Exercises",
    src: "./exercises.svg",
    srcActive: "",
  },
  {
    title: "Calculator",
    src: "./calculator.svg",
    srcActive: "",
  },
  {
    title: "Timer",
    src: "./timer.svg",
    srcActive: "",
  },
  {
    title: "Settings",
    src: "./settings.svg",
    srcActive: "",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="absolute right-1 bottom-4 left-1 rounded-full bg-gray-900 p-1 text-white md:right-3 md:left-3">
      <nav>
        <ul className="flex items-stretch justify-between gap-0.5">
          {links.map((item) => (
            <LinkItem
              key={item.title}
              title={item.title}
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
