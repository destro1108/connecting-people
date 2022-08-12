interface ButtonPropTypes {
  variant: "contained" | "outlined";
  color: "primary" | "error";
  onClick: () => void;
  children: JSX.Element | JSX.Element[] | string;
}

const Button = ({ variant, color, onClick, children }: ButtonPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-${variant} flex ${
        color === "error" ? "text-red-600 cursor-pointer hover:text-red-500" : ""
      }`}
    >
      {children}
    </button>
  );
};
export default Button;
