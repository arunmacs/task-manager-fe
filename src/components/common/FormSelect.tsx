interface Options {
  label: string;
  value: any;
}

interface FormSelectProps {
  label: string;
  field: string;
  value: any;
  defaultValue?: string;
  options: Options[];
  className?: string;
  handleChange: (value: any, field: string) => void;
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = (props: FormSelectProps) => {
  const {
    handleChange,
    label,
    value,
    field,
    className = "",
    options,
    required = false,
  } = props;
  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-gray-800 text-base font-semibold">{label}</label>
      <select
        required={required}
        className={`p-1.5 bg-white border border-transparent hover:border-gray-600 w-full rounded-xs outline-none ${className}`}
        value={value || ""}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleChange(event?.target?.value, field)
        }
      >
        <option value={""}>Select a Category</option>
        {(options || [])?.map((option) => (
          <option value={option?.value}>{option?.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
