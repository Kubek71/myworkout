import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import WorkoutNameAndTimeSection from "./AddNameAndTimeFormContent";
import AddExerciseFormContent from "./AddExerciseFormContent";
import {
  NewProgramPageStyled,
  NewProgramForm,
  Heading,
  SaveProgramButton,
} from "./newProgramPageStyled";
import { ProgramBox, ProgramList } from "../programPageStyled";
import { ErrorMessage } from "../../styles/global/errorMessage";
import { Box } from "../../styles/boxStyled.js.js";
import { BiTrash as RemoveIcon } from "react-icons/bi";
import { useUserData } from "../../../utils/userDataContext";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [workoutName, setWorkoutName] = useState(undefined);
  const [workoutDuration, setWorkoutDuration] = useState(undefined);
  const [exerciseTable, setExerciseTable] = useState([]);
  const [exerciseStringIsEmptyError, setExerciseStringIsEmptyError] =
    useState();
  const { addWorkoutPlan, addExercise } = useUserData();
  const navigate = useNavigate();

  // pulling a route state (passing workoutplan to a route state when user clicks on workoutedit button in program page)
  const { state } = useLocation();

  // on component first render checks if there is some workout plan passed in from edit workout plan button and if it is sets passed workout to a state
  useEffect(() => {
    if (state) {
      setIsFormSubmitted(true);
      setWorkoutName(state.workoutToEditName);
      setWorkoutDuration(state.workoutToEditDuration);
      setExerciseTable(state.workoutToEditExercises);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const submitWorkoutName = (data) => {
    setIsFormSubmitted((current) => !current);
    setWorkoutName(data.workoutName.toLowerCase());
    setWorkoutDuration(data.workoutDuration);
    useFormMethods.resetField("workoutName");
    useFormMethods.resetField("workoutDuration");
  };

  // adding exercise to exercise table in state on add exercise form submit
  const submitExercise = (data) => {
    setExerciseTable((currentTable) => [
      ...currentTable,
      data.exercise.toLowerCase(),
    ]);
    useFormMethods.resetField("exercise");
  };

  // saving the workoutprogram in firestore if workout name, time is given, exercise table is not empty
  const saveWorkoutProgram = () => {
    if (workoutName !== undefined && exerciseTable.length > 0) {
      if (!exerciseTable.includes("")) {
        addWorkoutPlan(workoutName, workoutDuration, exerciseTable)
          .then(() => {
            exerciseTable.forEach((exercise) => {
              addExercise(exercise);
            });
            navigate(-1);
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
    !isLoading && (
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
                      <li key={i}>
                        <Box>
                          <strong>{i + 1}.</strong>{" "}
                          <input
                            requiered="true"
                            onChange={(e) =>
                              changeExerciseNameInArray(
                                e.currentTarget.value,
                                i
                              )
                            }
                            value={exercise}
                          />
                        </Box>

                        <RemoveIcon
                          onClick={() => removeExerciseFromArray(i)}
                        />
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
    )
  );
}
