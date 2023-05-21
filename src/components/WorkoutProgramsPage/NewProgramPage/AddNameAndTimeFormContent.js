import React from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Heading,
  NextStepButton,
  Input,
} from "../../styles/newProgramPageStyled";
import { ErrorMessage } from "../../styles/global/errorMessage";
export default function WorkoutNameAndTimeSection() {
  const [isWorkoutProgramNamed, setIsWorkoutProgramNamed] = useState(false);
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {!isWorkoutProgramNamed ? (
        <>
          <Heading>NAME YOUR WORKOUT</Heading>
          <Input
            type="text"
            {...register("workoutName", {
              pattern: {
                value: /^[a-zA-Z0-9\s]{2,12}$/,
                message: "Workout name must contain 2-12 letters/numbers",
              },
              required: true,
            })}
          ></Input>
          <ErrorMessage>{errors.workoutName?.message}</ErrorMessage>
          <NextStepButton
            onClick={async () => {
              const isNamed = await trigger("workoutName");
              if (isNamed) {
                setIsWorkoutProgramNamed((current) => !current);
              }
            }}
          >
            NEXT
          </NextStepButton>
        </>
      ) : (
        <>
          <Heading>DEFINE WORKOUT TIME IN MINUTES</Heading>
          <Input
            type="number"
            {...register("workoutDuration", {
              pattern: {
                value: /^[0-9]{1,3}$/,
                message: "Workout duration must be between 1-600 minutes",
              },
              required: true,
            })}
            placeholder="60min"
          />
          <ErrorMessage>{errors.workoutDuration?.message}</ErrorMessage>
          <NextStepButton type="submit">SAVE</NextStepButton>
        </>
      )}
    </>
  );
}
