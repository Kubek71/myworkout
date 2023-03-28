import React from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { schema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo/Logo.js";
import { LoginPageStyled, LogoBox } from "../styles/loginPageStyled";
import {
  RegisterForm as LoginForm,
  NextButton,
  LoginPageSpan as RegisterPageSpan,
} from "../RegisterPage/RegisterPageStyled";
import LoginPageContext from "./LoginPageContext";
import { auth } from "../../utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  // declaring useForm hook with zod resolver
  const useFormMethods = useForm({ resolver: zodResolver(schema) });
  const [loginError, setLoginError] = useState("");
  const navigateToHomePage = useNavigate();

  const loginUser = (inputData) => {
    signInWithEmailAndPassword(auth, inputData.email, inputData.password)
      .then(() => {
        useFormMethods.reset();
        navigateToHomePage("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        setLoginError(errorCode);
      });
  };

  return (
    <LoginPageStyled>
      <LogoBox>
        <Logo />
      </LogoBox>
      <FormProvider {...useFormMethods}>
        <LoginForm onSubmit={useFormMethods.handleSubmit(loginUser)}>
          <LoginPageContext loginError={loginError} />
          <NextButton>LOG IN</NextButton>
        </LoginForm>
      </FormProvider>
      <Link to="/signup">
        <RegisterPageSpan>
          Dont have an account ? Register here
        </RegisterPageSpan>
      </Link>
    </LoginPageStyled>
  );
}
