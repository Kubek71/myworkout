import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import WorkoutNameAndTimeSection from "./AddNameAndTimeFormContent";
import AddExerciseFormContent from "./AddExerciseFormContent";
import {
  NewProgramPageStyled,
  NewProgramForm,
  Heading,
  SaveProgramButton,
} from "../styles/newProgramPageStyled";
import { ProgramBox, ProgramList } from "../styles/programPageStyled";
import { ErrorMessage } from "../styles/global/errorMessage";
import { Box } from "../styles/boxStyled.js.js";
import {
  BiPlusMedical as NewProgramIcon,
  BiTrash as RemoveIcon,
} from "react-icons/bi";
import { useUserData } from "../../utils/userDataContext";

const NameProgramForm = styled(NewProgramForm)`
  background: none;
`;
const WorkoutTitle = styled(Heading)`
  color: ${({ theme }) => theme.colors.primaryRed};
  text-transform: uppercase;
`;

export default function NewProgramPage() {
  // pulling all the use form methods
  const useFormMethods = useForm();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [workoutName, setWorkoutName] = useState(undefined);
  const [workoutDuration, setWorkoutDuration] = useState(undefined);
  const [exerciseTable, setExerciseTable] = useState([]);
  const [exerciseStringIsEmptyError, setExerciseStringIsEmptyError] =
    useState();
  const { addWorkoutPlan } = useUserData();

  const submitWorkoutName = (data) => {
    setIsFormSubmitted((current) => !current);
    setWorkoutName(data.workoutName);
    setWorkoutDuration(data.workoutDuration);
    useFormMethods.resetField("workoutName");
    useFormMethods.resetField("workoutDuration");
  };

  // adding exercise to exercise table in state on add exercise form submit
  const submitExercise = (data) => {
    setExerciseTable((currentTable) => [...currentTable, data.exercise]);
    useFormMethods.resetField("exercise");
    console.log(exerciseTable);
  };

  // saving the workoutprogram in firestore if workout name, time is given, exercise table is not empty
  const saveWorkoutProgram = () => {
    if (workoutName !== undefined && exerciseTable.length > 0) {
      if (!exerciseTable.includes("")) {
        addWorkoutPlan(workoutName, workoutDuration, exerciseTable)
          .then(() => {
            console.log("udalo sie");
          })
          .catch((error) => console.log(error));
      } else setExerciseStringIsEmptyError("Every exercise has to have a name");
    }
    return;
  };

  // removing exercise from exercise table in state, when user clicks on remove icon
  const removeExerciseFromArray = (exerciseIndex) => {
    setExerciseTable((currentTable) =>
      currentTable.filter((items, index) => index !== exerciseIndex)
    );
  };

  // updating exercise name in array onChange from exercise input
  const changeExerciseNameInArray = (newExerciseName, exerciseIndex) => {
    setExerciseTable((currentTable) =>
      currentTable.map((exercise, i) =>
        i === exerciseIndex ? newExerciseName : exercise
      )
    );
  };
  return (
    <NewProgramPageStyled>
      {
        // displays add exercise form if workout was named and workout time was defined, if its not displays workout name and time form
        isFormSubmitted === true && workoutName !== undefined ? (
          <NewProgramForm
            onSubmit={useFormMethods.handleSubmit(submitExercise)}
          >
            <FormProvider {...useFormMethods}>
              <AddExerciseFormContent />
            </FormProvider>
          </NewProgramForm>
        ) : (
          <NameProgramForm
            onSubmit={useFormMethods.handleSubmit(submitWorkoutName)}
          >
            <FormProvider {...useFormMethods}>
              <WorkoutNameAndTimeSection />
            </FormProvider>
          </NameProgramForm>
        )
      }
      {
        // displays exercise list if workout was named and the first exercise was entered
        workoutName !== undefined && exerciseTable.length > 0 && (
          <>
            <ProgramBox>
              <WorkoutTitle>{workoutName}</WorkoutTitle>
              <ProgramList>
                {exerciseTable.map((exercise, i) => {
                  return (
                    <li>
                      <Box>
                        <strong>{i + 1}.</strong>{" "}
                        <input
                          requiered
                          onChange={(e) =>
                            changeExerciseNameInArray(e.currentTarget.value, i)
                          }
                          value={exercise}
                        />
                      </Box>

                      <RemoveIcon onClick={() => removeExerciseFromArray(i)} />
                    </li>
                  );
                })}
              </ProgramList>
              {exerciseStringIsEmptyError && (
                <ErrorMessage>{exerciseStringIsEmptyError}</ErrorMessage>
              )}
            </ProgramBox>
            <SaveProgramButton onClick={() => saveWorkoutProgram()}>
              SAVE PROGRAM
            </SaveProgramButton>
          </>
        )
      }
    </NewProgramPageStyled>
  );
}
