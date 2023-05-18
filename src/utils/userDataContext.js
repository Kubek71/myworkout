import React from "react";
import { useContext } from "react";
import { database } from "./firebaseConfig";
import { doc, setDoc, getDoc, deleteDoc, addDoc } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "./authContext";
import { useState, useEffect } from "react";
import { startAfter, startAt } from "firebase/database";
const UserDataContext = React.createContext();
export function useUserData() {
  return useContext(UserDataContext);
}

export default function UserDataProvider({ children }) {
  const { currentUser } = useAuth();
  const [workoutArray, setWorkoutArray] = useState([]);

  useEffect(() => {
    if (workoutArray.length > 0) {
      window.localStorage.setItem("workout", JSON.stringify(workoutArray));
    }
  }, [workoutArray]);

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

  const addWorkout = (workoutTimestamp, note, weight, program) => {
    const WorkoutRef = collection(
      database,
      `users/${currentUser.uid}/workouts/`
    );
    return addDoc(WorkoutRef, {
      exercises: workoutArray,
      userWeight: weight,
      workoutNote: note,
      programName: program,
      timestamp: workoutTimestamp,
    });
  };
  const getWorkoutPlans = () => {
    const q = query(
      collection(database, `users/${currentUser.uid}/workoutplans`)
    );

    return getDocs(q);
  };
  const getWorkouts = (onlyLast) => {
    const q = onlyLast
      ? query(
          collection(database, `users/${currentUser.uid}/workouts`),
          orderBy("timestamp", "desc"),
          limit(10)
        )
      : query(collection(database, `users/${currentUser.uid}/workouts`));

    return getDocs(q);
  };
  const getAllWorkouts = (lastWorkoutTimestamp, activeWorkoutPlan) => {
    const q = query(
      collection(database, `users/${currentUser.uid}/workouts`),
      where("programName", "==", activeWorkoutPlan),
      where("timestamp", "<", lastWorkoutTimestamp),
      orderBy("timestamp", "desc"),
      limit(10)
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
    workoutArray,
    setWorkoutArray,
    addWorkout,
    getWorkouts,
    getAllWorkouts,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
