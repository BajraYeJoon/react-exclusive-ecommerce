import { FieldError, UseFormRegister } from "react-hook-form";

type FieldNames = "email" | "password" | "name" | "phoneNumber";

type LoginFieldNames = "email" | "password";

interface BaseFormInputProps {
  type: string;
  placeholder: string;
  error: FieldError | undefined;
}

export interface SignUpFormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export interface LoginFormData {
  name: string;
  password: string;
}

export interface SignUpFormInputProps extends BaseFormInputProps {
  name: FieldNames;
  register: UseFormRegister<SignUpFormData>;
}

export interface LoginInputProps extends BaseFormInputProps {
  name: LoginFieldNames;
  register: UseFormRegister<LoginFormData>;
}