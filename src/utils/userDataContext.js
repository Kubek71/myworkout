import React from "react";
import { useContext } from "react";
import { database } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./authContext";
const UserDataContext = React.createContext();
export function useUserData() {
  return useContext(UserDataContext);
}

export default function UserDataProvider({ children }) {
  const { currentUser } = useAuth();

  const addWorkoutPlan = (workoutPlanName, workoutDuration, exercisesArray) => {
    const WorkoutPlanRef = doc(
      database,
      `users/${currentUser.uid}/workoutplans/${workoutPlanName}`
    );

    return setDoc(WorkoutPlanRef, {
      name: workoutPlanName,
      duration: workoutDuration,
      exercises: exercisesArray,
    });
  };

  const value = {
    addWorkoutPlan,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
