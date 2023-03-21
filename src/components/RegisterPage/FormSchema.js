import { z, string } from "zod";

// creating schema for the form to use it with react-hook-form in RegisterPage.js file.
// zod docs - https://github.com/colinhacks/zod

export const schema = z
  .object({
    firstName: string()
      .min(3, {
        message: "First name must have at least 3 characters",
      })
      .max(18, {
        message: "First name must have maximum of 18 characters",
      }),
    lastName: string()
      .min(2, {
        message: "Last name must have at least 3 characters",
      })
      .max(18, {
        message: "Last name must have maximum of 18 characters",
      }),
    email: string().email({ message: "Your email is invalid" }),
    password: string()
      .min(6, {
        message: "Password must have at least 6 characters",
      })
      .max(14, { message: "Password must have maximum of 14 characters" }),
    confirm: string().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });
