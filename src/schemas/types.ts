import { FieldError, UseFormRegister } from "react-hook-form";

type FieldNames = "email" | "password" | "name" | "phoneNumber";

export interface FormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export interface FormInputProps {
  type: string;
  placeholder: string;
  name: FieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
}
