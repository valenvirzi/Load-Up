import { SettingsItemProps } from "../../types/types";

const SettingsItem: React.FC<SettingsItemProps> = ({
  label,
  id,
  options,
  value,
  onChange,
}) => {
  return (
    <li className="">
      <div className="flex items-center justify-between gap-2 p-3">
        <label htmlFor={id} className="text-base xl:text-lg">
          {label}
        </label>
        <select
          className="cursor-pointer rounded border-none bg-gray-100 p-2 text-sm md:text-base dark:bg-zinc-700"
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
      </div>
      <hr className="border-0 border-b border-b-gray-400" />
    </li>
  );
};

export default SettingsItem;
