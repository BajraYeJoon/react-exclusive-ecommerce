import { z, ZodType } from "zod";
import { SignUpFormData, LoginFormData } from "./types";

const SignUpFormSchema: ZodType<SignUpFormData> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),

  name: z.string().min(2),
  phoneNumber: z.string().min(10),
});

const LoginFormSchema: ZodType<LoginFormData> = z.object({
  name: z.string().min(2),
  password: z
    .string()

    .max(20, { message: "Password is too long" }),
});

export { LoginFormSchema, SignUpFormSchema };