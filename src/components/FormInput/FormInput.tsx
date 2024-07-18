import { FormInputProps } from "../../schemas/types";

const FormInput = ({
  type,
  placeholder,
  name,
  register,
  error,
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input type={type} placeholder={placeholder} {...register(name)} />
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};
export default FormInput;
