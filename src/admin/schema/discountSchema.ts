import { z } from "zod";

export const couponSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(30, "Name must not exceed 30 characters")  .regex(/^[a-zA-Z\s]{3,30}$/, "Name must only contain letters and spaces"),
    code: z.string().regex(/^[A-Z0-9]{3,15}$/, "Code must be 3-15 characters, uppercase letters, numbers"),
    type: z.enum(["fixed_amount", "percentage"]),
    value: z.number().min(0, "Value must be positive"),
    startDate: z.string().refine((val) => new Date(val) >= new Date(new Date().setHours(0, 0, 0, 0)), "Start date must be today or in the future"),
    expirationDate: z.string(),
    maxUsageCount: z.number().int().min(1, "Max usage count must be at least 1").max(100, "Max usage count must not exceed 50"),
    minPurchaseAmount: z.number().min(0, "Minimum purchase amount must be non-negative").max(10000, "Minimum purchase amount must be less than or equal to 10000"),
})