import React from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { schema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { LoginPageStyled, LogoBox } from "../styles/loginPageStyled";
import {
  RegisterForm as LoginForm,
  NextButton,
  LoginPageSpan as RegisterPageSpan,
} from "../RegisterPage/RegisterPageStyled";
import LoginPageContext from "./LoginPageContext";
import { auth } from "../../helpers/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  // declaring useForm hook with zod resolver
  const useFormMethods = useForm({ resolver: zodResolver(schema) });
  const [loginError, setLoginError] = useState("");

  const loginUser = (inputData) => {
    signInWithEmailAndPassword(auth, inputData.email, inputData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorCode);
        console.log(error.code);
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
      <Link to="/register">
        <RegisterPageSpan>
          Dont have an account ? Register here
        </RegisterPageSpan>
      </Link>
    </LoginPageStyled>
  );
}
