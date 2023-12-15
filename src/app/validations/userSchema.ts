import { z } from "zod"

const plans = ["free", "basic", "medium", "premium"] as const

export type Plans = (typeof plans)[number]

export const mappedPlans: { [key in Plans]: string } = {
  basic: "Basic",
  free: "Free",
  medium: "Medium",
  premium: "Premium",
}

export const userSchema = z
  .object({
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
    dateOfBirth: z
      .string()
      .refine((dob) => new Date(dob).toString() !== "Invalid Date", {
        message: "Invalid date",
      }),
    weight: z.string().refine((weight) => !isNaN(parseFloat(weight)), {
      message: "Weight must be a number",
    }),
    plan: z.enum(plans, {
      errorMap: () => ({ message: "Invalid plan" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
