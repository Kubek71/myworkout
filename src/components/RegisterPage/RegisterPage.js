import React from "react";
import {
  RegisterPageStyled,
  RegisterHeading,
  RegisterForm,
  TextInput,
} from "./RegisterPageStyled";
export default function RegisterPage() {
  return (
    <RegisterPageStyled>
      <RegisterHeading>Register new account</RegisterHeading>
      <RegisterForm>
        <TextInput type="text" placeholder="login"></TextInput>
        <TextInput type="text" placeholder="password"></TextInput>
      </RegisterForm>
    </RegisterPageStyled>
  );
}
