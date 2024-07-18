import { z, ZodType } from "zod";
import { FormData } from "./types";

const FormSchema: ZodType<FormData> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),

  name: z.string().min(2),
  phoneNumber: z.string().min(10),
});

export default FormSchema;
