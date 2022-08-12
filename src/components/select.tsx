import { ChangeEvent } from "react";

interface SelectPropTypes {
  id: string;
  name: string;
  placeholder: string;
  disabledOptionText: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: (JSX.Element | null)[];
}

const Select = ({
  id,
  name,
  placeholder,
  disabledOptionText,
  onChange,
  children,
}: SelectPropTypes) => {
  return (
    <select
      id={id}
      defaultValue=""
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className="select"
    >
      <option value="" disabled>
        {disabledOptionText}
      </option>
      {children}
    </select>
  );
};

export default Select;
