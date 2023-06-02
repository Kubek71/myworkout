import React from "react";
import { useContext } from "react";
import { database } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  addDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";
import { useAuth } from "./authContext";
import { useState, useEffect } from "react";

const UserDataContext = React.createContext();
export function useUserData() {
  return useContext(UserDataContext);
}

export default function UserDataProvider({ children }) {
  const { currentUser } = useAuth();
  const [workoutArray, setWorkoutArray] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (workoutArray.length > 0) {
      window.localStorage.setItem("workout", JSON.stringify(workoutArray));
    }
  }, [workoutArray]);

  const addUserInfo = (uid, name, gender, weight, height, age, activity) => {
    const userRef = doc(database, `users/${uid}`);
    return setDoc(userRef, {
      userName: name,
      userGender: gender,
      userWeight: weight,
      userHeight: height,
      userAge: age,
      userActivity: activity,
    });
  };
  const getUserInfo = () => {
    const userRef = doc(database, `users/${currentUser.uid}`);
    return getDoc(userRef);
  };

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

  const addWorkout = (workoutTimestamp, note, weight, program, duration) => {
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
      workoutDuration: duration,
    });
  };

  const updateWeight = (weight) => {
    const UserRef = doc(database, `users/${currentUser.uid}`);
    return updateDoc(UserRef, { userWeight: weight });
  };
  const getWorkoutPlans = () => {
    const q = query(
      collection(database, `users/${currentUser.uid}/workoutplans`)
    );

    return getDocs(q);
  };
  const getWorkouts = (onlyLast, workoutProgram) => {
    const q = onlyLast
      ? query(
          collection(database, `users/${currentUser.uid}/workouts`),
          orderBy("timestamp", "desc"),
          limit(3)
        )
      : query(
          collection(database, `users/${currentUser.uid}/workouts`),
          where("programName", "==", workoutProgram)
        );

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

  const countWorkouts = (firstDayOfTheMonth) => {
    const q = query(
      collection(database, `users/${currentUser.uid}/workouts`),
      where("timestamp", ">", firstDayOfTheMonth)
    );
    return getCountFromServer(q);
  };

  const addExercise = (exercise) => {
    const ExercisesRef = doc(
      database,
      `users/${currentUser.uid}/exercises/${exercise}`
    );
    return setDoc(ExercisesRef, { values: [] });
  };
  const updateExercisesArray = (exerciseName, setsArray) => {
    const ExerciseRef = doc(
      database,
      `users/${currentUser.uid}/exercises/${exerciseName}`
    );
    const timestamp = Date.now();
    return updateDoc(ExerciseRef, {
      [`values.${timestamp}`]: setsArray,
    });
  };

  const getExercises = (exercise) => {
    const ExerciseRef = doc(
      database,
      `users/${currentUser.uid}/exercises/${exercise}`
    );
    return getDoc(ExerciseRef);
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
    countWorkouts,
    addUserInfo,
    getUserInfo,
    updateWeight,
    addExercise,
    updateExercisesArray,
    getExercises,
    error,
    setError,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
