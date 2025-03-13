import { SettingsItemProps } from "../types/types";

const SettingsItem: React.FC<SettingsItemProps> = ({
  label,
  id,
  options,
  value,
  onChange,
}) => {
  return (
    <li className="flex items-center justify-between gap-2 p-3 text-sm md:text-base">
      <label htmlFor={id} className="">
        {label}
      </label>
      <select
        className="cursor-pointer rounded border-none bg-gray-100 p-2"
        name={id}
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            className="text-right"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </li>
  );
};

export default SettingsItem;
