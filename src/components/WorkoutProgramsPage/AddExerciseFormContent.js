import React from "react";
import { useFormContext } from "react-hook-form";
import { Heading, Input } from "../styles/newProgramPageStyled";
import { BiPlusMedical as NewProgramIcon } from "react-icons/bi";
import { ErrorMessage } from "../styles/global/errorMessage";
import { Box } from "../styles/boxStyled.js";
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
    </>
  );
}
