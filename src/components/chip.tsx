interface ChipPropTypes {
  text: string;
  rounded: "xl" | "2xl";
  className: string;
}

const Chip = ({ rounded, text, className }: ChipPropTypes) => {
  return (
    <div className={`p-2 border-2 border-slate-500 rounded-${rounded} ${className}`}>{text}</div>
  );
};

export default Chip;
