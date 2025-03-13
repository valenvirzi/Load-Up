import { NavLink } from "react-router-dom";
import { Link } from "../types/types";

const LinkItem: React.FC<Link> = (link) => {
  return (
    <li>
      <NavLink
        to={`/${link.url}`}
        className={({ isActive }) => {
          const activeClass = isActive ? "w-full bg-violet-800" : "";
          return `group flex items-center rounded-full bg-gray-700 p-2 transition-all duration-300 md:p-3 ${activeClass}`;
        }}
      >
        <img className="w-6 md:w-8" src={link.src} alt={link.title} />
        <span className="w-0 overflow-hidden text-center text-sm whitespace-nowrap opacity-0 transition-all duration-300 group-[.w-full]:w-[12ch] group-[.w-full]:opacity-100 md:text-base">
          {link.title}
        </span>
      </NavLink>
    </li>
  );
};

export default LinkItem;
