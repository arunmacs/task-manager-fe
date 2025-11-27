interface FormTextAreaProps {
  label: string;
  field: string;
  value: any;
  placeholder: string;
  className?: string;
  handleChange: (value: any, field: string) => void;
  required?: boolean;
}

const FormTextArea: React.FC<FormTextAreaProps> = (
  props: FormTextAreaProps
) => {
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
      <textarea
        required={required}
        placeholder={placeholder}
        className={`p-1 bg-white border border-transparent hover:border-gray-600 w-full rounded-xs outline-none ${className}`}
        value={value || ""}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleChange(event?.target?.value, field)
        }
      />
    </div>
  );
};

export default FormTextArea;
