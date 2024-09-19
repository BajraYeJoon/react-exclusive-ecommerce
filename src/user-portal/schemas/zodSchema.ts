import { z, ZodType } from "zod";
import { SignUpFormData, LoginFormData } from "./types";

const SignUpFormSchema: ZodType<SignUpFormData> = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
      message: "Only Gmail addresses are supported",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be no more than 20 characters long" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" })
    .max(15, { message: "Phone number must be no more than 15 digits long" })
    .regex(/^[0-9]+$/, { message: "Phone number must only contain digits" }),
});
const LoginFormSchema: ZodType<LoginFormData> = z.object({
  name: z.string().min(2),
  password: z
    .string()

    .max(20, { message: "Password is too long" }),
});

export { LoginFormSchema, SignUpFormSchema };