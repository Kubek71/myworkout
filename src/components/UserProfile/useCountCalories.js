import React from "react";

export default function useCountCalories() {
  const countCalories = (weight, height, isMale, age, activity) => {
    console.log(`${weight}, ${height} , ${age}`);
    console.log(isMale);
    const result = isMale
      ? // prettier-ignore
        Math.round(activity * ((10 * weight) + (6.25 * height) - (5 * age +5)))
      : // prettier-ignore
        Math.round(activity * ((10 * weight) + (6.25 * height) - (5 * age - 161)));

    return result;
  };

  return {
    countCalories,
  };
}
