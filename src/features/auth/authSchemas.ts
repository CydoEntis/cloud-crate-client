import { z } from "zod";

export const authSearchSchema = z.object({
  inviteToken: z.string().optional(),
});

const emailField = z.string().min(1, "Email is required").email("Invalid email address");

const passwordField = z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters");

const displayNameField = z
  .string()
  .min(1, "Display name is required")
  .max(32, "Display name must be less than 32 characters");

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    displayName: displayNameField,
    email: emailField,
    password: passwordField,
    confirmPassword: passwordField,
    profilePictureUrl: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const authResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string().optional(),
  user: z
    .object({
      id: z.string(),
      email: z.string().email(),
      displayName: z.string(),
    })
    .optional(),
});
