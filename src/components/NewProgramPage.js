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
  SaveProgramButton,
} from "./styles/newProgramPageStyled";
import { ProgramBox, ProgramList } from "./styles/programPageStyled";
import { ErrorMessage } from "./styles/global/errorMessage";
import { Box } from "./styles/boxStyled.js";
import { BiPlusMedical as NewProgramIcon } from "react-icons/bi";

const NameProgramForm = styled(NewProgramForm)`
  background: none;
`;
const WorkoutTitle = styled(Heading)`
  color: ${({ theme }) => theme.colors.primaryRed};
  text-transform: uppercase;
`;

export default function NewProgramPage() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [workoutName, setWorkoutName] = useState(undefined);
  const [exerciseTable, setExerciseTable] = useState([]);

  const submitWorkoutName = (data) => {
    setIsFormSubmitted((current) => !current);
    setWorkoutName(data.workoutName);
    resetField("workoutName");
  };
  const submitExercise = (data) => {
    setExerciseTable((currentTable) => [...currentTable, data.exercise]);
    resetField("exercise");
  };
  return (
    <NewProgramPageStyled>
      {isFormSubmitted === true && workoutName !== undefined ? (
        <NewProgramForm onSubmit={handleSubmit(submitExercise)}>
          <Heading>ADD EXERCISE</Heading>
          <Box>
            <Input
              type="Text"
              {...register("exercise", {
                maxLength: {
                  value: 20,
                  message: "maximum amount of characters is 20",
                },
                required: "name your exercise",
              })}
            ></Input>
            <button type="submit" className="add-exercise-button">
              <NewProgramIcon></NewProgramIcon>
            </button>
          </Box>
          <ErrorMessage>{errors.exercise?.message}</ErrorMessage>
        </NewProgramForm>
      ) : (
        <NameProgramForm onSubmit={handleSubmit(submitWorkoutName)}>
          <Heading>NAME YOUR WORKOUT</Heading>
          <Input
            type="text"
            {...register("workoutName", {
              minLength: 2,
              maxLength: 12,
              required: true,
            })}
          ></Input>
          <NextStepButton type="submit">NEXT</NextStepButton>
        </NameProgramForm>
      )}
      {workoutName !== undefined && exerciseTable.length > 0 && (
        <>
          <ProgramBox>
            <WorkoutTitle>{workoutName}</WorkoutTitle>
            <ProgramList>
              {exerciseTable.map((exercise, i) => {
                return (
                  <li>
                    <strong>{i + 1}.</strong> {exercise}
                  </li>
                );
              })}
            </ProgramList>
          </ProgramBox>
          <SaveProgramButton>SAVE PROGRAM</SaveProgramButton>
        </>
      )}
    </NewProgramPageStyled>
  );
}
