import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  NewProgramPageStyled,
  NewProgramForm,
  Heading,
  NextStepButton,
  Input,
  NewProgramTable,
} from "./styles/newProgramPageStyled";
import { Box } from "./styles/boxStyled.js";
import { BiPlusMedical as NewProgramIcon } from "react-icons/bi";

const NameProgramForm = styled(NewProgramForm)`
  background: none;
`;

export default function NewProgramPage() {
  const { register, handleSubmit, resetField } = useForm();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [exerciseTable, setExerciseTable] = useState([]);
  const submitProgramName = (e) => {
    e.preventDefault();
    setIsFormSubmitted((current) => !current);
  };
  const submitProgram = (data) => {
    setExerciseTable((currentTable) => [...currentTable, data.exercise]);
    resetField("exercise");
    console.log("lol");
  };
  return (
    <NewProgramPageStyled>
      {isFormSubmitted === true ? (
        <NewProgramForm onSubmit={handleSubmit(submitProgram)}>
          <Heading>ADD EXERCISE</Heading>
          <Box>
            <Input
              type="Text"
              {...register("exercise", {
                minLength: 2,
                maxLength: 20,
                required: true,
              })}
            ></Input>
            <button type="submit" className="add-exercise-button">
              <NewProgramIcon></NewProgramIcon>
            </button>
          </Box>
        </NewProgramForm>
      ) : (
        <NameProgramForm onSubmit={submitProgramName}>
          <Heading>NAME YOUR WORKOUT</Heading>
          <Input type="text" required></Input>
          <NextStepButton type="submit">NEXT</NextStepButton>
        </NameProgramForm>
      )}
    </NewProgramPageStyled>
  );
}
