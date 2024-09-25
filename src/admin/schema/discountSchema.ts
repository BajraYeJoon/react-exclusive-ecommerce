import { z } from "zod";

export const couponSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must not exceed 50 characters"),
    code: z.string().regex(/^[A-Z0-9]{3,15}$/, "Code must be 3-15 characters, uppercase letters, numbers"),
    type: z.enum(["fixed_amount", "percentage"]),
    value: z.number().min(0, "Value must be positive"),
    startDate: z.string().refine((val) => new Date(val) >= new Date(new Date().setHours(0, 0, 0, 0)), "Start date must be today or in the future"),
    expirationDate: z.string(),
    maxUsageCount: z.number().int().min(1, "Max usage count must be at least 1"),
    minPurchaseAmount: z.number().min(0, "Minimum purchase amount must be non-negative"),
})