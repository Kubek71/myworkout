import React from "react";
import { BiUser as LoginIcon, BiLockAlt as PasswordIcon } from "react-icons/bi";
import { InputContainer, TextInput } from "../RegisterPage/RegisterPageStyled";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../styles/global/errorMessage";
export default function LoginPageContext() {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods, destructuring errors from formState object
  return (
    <>
      <InputContainer>
        <TextInput type="text" placeholder="email" {...register("email")} />
        <LoginIcon />
        <ErrorMessage>{errors.email?.message || ""}</ErrorMessage>
      </InputContainer>
      <InputContainer>
        <TextInput
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <PasswordIcon />
        <ErrorMessage>{errors.password?.message || ""}</ErrorMessage>
      </InputContainer>
    </>
  );
}
