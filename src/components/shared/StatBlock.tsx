interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <p className="text-sm font-semibold leading-[140%] tracking-tighter lg:text-lg lg:font-bold text-blue-500">
        {value}
      </p>
      <p className="text-slate-800">{label}</p>
    </div>
  );
};

export default StatBlock;
