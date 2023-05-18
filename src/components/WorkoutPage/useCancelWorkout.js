import React from "react";
import { useUserData } from "../../utils/userDataContext";
import { useNavigate } from "react-router-dom";
export default function useCancelWorkout() {
  const { setWorkoutArray } = useUserData();
  const navigate = useNavigate();

  const cancelWorkout = () => {
    setWorkoutArray([]);
    window.localStorage.clear();
    navigate("/");
  };

  return cancelWorkout;
}
