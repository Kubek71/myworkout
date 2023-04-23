import React from "react";
import { useContext } from "react";
import { database } from "./firebaseConfig";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
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
  const getWorkoutPlans = () => {
    const WorkoutPlansRef = doc(database, `users/${currentUser.uid}`);
    const q = query(
      collection(database, `users/${currentUser.uid}/workoutplans`)
    );

    return getDocs(q);
  };
  const getWorkoutProgram = (workoutPlanName) => {
    const WorkoutPlanRef = doc(
      database,
      `users/${currentUser.uid}/workoutplans/${workoutPlanName}`
    );

    return getDoc(WorkoutPlanRef);
  };

  const deleteWorkoutPlan = (workoutPlanName) => {
    const WorkoutPlanRef = doc(
      database,
      `users/${currentUser.uid}/workoutplans/${workoutPlanName}`
    );

    return deleteDoc(WorkoutPlanRef);
  };

  const value = {
    addWorkoutPlan,
    getWorkoutPlans,
    deleteWorkoutPlan,
    getWorkoutProgram,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
