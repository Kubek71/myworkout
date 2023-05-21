import React from "react";

export default function useCountCalories() {
  const countCalories = (weight, height, isMale, age, physicalActivity) => {
    isMale
      ? (10 * weight + 6, 25 * height - 5 * age + 5 * physicalActivity)
      : (10 * weight + 6, 25 * height - 5 * age - 161 * physicalActivity);
  };

  return countCalories;
}
