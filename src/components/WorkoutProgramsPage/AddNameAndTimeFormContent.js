import React from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Heading, NextStepButton, Input } from "../styles/newProgramPageStyled";
import { ErrorMessage } from "../styles/global/errorMessage";
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
                value: /^[a-zA-Z]{2,12}$/,
                message: "Workout name must contain 2-12 characters",
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
          <Heading>DEFINE WORKOUT TIME</Heading>
          <Input
            type="number"
            {...register("workoutDuration", {
              minLength: 2,
              required: true,
            })}
            placeholder="60min"
          />
          <NextStepButton type="submit">SAVE</NextStepButton>
        </>
      )}
    </>
  );
}
