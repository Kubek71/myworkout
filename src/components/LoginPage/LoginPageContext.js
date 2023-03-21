import React from "react";
import { useEffect } from "react";
import { BiUser as LoginIcon, BiLockAlt as PasswordIcon } from "react-icons/bi";
import { InputContainer, TextInput } from "../RegisterPage/RegisterPageStyled";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../styles/global/errorMessage";

export default function LoginPageContext({ loginError }) {
  useEffect(() => {
    loginErrorMessage();
  }, [loginError]);
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods, destructuring errors from formState object

  const loginErrorMessage = () => {
    if (loginError === "auth/user-not-found")
      return "We couldnt find any user with given email";
    else if (loginError === "auth/wrong-password")
      return "Password is incorrect";
    else if (loginError === "auth/too-many-requests")
      return "Please wait a while before you try again";
    else return loginError.slice(5).replaceAll("-", " ");
  };

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
        <ErrorMessage>
          {errors.password?.message || loginErrorMessage()}
        </ErrorMessage>
      </InputContainer>
    </>
  );
}
