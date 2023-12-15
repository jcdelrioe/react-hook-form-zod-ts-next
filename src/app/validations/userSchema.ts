import { z } from "zod"

const plans = ["free", "basic", "medium", "premium"] as const

export const userSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(200, {
      message: "Name must be at most 200 characters",
    }),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Name must be at least 6 characters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Name must be at least 6 characters",
  }),
  weight: z.string().refine((weight) => !isNaN(parseFloat(weight)), {
    message: "Weight must be a number",
  }),
  plan: z.enum(plans, {
    errorMap: () => ({ message: "Invalid plan" }),
  }),
})
