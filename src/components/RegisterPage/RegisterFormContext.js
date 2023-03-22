import React, { useEffect } from "react";
import { TextInput, InputContainer } from "./RegisterPageStyled";
import { ErrorMessage } from "../styles/global/errorMessage";
import { BiUser as NameIcon, BiLockAlt as PasswordIcon } from "react-icons/bi";
import { FiMail as EmailIcon } from "react-icons/fi";
import { useFormContext } from "react-hook-form";

export default function RegisterFormContext({ registerError }) {
  useEffect(() => {
    registerErrorMessage();
  }, [registerError]);

  const registerErrorMessage = () => {
    if (registerError === "auth/email-already-in-use")
      return "this email is already in use";
    else return registerError.slice(5).replaceAll("-", " ");
  };
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods, destructuring errors from formState object
  return (
    <>
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
        <ErrorMessage>{errors.lastName?.message || ""}</ErrorMessage>
      </InputContainer>
      <InputContainer className="input-container">
        <TextInput type="email" placeholder="Email" {...register("email")} />
        <EmailIcon />
        <ErrorMessage>
          {errors.email?.message || registerErrorMessage()}
        </ErrorMessage>
      </InputContainer>
      <InputContainer className="input-container">
        <TextInput
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <PasswordIcon />
        <ErrorMessage>{errors.password?.message || ""}</ErrorMessage>
      </InputContainer>
      <InputContainer className="input-container">
        <TextInput
          type="password"
          placeholder="Confirm Password"
          {...register("confirm")}
        />
        <PasswordIcon />
        <ErrorMessage>{errors.confirm?.message || ""}</ErrorMessage>
      </InputContainer>
    </>
  );
}
