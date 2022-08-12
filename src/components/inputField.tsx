import { ChangeEvent } from "react";

interface InputFieldPropTypes {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ id, name, type, placeholder, value, onChange }: InputFieldPropTypes) => {
  return (
    <input
      id={id}
      name={name}
      type={type || "text"}
      placeholder={placeholder}
      autoComplete="off"
      value={value}
      className="m-1 px-1 md:px-3 py-2 rounded-md bg-white text-black border-none outline-none"
      onChange={onChange}
    />
  );
};

export default InputField;
