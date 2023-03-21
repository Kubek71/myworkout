import { z, string } from "zod";

// creating schema for the form to use it with react-hook-form in RegisterPage.js file.
// zod docs - https://github.com/colinhacks/zod

export const schema = z.object({
  email: string().email({ message: "Your email is invalid" }),
  password: string().min(2, { message: "password is required" }),
});
