import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  RegisterPageStyled,
  RegisterH1,
  RegisterForm,
  TextInput,
  NextButton,
  LoginPageSpan,
  InputContainer,
} from "./RegisterPageStyled";
import { ErrorMessage } from "../styles/global/errorMessage";
import { BiUser as NameIcon, BiLockAlt as PasswordIcon } from "react-icons/bi";
import { FiMail as EmailIcon } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, string } from "zod";

const schema = z
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

const RegisterH2 = styled(RegisterH1)`
  font-size: 0.85rem;
  text-transform: none;
  color: ${({ theme }) => theme.colors.light};
`;
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const registerNewUser = (inputData) => {
    console.log(inputData);
  };

  return (
    <RegisterPageStyled>
      <RegisterH1>create your account</RegisterH1>
      <RegisterH2>Improve your workout now!</RegisterH2>
      <RegisterForm onSubmit={handleSubmit(registerNewUser)}>
        <InputContainer className="input-container">
          <TextInput
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          <NameIcon />
          <ErrorMessage>{errors.firstName?.message || ""}</ErrorMessage>
        </InputContainer>
        <InputContainer className="input-container">
          <TextInput
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
          <NameIcon />
          <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
        </InputContainer>
        <InputContainer className="input-container">
          <TextInput type="email" placeholder="Email" {...register("email")} />
          <EmailIcon />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </InputContainer>
        <InputContainer className="input-container">
          <TextInput
            type="text"
            placeholder="Password"
            {...register("password")}
          />
          <PasswordIcon />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </InputContainer>
        <InputContainer className="input-container">
          <TextInput
            type="text"
            placeholder="Confirm Password"
            {...register("confirm")}
          />
          <PasswordIcon />
          <ErrorMessage>{errors.confirm?.message}</ErrorMessage>
        </InputContainer>
        <NextButton>Next</NextButton>
      </RegisterForm>
      <LoginPageSpan>Already have an account? Login here</LoginPageSpan>
    </RegisterPageStyled>
  );
}

//   const registerUser = (data) => {
//   createUserWithEmailAndPassword(auth, data.email, data.password).then(
//     (userCredentials) => {
//       const user = userCredentials.user;
//       window.location.replace("/");
//     }
//   );
// };
