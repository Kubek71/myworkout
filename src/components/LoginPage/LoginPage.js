import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { schema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../Logo/Logo";
import { LoginPageStyled, LogoBox } from "../styles/loginPageStyled";
import {
  RegisterForm as LoginForm,
  NextButton,
  LoginPageSpan as RegisterPageSpan,
} from "../RegisterPage/RegisterPageStyled";
import LoginPageContext from "./LoginPageContext";
export default function LoginPage() {
  // declaring useForm hook with zod resolver
  const useFormMethods = useForm({ resolver: zodResolver(schema) });

  const loginUser = (inputData) => {
    console.log(inputData);
  };

  return (
    <LoginPageStyled>
      <LogoBox>
        <Logo />
      </LogoBox>
      <FormProvider {...useFormMethods}>
        <LoginForm onSubmit={useFormMethods.handleSubmit(loginUser)}>
          <LoginPageContext />
          <NextButton>LOG IN</NextButton>
        </LoginForm>
      </FormProvider>
      <RegisterPageSpan>Dont have an account ? Register here</RegisterPageSpan>
    </LoginPageStyled>
  );
}
