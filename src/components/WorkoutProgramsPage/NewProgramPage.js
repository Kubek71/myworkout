import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import {
  NewProgramPageStyled,
  NewProgramForm,
  Heading,
  NextStepButton,
  Input,
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
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [workoutName, setWorkoutName] = useState(undefined);
  const [exerciseTable, setExerciseTable] = useState([]);
  const [exerciseStringIsEmptyError, setExerciseStringIsEmptyError] =
    useState();
  const { addWorkoutPlan } = useUserData();
  useEffect(() => {
    console.log(exerciseTable);
  }, [exerciseStringIsEmptyError]);

  const submitWorkoutName = (data) => {
    setIsFormSubmitted((current) => !current);
    setWorkoutName(data.workoutName);
    resetField("workoutName");
  };
  const submitExercise = (data) => {
    setExerciseTable((currentTable) => [...currentTable, data.exercise]);
    resetField("exercise");
  };

  // saving the workoutprogram in firestore if workout name is given, exercise table is not empty

  const saveWorkoutProgram = () => {
    if (workoutName !== undefined && exerciseTable.length > 0) {
      if (!exerciseTable.includes("")) {
        addWorkoutPlan(workoutName, "20min", exerciseTable)
          .then(() => {
            console.log("udalo sie");
          })
          .catch((error) => console.log(error));
      } else setExerciseStringIsEmptyError("Every exercise has to have a name");
    }
    return;
  };

  const removeExerciseFromArray = (exerciseIndex) => {
    setExerciseTable((currentTable) =>
      currentTable.filter((items, index) => index !== exerciseIndex)
    );
  };

  // updating exercise name in array onChange from input
  const changeExerciseNameInArray = (newExerciseName, exerciseIndex) => {
    setExerciseTable((currentTable) =>
      currentTable.map((exercise, i) =>
        i === exerciseIndex ? newExerciseName : exercise
      )
    );
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
      )}
    </NewProgramPageStyled>
  );
}
