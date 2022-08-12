interface ChipPropTypes {
  text: string;
  className: string;
}

const Chip = ({ text, className }: ChipPropTypes) => (
  <div className={`p-2 border-2 border-slate-500 rounded-xl ${className}`}>{text}</div>
);

export default Chip;
