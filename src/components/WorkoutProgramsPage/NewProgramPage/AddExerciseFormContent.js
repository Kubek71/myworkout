import React from "react";
import { useFormContext } from "react-hook-form";
import { Heading, Input } from "./newProgramPageStyled";
import { BiPlusMedical as NewProgramIcon } from "react-icons/bi";
import { ErrorMessage } from "../../styles/global/errorMessage";
import { Box } from "../../styles/boxStyled.js";
export default function AddExerciseFormContent() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Heading>ADD EXERCISE</Heading>
      <Box>
        <Input
          type="Text"
          {...register("exercise", {
            pattern: {
              value: /^[a-zA-Z0-9\s]{2,20}$/,
              message: "Exercise name must contain 2-20 letters/numbers",
            },
            required: true,
          })}
        ></Input>
        <button type="submit" className="add-exercise-button">
          <NewProgramIcon></NewProgramIcon>
        </button>
      </Box>
      <ErrorMessage>{errors.exercise?.message}</ErrorMessage>
    </>
  );
}
