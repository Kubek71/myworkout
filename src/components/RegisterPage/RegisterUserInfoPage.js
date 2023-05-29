import React, { useState } from "react";
import Select from "react-select";
import { TextInput, InputContainer } from "./RegisterPageStyled";
import { ErrorMessage } from "../styles/global/errorMessage";
import { GiAges as AgeIcon, GiBodyHeight as HeightIcon } from "react-icons/gi";
import { MdOutlineMonitorWeight as WeightIcon } from "react-icons/md";
import { useFormContext, useController } from "react-hook-form";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const activityOptions = [
  { value: 1.2, label: "Minimal physical activity, sedentary lifestyle" },
  { value: 1.375, label: "Physical work / training 2-4 times a week" },
  {
    value: 1.55,
    label: "Training 3-5 times a week, average daily physical activity",
  },
  { value: 1.725, label: "Training 6-7 times a week, active lifestyle" },
];

export default function RegisterUserInfo({ control }) {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods, destructuring errors from formState object

  const { field: genderField } = useController({ name: "gender", control });
  const { field: activityField } = useController({ name: "activity", control });

  const handleSelectChange = (option) => {
    genderField.onChange(option.value);
  };
  const handleActivityChange = (option) => {
    activityField.onChange(option.value);
  };
  return (
    <>
      <InputContainer className="input-container">
        <Select
          value={genderOptions.find(({ value }) => value === genderField.value)}
          onChange={handleSelectChange}
          options={genderOptions}
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
        <Select
          value={activityOptions.find(
            ({ value }) => value === activityField.value
          )}
          onChange={handleActivityChange}
          options={activityOptions}
          placeholder="Activity..."
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              svg: { display: "none" },
              background: "none",
            }),
          }}
        ></Select>
        <ErrorMessage>{errors.activity?.message || ""}</ErrorMessage>
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
