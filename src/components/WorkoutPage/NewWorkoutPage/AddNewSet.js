import React from "react";
import { useEffect } from "react";
import { BiPlusMedical as AddSetIcon } from "react-icons/bi";
import { useFormContext } from "react-hook-form";
export default function AddNewSet({
  choosedExercise,
  setIsAddNewSetComponentRendered,
}) {
  const {
    register,
    formState: { errors },
    trigger,
    setFocus,
    fields,
    append,
  } = useFormContext(); // retrieve all hook methods, destructuring errors from formState object

  useEffect(() => {
    // setting a state for conditional rendering workout section in WorkoutPage.js
    const unsubscribe = () =>
      setIsAddNewSetComponentRendered((current) => !current);
    return unsubscribe;
  }, []);
  return (
    <>
      {fields.map((field, index) => {
        return (
          <tr key={field.id}>
            <td>
              {
                // setting innerText to exercise name in first element of the array, also setting innerText to null for rest of them
                index === 0 ? choosedExercise : null
              }
            </td>
            <td>{index + 1}</td>

            <td>
              <input
                type="number"
                placeholder="1"
                {...register(`exerciseSets.${index}.rep`, {
                  required: true,
                })}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="10"
                {...register(`exerciseSets.${index}.kg`, {
                  required: true,
                })}
              />
            </td>
            <td>
              {
                // display button only for last element of the array
                index === fields.length - 1 ? (
                  <AddSetIcon
                    onClick={async () => {
                      // checks if rep and kg input is registered
                      const isSetRegistered = await trigger([
                        `exerciseSets.${index}.rep`,
                        `exerciseSets.${index}.kg`,
                      ]);

                      // if data from inputs is registered, appends new table row with input, otherwise setting focus on rep input in current table row
                      isSetRegistered
                        ? append({})
                        : setFocus(`exerciseSets.${index}.rep`);
                    }}
                  />
                ) : null
              }
            </td>
          </tr>
        );
      })}
    </>
  );
}
