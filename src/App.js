import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./components/styles/global/globalStyles";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header";
import NewProgramPage from "./components/WorkoutProgramsPage/NewProgramPage/NewProgramPage";
import ProgramPage from "./components/WorkoutProgramsPage/ProgramPage";
import WorkoutPage from "./components/WorkoutPage/WorkoutPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import UserIsNotLoggedInRoutes from "./utils/useIsNotLoggedRoutes";
import PrivateRoutes from "./utils/privateRoutes";
import DeleteWorkoutPlan from "./components/WorkoutProgramsPage/NewProgramPage/DeleteWorkoutPlan";
import NewWorkoutPage from "./components/WorkoutPage/NewWorkoutPage/NewWorkoutPage";
import SaveWorkout from "./components/WorkoutPage/NewWorkoutPage/SaveWorkout";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import OpenedWorkout from "./components/HistoryPage/OpenedWorkout";

const Testroute = () => {
  return <h1>testowyroute</h1>;
};

function App() {
  const headerHeightRef = useRef();
  return (
    <>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Header headerHeightRef={headerHeightRef} />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/">
                <Route index element={<WorkoutPage />} />
                <Route path="startworkout" element={<NewWorkoutPage />} />
                <Route path="startworkout/save" element={<SaveWorkout />} />
              </Route>
              <Route path="workoutprograms">
                <Route index element={<ProgramPage />} />
                <Route path="newprogram" element={<NewProgramPage />} />
                <Route path="deleteProgram" element={<DeleteWorkoutPlan />} />
              </Route>
              <Route path="history">
                <Route
                  index
                  element={<HistoryPage headerHeightRef={headerHeightRef} />}
                />
                <Route path=":id" element={<OpenedWorkout />} />
              </Route>
            </Route>
            <Route element={<UserIsNotLoggedInRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<RegisterPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
