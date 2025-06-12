import { NavLink } from "react-router-dom";
import { LinkItemProps } from "../../types/types";

const LinkItem: React.FC<LinkItemProps> = ({ link }) => {
  return (
    <li className="self-center">
      <NavLink
        to={`/${link.url}`}
        className={({ isActive }) => {
          const activeClass = isActive
            ? "w-full bg-violet-800 hover:bg-violet-800/85"
            : "";
          return `group flex items-center rounded-full bg-gray-700 p-2.5 transition-all duration-300 hover:bg-gray-700/85 xl:w-full ${activeClass}`;
        }}
      >
        <img className="w-8" src={link.src} alt={link.title} />
        <span className="w-0 overflow-hidden text-center text-sm whitespace-nowrap opacity-0 transition-all duration-300 group-[.w-full]:w-[12ch] group-[.w-full]:opacity-100 md:text-base xl:w-[12ch] xl:opacity-100">
          {link.title}
        </span>
      </NavLink>
    </li>
  );
};

export default LinkItem;
