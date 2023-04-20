import React, { useEffect } from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import {
  StartWorkoutFormStyled,
  WorkoutTable,
} from "../styles/startWorkoutForm";
import { Heading, NextStepButton } from "../styles/newProgramPageStyled";
import { Box } from "../styles/boxStyled.js";
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
  const [newRows, setNewRows] = useState([]);
  const [openExerciseForm, setOpenExerciseForm] = useState(false);
  const [newWorkoutTable, setNewWorkoutTable] = useState([]);
  const [exerciseSets, setExerciseSets] = useState([]);
  const choosedExercise = choosedWorkoutTable.exercise;
  const useFormMethods = useForm();

  // getting single exercise on click from exercise table
  const getChoosedExerciseHandler = (event) => {
    const exercise = event.target.innerText;
    setNewRows((currentTable) => [...currentTable, exercise]);
  };

  const saveWorkout = () => {
    // setNewWorkoutTable((current) => [
    //   ...current,
    //   {
    //     exercise: choosedExercise,
    //     sets: exerciseSets,
    //   },
    // ]);
  };

  // useEffect(() => {
  //   console.log(newWorkoutTable);
  // }, [newWorkoutTable]);
  return (
    <StartWorkoutFormStyled onSubmit={useFormMethods.handleSubmit(saveWorkout)}>
      <FormProvider {...useFormMethods}>
        {openExerciseForm && newRows.length > 0 ? (
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
                {newRows.map((set, index) => {
                  return (
                    <AddNewSet
                      setNewRows={setNewRows}
                      newRows={newRows}
                      set={set}
                      setIndex={index}
                      setExerciseSets={setExerciseSets}
                    />
                  );
                })}
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
                  <ExerciseBox
                    onClick={(event) => {
                      setOpenExerciseForm((current) => !current);
                      getChoosedExerciseHandler(event);
                    }}
                  >
                    {exercise}
                  </ExerciseBox>
                );
              })}
            </ExercisesContainer>
          </>
        )}
      </FormProvider>
    </StartWorkoutFormStyled>
  );
}
