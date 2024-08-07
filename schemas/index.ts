import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is requiered",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});
