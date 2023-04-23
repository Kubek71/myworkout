import React, { useEffect } from "react";
import { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import styled from "styled-components";
import {
  StartWorkoutFormStyled,
  WorkoutTable,
} from "../../styles/startWorkoutForm";
import { Heading, NextStepButton } from "../../styles/newProgramPageStyled";
import { Box } from "../../styles/boxStyled.js.js";
import AddNewSet from "./AddNewSet";

const ExercisesContainer = styled(Box)`
  flex-wrap: wrap;
`;
const SaveExerciseButton = styled(NextStepButton)`
  width: 100%;
`;
const ExerciseBox = styled(Box)`
  background: ${({ theme }) => theme.colors.light};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  text-transform: capitalize;
  padding: 0.33rem;
  border-radius: 8px;
  cursor: pointer;
`;

export default function StartWorkoutForm({ choosedWorkoutTable }) {
  const [openExerciseForm, setOpenExerciseForm] = useState(false);
  const [choosedExercise, setChoosedExercise] = useState();
  const useFormMethods = useForm({
    defaultValues: {
      exerciseSets: [{}],
    },
  });
  const control = useFormMethods.control;

  // importing fields array, append, remove fn from useFieldArray ( reactHookform)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exerciseSets",
  });

  // getting single exercise on click from exercise table
  const getChoosedExerciseHandler = (event) => {
    const exercise = event.target.innerText;
    setChoosedExercise(exercise);
  };

  const saveWorkout = (registeredData) => {
    console.log(registeredData.exerciseSets);
  };

  // useEffect(() => {
  //   console.log(newWorkoutTable);
  // }, [newWorkoutTable]);
  return (
    <StartWorkoutFormStyled onSubmit={useFormMethods.handleSubmit(saveWorkout)}>
      <FormProvider
        {...useFormMethods}
        fields={fields}
        append={append}
        remove={remove}
      >
        {openExerciseForm ? (
          <>
            <WorkoutTable>
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Set</th>
                  <th>Rep</th>
                  <th>Kg</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <AddNewSet choosedExercise={choosedExercise} />
              </tbody>
            </WorkoutTable>
            <SaveExerciseButton type="submit">Save Exercise</SaveExerciseButton>
          </>
        ) : (
          <>
            <Heading>Choose Exercise</Heading>
            <ExercisesContainer>
              {choosedWorkoutTable.exercises.map((exercise, i) => {
                return (
                  <button
                    key={i}
                    onClick={(event) => {
                      setOpenExerciseForm((current) => !current);
                      getChoosedExerciseHandler(event);
                    }}
                  >
                    <ExerciseBox>{exercise}</ExerciseBox>
                  </button>
                );
              })}
            </ExercisesContainer>
          </>
        )}
      </FormProvider>
    </StartWorkoutFormStyled>
  );
}
