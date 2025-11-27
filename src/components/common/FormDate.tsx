interface FormDateProps {
  label: string;
  field: string;
  value: any;
  placeholder: string;
  className?: string;
  handleChange: (value: any, field: string) => void;
  required?: boolean;
}

const FormDate: React.FC<FormDateProps> = (props: FormDateProps) => {
  const {
    handleChange,
    label,
    value,
    placeholder,
    field,
    className = "",
    required = false,
  } = props;
  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-gray-800 text-base font-semibold">{label}</label>
      <input
        required={required}
        type="datetime-local"
        placeholder={placeholder}
        className={`p-1 border border-transparent hover:border-gray-600 w-full rounded-xs outline-none bg-white ${className}`}
        value={value || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(event?.target?.value, field)
        }
      />
    </div>
  );
};

export default FormDate;
