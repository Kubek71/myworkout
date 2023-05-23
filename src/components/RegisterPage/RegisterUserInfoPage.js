import React, { useState } from "react";
import Select from "react-select";
import { TextInput, InputContainer } from "./RegisterPageStyled";
import { ErrorMessage } from "../styles/global/errorMessage";
import { GiAges as AgeIcon, GiBodyHeight as HeightIcon } from "react-icons/gi";
import { MdOutlineMonitorWeight as WeightIcon } from "react-icons/md";
import { useFormContext, useController } from "react-hook-form";

const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export default function RegisterUserInfo({ control }) {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods, destructuring errors from formState object

  const { field } = useController({ name: "gender", control });

  const handleSelectChange = (option) => {
    field.onChange(option.value);
  };
  return (
    <>
      <InputContainer className="input-container">
        <Select
          value={options.find(({ value }) => value === field.value)}
          onChange={handleSelectChange}
          options={options}
          placeholder="Gender..."
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              svg: { display: "none" },
              background: "none",
            }),
          }}
        ></Select>
        <ErrorMessage>{errors.gender?.message || ""}</ErrorMessage>
      </InputContainer>

      <InputContainer className="input-container">
        <TextInput
          type="number"
          placeholder="Weight"
          {...register("userWeight", { valueAsNumber: true })}
        />
        <WeightIcon />
        <ErrorMessage>{errors.userWeight?.message || ""}</ErrorMessage>
      </InputContainer>
      <InputContainer className="input-container">
        <TextInput
          type="number"
          placeholder="Height"
          {...register("userHeight", { valueAsNumber: true })}
        />
        <HeightIcon />
        <ErrorMessage>{errors.userHeight?.message || ""}</ErrorMessage>
      </InputContainer>
      <InputContainer className="input-container">
        <TextInput
          type="number"
          placeholder="Your age"
          {...register("userAge", { valueAsNumber: true })}
        />
        <AgeIcon />
        <ErrorMessage>{errors.userAge?.message || ""}</ErrorMessage>
      </InputContainer>
    </>
  );
}
