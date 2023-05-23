import { z, string, number, array, boolean, literal } from "zod";

// creating schema for the form to use it with react-hook-form in RegisterPage.js file.
// zod docs - https://github.com/colinhacks/zod

export const schema = z
  .object({
    firstName: string()
      .toLowerCase()
      .regex(/^[A-Za-z]+$/, {
        message: "Must contain only letters without spaces",
      })
      .min(3, {
        message: "First name must have at least 3 characters",
      })
      .max(18, {
        message: "First name must have maximum of 18 characters",
      }),
    lastName: string()
      .toLowerCase()
      .regex(/^[A-Za-z]+$/, {
        message: "Must contain only letters without spaces",
      })
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
    gender: string({
      required_error: "Choose your gender",
    }),
    userWeight: number({
      required_error: "Weight is required",
      invalid_type_error: "Weight is required",
    })
      .min(30, "Your weight has to be in range (30-200)")
      .max(200, "Your weight has to be in range (30-200)"),
    userHeight: number({
      required_error: "Height is required",
      invalid_type_error: "Height is required",
    })
      .min(30, "Your height has to be in range (30-250)")
      .max(200, "Your height has to be in range (30-250)"),
    userAge: number({
      required_error: "Age is required",
      invalid_type_error: "Age is required",
    })
      .min(12, "Your age has to be in range(12-99")
      .max(99, "Your age has to be in range(12-99"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });
