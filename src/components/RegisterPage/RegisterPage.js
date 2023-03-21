import React from "react";
import styled from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
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

const RegisterH2 = styled(RegisterH1)`
  font-size: 0.85rem;
  text-transform: none;
  color: ${({ theme }) => theme.colors.light};
`;
export default function RegisterPage() {
  const useFormMethods = useForm({ resolver: zodResolver(schema) });

  const registerNewUser = (inputData) => {
    console.log(inputData);
  };

  return (
    <RegisterPageStyled>
      <RegisterH1>create your account</RegisterH1>
      <RegisterH2>Improve your workout now!</RegisterH2>
      <FormProvider {...useFormMethods}>
        <RegisterForm onSubmit={useFormMethods.handleSubmit(registerNewUser)}>
          <RegisterFormContext />
          <NextButton type="submit">Next</NextButton>
        </RegisterForm>
      </FormProvider>
      <Link to="/login">
        <LoginPageSpan>Already have an account? Login here</LoginPageSpan>
      </Link>
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
