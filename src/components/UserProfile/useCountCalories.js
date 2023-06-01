import React from "react";

export default function useCountCalories() {
  // counting calories daily requirement for user based on his individual parametrs that he passed in via registration form
  const countCalories = (weight, height, isMale, age, activity) => {
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
