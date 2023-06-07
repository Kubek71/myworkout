import React, { useState } from "react";
import styled from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BackButton as NextStepButton } from "../HistoryPage/OpenedWorkoutStyled";
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
import RegisterUserInfo from "./RegisterUserInfoPage";
import { useUserData } from "../../utils/userDataContext";

const RegisterH2 = styled(RegisterH1)`
  font-size: 0.85rem;
  text-transform: none;
  color: ${({ theme }) => theme.colors.light};
`;
export default function RegisterPage() {
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const [renderSecondForm, setRenderSecondForm] = useState(false);
  const { addUserInfo } = useUserData();
  const useFormMethods = useForm({
    resolver: zodResolver(schema),
  });
  const control = useFormMethods.control;

  const registerNewUser = (inputData) => {
    createUserWithEmailAndPassword(auth, inputData.email, inputData.password)
      .then((result) => {
        addUserInfo(
          result.user.uid,
          inputData.firstName,
          inputData.gender,
          inputData.userWeight,
          inputData.userHeight,
          inputData.userAge,
          inputData.activity
        )
          .then((result) => {
            navigate("/profile");
          })
          .catch((e) => {
            useFormMethods.reset();
            navigate("/");
          });
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
          {renderSecondForm ? (
            <RegisterFormContext registerError={registerError} />
          ) : (
            <RegisterUserInfo control={control} />
          )}

          {renderSecondForm ? (
            <NextButton type="submit">Sign up</NextButton>
          ) : (
            <NextStepButton
              textAlign="center"
              onClick={async () => {
                // checks if rep and kg input is registered
                const isUserInfoRegistered = await useFormMethods.trigger([
                  "gender",
                  "activity",
                  "userWeight",
                  "userHeight",
                  "userAge",
                ]);
                const isClear = () => {
                  useFormMethods.clearErrors();
                  setRenderSecondForm(true);
                };

                // if data from inputs is registered, appends new table row with input, otherwise setting focus on rep input in current table row
                isUserInfoRegistered
                  ? isClear()
                  : useFormMethods.setFocus("firstName");
              }}
            >
              <span>Next</span>
            </NextStepButton>
          )}
        </RegisterForm>
      </FormProvider>
      <Link to="/login">
        <LoginPageSpan>Already have an account? Login here</LoginPageSpan>
      </Link>
    </RegisterPageStyled>
  );
}
