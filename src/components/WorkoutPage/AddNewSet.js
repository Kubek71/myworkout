import React from "react";
import { useState, useEffect } from "react";
import { BiPlusMedical as AddSetIcon } from "react-icons/bi";
import { useFormContext } from "react-hook-form";
export default function AddNewSet({
  setNewRows,
  set,
  newRows,
  setIndex,
  setExerciseSets,
}) {
  const {
    register,
    formState: { errors },
    trigger,
    resetField,
    getValues,
  } = useFormContext(); // retrieve all hook methods, destructuring errors from formState object

  return (
    <tr>
      <td>{set}</td>
      <td>{setIndex + 1}</td>
      <td>
        <input
          type="number"
          placeholder="1"
          {...register("rep", {
            required: true,
          })}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="10"
          {...register("kg", {
            required: true,
          })}
        />
      </td>
      <td>
        {setIndex === newRows.length - 1 && (
          <AddSetIcon
            onClick={async () => {
              const isSetRegistered = await trigger("rep", "kg");
              if (isSetRegistered) {
                const exerciseSet = getValues();
                setExerciseSets((current) => [...current, exerciseSet]);
                resetField("rep");
                resetField("kg");
                setNewRows((current) => [...current, null]);
              }
            }}
          />
        )}
      </td>
    </tr>
  );
}
