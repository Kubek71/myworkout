import React, { useEffect } from "react";
import { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import styled from "styled-components";
import {
  StartWorkoutFormStyled,
  WorkoutTable,
  SaveWorkoutLink,
  WorkoutSection,
} from "./startWorkoutFormStyled";
import {
  Heading,
  NextStepButton,
} from "../../WorkoutProgramsPage/NewProgramPage/newProgramPageStyled";
import { BackButton } from "../../HistoryPage/OpenedWorkoutStyled";
import { Box } from "../../styles/boxStyled.js.js";
import AddNewSet from "./AddNewSet";
import { BiDumbbell as SetsIcon, BiTrash as RemoveIcon } from "react-icons/bi";
import { useUserData } from "../../../utils/userDataContext";
import useCancelWorkout from "../useCancelWorkout";

const ExercisesContainer = styled(Box)`
  flex-wrap: wrap;

  /* changing color of a exercise box whenever exercise button is disabled(when exercise is already in workoutArray) */
  button:disabled {
    div {
      background: none;
      color: ${({ theme }) => theme.colors.light};
    }
  }
`;

export const SaveButton = styled(NextStepButton)`
  width: 100%;
  max-width: 600px;
  color: ${({ theme }) => theme.colors.light};
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
  const [isAddNewSetComponentRendered, setIsAddNewSetComponentRendered] =
    useState(false);
  const { workoutArray, setWorkoutArray } = useUserData();
  const [choosedExercise, setChoosedExercise] = useState();
  const useFormMethods = useForm({
    defaultValues: {
      exerciseSets: [{}],
    },
  });
  const control = useFormMethods.control;
  const cancelWorkout = useCancelWorkout();

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

  // pushing registered exercise with exercise name, registered sets to the workoutArray(from userDataContext.js)
  const saveWorkout = (registeredData) => {
    setOpenExerciseForm((current) => !current);
    const registeredExercise = {
      name: choosedExercise,
      sets: registeredData.exerciseSets,
    };
    setWorkoutArray((currentArray) => [...currentArray, registeredExercise]);
    useFormMethods.reset();
  };

  // removing exercise from array whenever user clicks a remove icon
  const removeExerciseFromWorkoutArray = (exerciseIndex) => {
    setWorkoutArray(
      workoutArray.filter((exercise, index) => !(index === exerciseIndex))
    );
  };

  useEffect(() => {
    const workout = JSON.parse(window.localStorage.getItem("workout"));
    if (workout) {
      setWorkoutArray(workout);
    }
    return () => setIsAddNewSetComponentRendered(false);
  }, []);

  return (
    <>
      <StartWorkoutFormStyled
        onSubmit={useFormMethods.handleSubmit(saveWorkout)}
      >
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
                  <AddNewSet
                    choosedExercise={choosedExercise}
                    setIsAddNewSetComponentRendered={
                      setIsAddNewSetComponentRendered
                    }
                  />
                </tbody>
              </WorkoutTable>
              <SaveButton type="submit">Save Exercise</SaveButton>
            </>
          ) : (
            <>
              <Heading>Choose Exercise</Heading>
              <ExercisesContainer>
                {choosedWorkoutTable.exercises.map((exercise, i) => {
                  return (
                    <button
                      key={i}
                      disabled={workoutArray.some(
                        (e) => e.name.toLowerCase() === exercise
                      )}
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
      {workoutArray.length > 0 && isAddNewSetComponentRendered === false && (
        <>
          <WorkoutSection>
            {workoutArray.map((exercise, exerciseIndex) => {
              return (
                <>
                  <Box className="container" key={exerciseIndex}>
                    <button
                      onClick={() =>
                        removeExerciseFromWorkoutArray(exerciseIndex)
                      }
                    >
                      <RemoveIcon className="remove-icon" />
                    </button>
                    <h2>{exercise.name}</h2>

                    <Box>
                      <SetsIcon className="set-icon" />
                      <span>{exercise.sets.length}</span>
                    </Box>
                  </Box>
                </>
              );
            })}
          </WorkoutSection>
          <SaveWorkoutLink
            to="save"
            state={{ planName: choosedWorkoutTable.name }}
          >
            Save Workout
          </SaveWorkoutLink>
        </>
      )}
      {isAddNewSetComponentRendered === false && (
        <BackButton fontSize="1rem" textAlign="center" onClick={cancelWorkout}>
          <span>Cancel</span>
        </BackButton>
      )}
    </>
  );
}
