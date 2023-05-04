import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./components/styles/global/globalStyles";
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
const Testroute = () => {
  return <h1>testowyroute</h1>;
};

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<WorkoutPage />} exact />
              <Route path="workoutprograms" element={<ProgramPage />} />
              <Route path="deleteProgram" element={<DeleteWorkoutPlan />} />
              <Route path="newprogram" element={<NewProgramPage />} />
              <Route path="workouts" element={<WorkoutPage />} />
              <Route path="startworkout" element={<NewWorkoutPage />} />
              <Route path="save" element={<SaveWorkout />} />
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
