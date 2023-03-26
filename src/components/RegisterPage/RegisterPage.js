import React, { useState } from "react";
import styled from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  RegisterPageStyled,
  RegisterH1,
  RegisterForm,
  NextButton,
  LoginPageSpan,
} from "./RegisterPageStyled";
import RegisterFormContext from "./RegisterFormContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./FormSchema";
import { auth } from "../../utils/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterH2 = styled(RegisterH1)`
  font-size: 0.85rem;
  text-transform: none;
  color: ${({ theme }) => theme.colors.light};
`;
export default function RegisterPage() {
  const [registerError, setRegisterError] = useState("");
  const navigateToHomePage = useNavigate();
  const useFormMethods = useForm({ resolver: zodResolver(schema) });

  const registerNewUser = (inputData) => {
    createUserWithEmailAndPassword(auth, inputData.email, inputData.password)
      .then(() => {
        useFormMethods.reset();
        navigateToHomePage("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        setRegisterError(errorCode);
      });
  };

  return (
    <RegisterPageStyled>
      <RegisterH1>create your account</RegisterH1>
      <RegisterH2>Improve your workout now!</RegisterH2>
      <FormProvider {...useFormMethods}>
        <RegisterForm onSubmit={useFormMethods.handleSubmit(registerNewUser)}>
          <RegisterFormContext registerError={registerError} />
          <NextButton type="submit">Next</NextButton>
        </RegisterForm>
      </FormProvider>
      <Link to="/login">
        <LoginPageSpan>Already have an account? Login here</LoginPageSpan>
      </Link>
    </RegisterPageStyled>
  );
}
