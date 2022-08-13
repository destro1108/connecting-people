import { ChangeEvent } from "react";

interface SelectPropTypes {
  id: string;
  name: string;
  placeholder: string;
  value: number | string;
  disabledOptionText: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: (JSX.Element | null)[];
}

const Select = ({
  id,
  name,
  value,
  placeholder,
  disabledOptionText,
  onChange,
  children,
}: SelectPropTypes) => {
  return (
    <select
      id={id}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className="select"
    >
      <option value={-1} disabled>
        {disabledOptionText}
      </option>
      {children}
    </select>
  );
};

export default Select;
